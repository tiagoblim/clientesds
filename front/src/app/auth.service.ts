import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

import { environment } from '../environments/environment';

import { Usuario } from './login/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  path = environment.apiURL + "/api/usuarios";
  tokenURL = environment.apiURL + environment.obterTokenURL;
  clientId = environment.clientId;
  clientSecret = environment.clientSecret;

  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(
    private http: HttpClient
  ) { }

  obterToken() {
    const tokenString = localStorage.getItem('access_token');
     
    if (tokenString) {
      const token = JSON.parse(tokenString).access_token;
      return token;
    }

    return null;
  }

  isAuthenticated(): boolean {
    const token = this.obterToken();

    if (token) {
      const expired = this.jwtHelper.isTokenExpired(token);
      return !expired;
    }

    return false;
  }

  encerrarSessao() {
    localStorage.removeItem('access_token');
  }

  getUsuarioAutenticado() {
    const token = this.obterToken();

    if (token) {
      const usuario = this.jwtHelper.decodeToken(token).user_name;
      return usuario;
    }

    return null;
  }

  salvar(usuario: Usuario): Observable<any> {
    return this.http.post<any>(this.path, usuario);
  }

  tentarLogar(username: string, password: string): Observable<any> {
    const params = new HttpParams()
      .set('username', username)
      .set('password', password)
      .set('grant_type', 'password');

    const headers = {
      'Authorization': 'Basic ' + btoa(`${this.clientId}:${this.clientSecret}`),
      'Content-Type': 'application/x-www-form-urlencoded'
    }

    return this.http.post<any>(this.tokenURL, params.toString(), { headers });
  }
}
