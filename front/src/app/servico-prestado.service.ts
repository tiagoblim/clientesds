import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ServicoPrestado } from './servico-prestado/ServicoPrestado';
import { environment } from '../environments/environment';
import { ServicoPrestadoBusca } from './servico-prestado/servico-prestado-lista/servico-prestado-busca';

@Injectable({
  providedIn: 'root'
})
export class ServicoPrestadoService {

  path: string = environment.apiURL + '/api/servicos-prestados';

  constructor(
    private http: HttpClient
  ) { }

  salvar(servicoPrestado: ServicoPrestado) : Observable<ServicoPrestado> {
    return this.http.post<ServicoPrestado>(this.path, servicoPrestado);
  } 

  buscar(nome: string, mes: number) : Observable<ServicoPrestadoBusca[]> {
    const httpParamns = new HttpParams()
      .set("nome", nome)
      .set("mes", mes ? mes.toString() : '');

    return this.http.get<any>(this.path + "?" + httpParamns.toString());
  }
}
