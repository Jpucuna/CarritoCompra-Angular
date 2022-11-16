import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompraComponent } from './compra/compra.component';
import { RegistrarCompraComponent } from './compra/registrar-compra/registrar-compra.component';
import { InicioComponent } from './inicio.component';
import { ProductoComponent } from './producto/producto.component';
import { EditarUsuarioComponent } from './usuario/editar-usuario/editar-usuario.component';
import { UsuarioComponent } from './usuario/usuario.component';

const routes: Routes = [
  {path:'', component: InicioComponent, children:[
    {path:'', component: ProductoComponent},
    {path:'producto', component: ProductoComponent},
    {path:'usuario', component: UsuarioComponent},
    {path: 'editarUsuario', component: EditarUsuarioComponent},
    {path: 'compra', component: CompraComponent},
    {path: 'registrarCompra', component:RegistrarCompraComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InicioRoutingModule { }
