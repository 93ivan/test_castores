import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, Router} from '@angular/router';

//Componentes
import { InicioComponent } from '../inicio/inicio.component';
import { CatalogoComponent } from '../catalogo/catalogo.component';
import { PedidosComponent } from '../pedidos/pedidos.component';

const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'catalogo', component: CatalogoComponent },
  { path: 'pedidos', component: PedidosComponent },
  { path: '**', component: InicioComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
