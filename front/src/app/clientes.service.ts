import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Cliente } from './clientes/cliente';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  path: string = 'http://localhost:8080/api';

  constructor(
    private http: HttpClient
  ) { }

  salvar( cliente: Cliente ) : Observable<Cliente> {
    return this.http.post<Cliente>(this.path, cliente);
  }

  atualizar( cliente: Cliente ) : Observable<any> {
    return this.http.post<Cliente>(this.path + `/${cliente.id}`, cliente);
  }

  getClientes() : Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.path);
  }

  getClienteById( id: number ) : Observable<Cliente> {
    return this.http.get<any>(`/api/${id}`);
  }

  deletar( cliente: Cliente ) : Observable<any> {
    return this.http.delete<any>(this.path + `/${cliente.id}`);
  }

}
