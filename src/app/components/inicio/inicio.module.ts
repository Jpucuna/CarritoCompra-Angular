import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioRoutingModule } from './inicio-routing.module';
import { InicioComponent } from './inicio.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UsuarioComponent } from './usuario/usuario.component';
import { ProductoComponent } from './producto/producto.component';
import { EditarUsuarioComponent } from './usuario/editar-usuario/editar-usuario.component';
import { CompraComponent } from './compra/compra.component';
import { RegistrarCompraComponent } from './compra/registrar-compra/registrar-compra.component';
import { DialogCompraComponent } from './compra/dialog-compra/dialog-compra.component';


@NgModule({
  declarations: [
    InicioComponent,
    UsuarioComponent,
    ProductoComponent,
    EditarUsuarioComponent,
    CompraComponent,
    RegistrarCompraComponent,
    DialogCompraComponent
  ],
  imports: [
    CommonModule,
    InicioRoutingModule,
    SharedModule
  ]
})
export class InicioModule { }
