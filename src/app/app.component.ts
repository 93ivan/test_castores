import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent {
  title = 'test-castores';

  public allProducts: any = [
    {
      "codigo":"000001",
      "name": "Taza alta calidad",
      "color": "Rojo",
      "dimension":"",
      "capacidad":"125 ml",
      "modelo":"",
      "material":"Plastico",
      "cantidad":"100"
    },
    {
      "codigo":"000002",
      "name": "Taza baja calidad",
      "color": "Gris",
      "dimension":"",
      "capacidad":"455 ml",
      "modelo":"",
      "material":"Aluminio",
      "cantidad":"100"
    }
  ];
}
