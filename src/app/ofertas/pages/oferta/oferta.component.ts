import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
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

  noProductos = false;

  productoSelected!:any;

  userRecibe!:any;
  userPide!:any;


  constructor(
    private rutaActiva: ActivatedRoute,
    private router: Router,
    private generalService: GeneralService,
    private authService: AuthService,
    private messageService: MessageService

  ) { }

  ngOnInit(): void {
    //Sacamos parametros de la url
    this.rutaActiva.params.subscribe(
      (resp:any)=>{
        this.userRecibe = resp.idUser;
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
            this.userPide = resp.data.userName;
            this.generalService.getProductosByUser(resp.data.userName).subscribe(
              (resp:any) => {
                this.misProductos = resp.data; 
                
                if(this.misProductos.length == 0){
                  this.noProductos = true;
                }
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

  sendOferta(){
    const oferta = {
      producto1: this.productoSelected.id,
      producto2: this.productoOferta.id,
      user1: this.userPide,
      user2: this.userRecibe
    }

    this.generalService.createOferta(oferta).subscribe(
      (resp:any)=>{
        this.messageService.add({severity: 'success', summary: resp.message, detail: ''});
        this.router.navigate(["ofertas/home"])
      },
      (error:any)=>{
        this.messageService.add({severity: 'error', summary: error.error.message, detail: ''});
      }
    )
  }

}
