import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CatalogoService {

  constructor(
    private httpClient:HttpClient
  ) { }

  //Ejmplo de funcion para consumir microservicio que devuelve los productos
  getProduct(){
    return this.httpClient.get<any>('https://......')
  }

  //Ejemplo de funcion para consumir microservicio que recibe como parametro el registro de un nuevo producto
  addProduct(data: any){
    return this.httpClient.post<any>('https://.....', data)
  }

  //Ejemplo de funcion para consumir microservicio que recibe como parametros los valores del registro a actualizar
  //y el codigo como identificador unico del registro que se va a modificar
  updateProduct(data: any, codigo: any){
    return this.httpClient.put<any>('https://.....', codigo, data)
  }
}
