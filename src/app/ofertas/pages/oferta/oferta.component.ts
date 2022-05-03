import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { GeneralService } from '../../services/general.service';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.scss']
})
export class OfertaComponent implements OnInit {

  productoOferta!:any;
  misProductos!:any;

  productoSelected!:any;

  constructor(
    private rutaActiva: ActivatedRoute,
    private router: Router,
    private generalService: GeneralService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    //Sacamos parametros de la url
    this.rutaActiva.params.subscribe(
      (resp:any)=>{

        //Obtenemos el producto pasado
        this.generalService.getProductById(resp.idProducto).subscribe(
          (resp:any) => {
            this.productoOferta = resp.data
            console.log(this.productoOferta)

          }
        )

        //Obtenemos los productos del usuario 
        this.authService.getCurrentUser().subscribe(
          (resp:any)=>{
            this.generalService.getProductosByUser(resp.data.userName).subscribe(
              (resp:any) => {
                this.misProductos = resp.data
                console.log(this.misProductos)
              }
            )
          }
        )

        
      }
    )

  }

  seleccionar(event:any,producto:any){
    
    let elemento = document.getElementById(producto.id)

    let hijos :any= document.getElementById("misProductos")?.children;

    //Elimino la seleccion a todos los productos
    for (let i = 0; i < hijos.length; i++) {
      hijos[i].classList.remove("prodSelected");
    }
  
    //Le añado la selección al que ha hecho click
    elemento?.classList.add("prodSelected")
    
    this.productoSelected = producto;


  }

}
