import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/clientes.service';

import { Cliente } from '../cliente';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css']
})
export class ClientesFormComponent implements OnInit {

  cliente: Cliente;
  success: boolean = false;
  errors: String[];

  constructor(
    private service: ClientesService
  ) {
    this.cliente = service.getCliente();
   }

  ngOnInit(): void {
  }

  onSubmit() {
    this.service.salvar(this.cliente)
      .subscribe(response => {
        this.success = true;
        this.errors = null;
        this.cliente = response;
      }, errorResponse => {
        this.success = false;
        this.errors = errorResponse.error.errors;
      });
  }

}