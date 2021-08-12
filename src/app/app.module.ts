import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { InicioComponent } from './inicio/inicio.component';

//Modulos
import { CatalogoModule } from './catalogo/catalogo.module';

@NgModule({
  declarations: [
    AppComponent,
    CatalogoComponent,
    PedidosComponent,
    InicioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CatalogoModule,

    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [],
  providers: [
    CatalogoComponent,
    AppComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
