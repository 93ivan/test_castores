import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  constructor(
    private httpClient:HttpClient
  ) { }

  //Ejemplo de funcion para consumir microservicio que recibe como parametros el nuevo valor de la cantidad en stock 
  //y el codigo como identificador unico del registro que se va a modificar
  updateProduct(data: any, codigo: any){
    return this.httpClient.put<any>('https://.....', codigo, data)
  }
}
