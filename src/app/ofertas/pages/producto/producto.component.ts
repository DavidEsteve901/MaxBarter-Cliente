import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../../services/general.service';
import { ActivatedRoute } from '@angular/router';
import { Producto } from '../../../interfaces/interfaces';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {

  producto !:Producto | any;
  imgPerfil!:any;

  imagenesProducto:any[] = [];

  edit: boolean = false;

  editProducto = new Subject<Producto>();

  constructor(
    private generalService: GeneralService,
    private rutaActiva: ActivatedRoute,
    private currentUser: CurrentUserService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.rutaActiva.params.subscribe(
      (resp:any)=>{
        
        if(resp.id != "null"){ // Si el id no es null que me busque el producto
          this.edit = true;
          this.generalService.getProductById(resp.id).subscribe(
            (resp:any)=>{


              this.producto = resp.data

              //Buscamos la foto de perfil del usuario
              this.generalService.getImagenPerfil(this.producto?.propietario).subscribe(
                (resp:any)=>{
          
                  this.generalService.blobToBase64(resp).then(base64 => {
                    this.imgPerfil = base64;
                  });
                  
                },
                (error:any)=>{
                  console.log(error)
                },
              )
            }
          )
        }else{// Si es null significa que vamos a crear uno nuevo
          
          //Creamos el objeto producto con los datos que necesitaremos
          this.producto = {
            titulo:"",
            tipo: null,
            match: false,
            tipoProducto:{
              id: "",
              nombre: ""
            },
            descripcion:"",
          }

          //Buscamos la foto de perfil del usuario logueado 

          //Actualizamos Usuario Logueado
          this.authService.setCurrentUser();

          //Método para saber si es el perfil del usuario logueado
          this.currentUser.getCurrentUser$().subscribe(
            (resp:any)=>{
              // Asignamos al producto el propietario
              this.producto.propietario = resp;

              //Buscamos la foto de perfil del usuario
              this.generalService.getImagenPerfil(resp).subscribe(
                (resp:any)=>{
          
                  this.generalService.blobToBase64(resp).then(base64 => {
                    this.imgPerfil = base64;
                  });
                  
                },
                (error:any)=>{
                  console.log(error)
                },
              )
            }
          )

          

        }

      }
    )

    
    
  }

  //Pasamos las imagenes al componente Producto
  updateImages(imagenes: any) {
    
    this.imagenesProducto = [];


    // imagenes.forEach((img: any) => {

    this.generalService.extraerImagenesBase64(imagenes).then(
      (base64Images) => {
        this.generalService.setUpdateImageProducto(base64Images)
      }
    );
    
  }

}
