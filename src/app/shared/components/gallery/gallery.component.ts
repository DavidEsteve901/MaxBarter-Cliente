import { Component, ComponentFactoryResolver, Input, OnInit } from '@angular/core';
import { faArrowLeft,faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { GeneralService } from '../../../ofertas/services/general.service';
declare var $:any;
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {


  //Iconos
  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;
  @Input() imagenes:any[] = ["https://cdn-icons-png.flaticon.com/512/85/85488.png"];

  imagenesCortadas:any = null;
  


  constructor(
    private generalService:GeneralService
  ) { }

  ngOnInit(): void {
    
    if(this.imagenes.length == 0 ){
      this.imagenes = ["https://cdn-icons-png.flaticon.com/512/85/85488.png"];
    }


    this.generalService.getUpdateImageProducto$().subscribe(
      (resp:any[])=>{
        
        
        

        if(resp.length != 0){

          if(resp.length == 1){

            this.imagenes = resp;
            this.imagenesCortadas = [] ;
          }else{
            this.imagenes = resp;
            this.imagenesCortadas = resp.slice(1,resp.length) ;
          }
          

          // this.imagenesCortadas.splice(0,1)
        }else{
          this.imagenes = ["https://cdn-icons-png.flaticon.com/512/85/85488.png"],
          this.imagenesCortadas = null;
        }

        //Reiniciamos el carousel a la posicion 0 para que no de problemas con el slider
        $('.carousel').carousel({
          pause: true,
          interval: false
        }).carousel(0);

        // console.log("respuesta",resp)
        // console.log("imagenes",this.imagenes)
        // console.log("imagenesCortadas",this.imagenesCortadas)
      }
    )

    this.generalService.getUpdateImageProductoIndividual$().subscribe(
      (resp:any[])=>{
        
        if(this.imagenes.length != 0){

          if(this.imagenes.length == 1){
            this.imagenesCortadas = [] ;
          }else{
            this.imagenesCortadas = this.imagenes.slice(1,this.imagenes.length) ;
          }
          

          // this.imagenesCortadas.splice(0,1)
        }else{
          // this.imagenes = ["https://cdn-icons-png.flaticon.com/512/85/85488.png"],
          // this.imagenesCortadas = null;
        }

        // console.log("respuesta",resp)
        // console.log("imagenes",this.imagenes)
        // console.log("imagenesCortadas",this.imagenesCortadas)
      }
    )
    
  }


}
