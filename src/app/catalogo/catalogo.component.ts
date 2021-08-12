import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CatalogoService } from './catalogo.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html'
})
export class CatalogoComponent implements OnInit {

  constructor( 
    private catalogoService: CatalogoService,
    public appComponent: AppComponent
  ) { }

  //Declaracion de Formulario para validaciones de campos obligatorios
  catalogoForm = new FormGroup({
    codigo: new FormControl('', 
      Validators.required
    ),
    name: new FormControl('', Validators.required),
    color: new FormControl('', Validators.required),
    dimension: new FormControl(''),
    capacidad: new FormControl('', Validators.required),
    modelo: new FormControl(''),
    material: new FormControl('', Validators.required),
    cantidad: new FormControl('', Validators.required),
  });

  //Declaracion de variables
  public submitted = false;
  public stock: number = 0;
  public updateProduct: any = [];
  public tipo: any = [];
  public color: any = [];
  public dimension: any = [];
  public capacidad: any = [];
  public modelo: any = [];
  public material: any = [];
 

  //Funcion inicial
  ngOnInit(): void { }

  //Validacion de campos obligatorios
  get f() { return this.catalogoForm.controls; }

  //Funcion para control de variable de agregar a stock
  addStock(){
    this.stock += 1; 
  }

  //Valores de campos para actualizar stock
  addStockModal(registro: any){
    this.updateProduct = registro;
  }

  //funcion de control de variable de agregar a stock cuando se modifica directamente el input
  upStock(evento: any){
    this.stock = Number(evento.target.value);
  }

  //Funcion de control de variable de quitar stock
  subtractStock(){
    if(this.stock > 0){
      this.stock -= 1;
    } 
  }

  //Funcion de limpiar variable de stock
  clearStock(){
    this.stock = 0;
  }

  //Funcion para agregar nuevo producto.
  /*NOTA: Por ahora solo agrega los valores del formulario a un arreglo*/
  newProduct(){
    this.submitted = true;
    if (this.catalogoForm.invalid) {
        return;
    }

    /*Esta seria la funcion a ejecutar teniendo un microservicio que espere como
    parametetro el nuevo registro y lo inserte en la BD

    this.addProduct(this.catalogoForm.value);
    */
    
    this.appComponent.allProducts.push(this.catalogoForm.value);
    //this.allProducts.push(this.catalogoForm.value);
    this.catalogoForm.reset();
    this.submitted = false;
  }

  updateRegistro(){
    this.stock = Number(this.stock) + Number(this.updateProduct.cantidad)
    this.updateProduct.cantidad = this.stock;
    this.clearStock();

     /*Esta seria la funcion a ejecutar teniendo un microservicio que espere como
    parametetro el registro y el codigo del producto a actualizar en la BD

    this.updateProductService(this.updateProduct, this.updateProduct.codigo);*/
    
  }

  //Las siguientes funciones solo estan de ejemplo de como seria el flujo consumiendo microservicios

  //Funcion para obtener los productos consuminendo un microservicio
  getProducts(){
    this.catalogoService.getProduct().subscribe(
        (data) => {
          this.appComponent.allProducts = data;
        },(err) => {
          //Control de errores en caso de que falle el servicio
        }
      );
  }

  //Funcion para insertar nuevos registros consumiendo un microservicio
  addProduct(data: any){
    this.catalogoService.addProduct(data).subscribe(
      (data) => {
        //Datos de respuesta en caso de que el microservicio inserte con exito en la BD
      },
      (err) =>{
        //Control de errores en caso de que falle el servicio
      }
    );
  }

  //Funcion para actualizar registros consumiendo un microservicio
  updateProductService(data: any, codigo: any){
    this.catalogoService.updateProduct(data, codigo).subscribe(
      (data) => {
        //Datos de respuesta en caso de que el microservicio inserte con exito en la BD
      },
      (err) =>{
        //Control de errores en caso de que falle el servicio
      }
    );
  }
}
