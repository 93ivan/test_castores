import { Component, Input, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { PedidosService } from './pedidos.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html'
})
export class PedidosComponent implements OnInit {

  constructor(
    public appComponent: AppComponent,
    private pedidoService: PedidosService
  ) { }

  public indice: any;
  public codigoUpdate: any;
  public layoutPromocion: any;
  public regaloFlag = false;
  public regalo: any = 0;
  public totalCompra = 1;
  public carBuy: any = [];

  ngOnInit(): void { }

  //Funcion para controlar variable de cantidad a comprar
  upSell(event: any){
    this.totalCompra = event.target.value;
  }

  //Funcion para calcular las tazas de regalo por cada 10 de compra
  addBuy(data: any){
    this.codigoUpdate = data.codigo;
    this.indice = this.appComponent.allProducts.indexOf(data);
    if(Number(data.cantidad) >= Number(this.totalCompra)){
      this.carBuy = data;
      switch(data.name){
        case 'Taza alta calidad':
          if(this.totalCompra >= 10){
            this.regaloFlag = true;
            this.regalo = (Math.trunc(this.totalCompra / 10)*3);
            this.layoutPromocion = "*Disfruta tus "+ this.regalo +" Tazas baja calidad de regalo*";
          }else{
            this.regaloFlag = false;
            this.layoutPromocion = "*Recuerda que por cada 10 piezas de Taza alta calidad te regalamos 3 Tazas de baja calidad*";
          }
          break;
        case 'Taza baja calidad':
          if(this.totalCompra >= 10){
            this.regaloFlag = true;
            this.regalo = (Math.trunc(this.totalCompra / 10)*2);
            this.layoutPromocion = "*Disfruta tus "+ this.regalo +" Tazas baja calidad de regalo*";
          }else{
            this.regaloFlag = false;
            this.layoutPromocion = "*Recuerda que por cada 10 piezas de Taza baja calidad te regalamos otras 2 piezas del mismo valor*";
          }
          break;
      }
    }else{
      console.log("No hay suficiente stock");
    }
  }

  //Funcion para restar los productos vendidos del stock
  confirmBuy(){
    this.appComponent.allProducts[this.indice].cantidad = Number(this.carBuy.cantidad) - Number(this.totalCompra);
    this.totalCompra = 1;
    this.appComponent.allProducts[1].cantidad = Number(this.appComponent.allProducts[1].cantidad) - Number(this.regalo);
    
    /**Estas serian las funciones a ejecutar teniendo un microservicio que espere como
    parametetro la nueva cantidad en stock y el codigo del producto a actualizar en la BD

    this.updateProductService(this.appComponent.allProducts[this.indice].cantidad, this.codigoUpdate);
    this.updateProductService(this.appComponent.allProducts[1].cantidad, this.codigoUpdate);
    */
  }

  //Las siguientes funciones solo estan de ejemplo de como seria el flujo consumiendo microservicios

  //Funcion para actualizar registros consumiendo un microservicio
  updateProductService(data: any, codigo: any){
    this.pedidoService.updateProduct(data, codigo).subscribe(
      (data) => {
        //Datos de respuesta en caso de que el microservicio inserte con exito en la BD
      },
      (err) =>{
        //Control de errores en caso de que falle el servicio
      }
    );
  }
}
