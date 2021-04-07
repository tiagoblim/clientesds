import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Cliente } from './clientes/cliente';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(
    private http: HttpClient
  ) { }

  salvar( cliente: Cliente) : Observable<Cliente> {
    return this.http.post<Cliente>('', cliente);
  }

  getCliente() : Cliente {
    let cliente: Cliente = new Cliente();

    return cliente;
  }

}
