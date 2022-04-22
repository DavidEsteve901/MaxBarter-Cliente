import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Producto } from 'src/app/interfaces/interfaces';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';
import { GeneralService } from '../../services/general.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {

  //Iconos
  faArrowUp = faArrowUp;


  showButton = false;
  private pageNum = 0;

  filter:any ={
    userName: null
  }

  //Pixeles para que salga el botón de subir scroll
  private scrollHeight = 300;
  productos:Producto[] = [];



  usuario!:any;
  imgPerfil!:any;

  constructor(
    private generalService:GeneralService,
    private rutaActiva: ActivatedRoute,
    private currentUser: CurrentUserService,
    private authService: AuthService,
    @Inject(DOCUMENT) private document: Document,
  ) { }

  ngOnInit(): void {
    //Obsevable que tenecta la ruta
    this.rutaActiva.params.subscribe(
      (params: any)=>{

        //Método para obtener datos del usuario
        this.generalService.getUserById(params.userName).subscribe(
          (resp:any) =>{
            this.usuario = resp.data;

            this.filter.userName = this.usuario.userName;

            this.onScrollDown({userName: this.usuario.userName});

            // console.log(this.usuario)

            //Actualizamos Usuario Logueado
            this.authService.setCurrentUser();

            //Método para saber si es el perfil del usuario logueado
            this.currentUser.getCurrentUser$().subscribe(
              (resp:any)=>{
                if(resp.userName === this.usuario.userName){

                }
              }
            )

          
            //Buscamos foto perfil
            this.generalService.getImagenPerfil(this.usuario).subscribe(
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
    )

  }

  @HostListener('window:scroll')
  onWindowScroll():void{
    const yOffSet = window.pageYOffset;
    const scrollTop = this.document.documentElement.scrollTop;

    this.showButton = (yOffSet || scrollTop) > this.scrollHeight;
  }

  onScrollTop():void{
    this.document.documentElement.scrollTop = 0;
  }

  onScrollDown(options:any){
    
    this.pageNum++;

    this.generalService.getProductsByPage({
      page: this.pageNum,
      q: {
        userName: options.userName
      }
    
    }).subscribe(
      (resp:any)=>{
      
        this.productos = this.productos.concat(resp.data.data);
      },
      (error:any) =>{
        console.log(error)
      }
    )
  }

}
