import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ServicoPrestado } from './servico-prestado/ServicoPrestado';
import { environment } from '../environments/environment';

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
}
