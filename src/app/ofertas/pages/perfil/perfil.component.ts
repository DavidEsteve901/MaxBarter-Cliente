import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GeneralService } from '../../services/general.service';
import { Usuario } from '../../../interfaces/interfaces';
import {ActivatedRoute,Params, Router} from "@angular/router";
import { CurrentUserService } from 'src/app/shared/services/current-user.service';
import { AuthService } from 'src/app/auth/services/auth.service';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {




  usuario!:any;
  imgPerfil!:any;
  titulo:string = "PERFIL";
  optionsUser:boolean = false;
  coordenadas!:any;
  isAdmin:any = false;

  displayResponsive: boolean = false;
  
  constructor(
    private generalService:GeneralService,
    private rutaActiva: ActivatedRoute,
    private currentUser: CurrentUserService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {


    //Obsevable que tenecta la ruta
    this.rutaActiva.params.subscribe(
      (params: any)=>{

        //Método para obtener datos del usuario
        this.generalService.getUserById(params.userName).subscribe(
          (resp:any) =>{

            this.usuario = resp.data;
            
          
            //Convertimos la coordenadas en JSON
            if(typeof this.usuario.coordenadas !== "object"){
              this.usuario.coordenadas = JSON.parse(this.usuario.coordenadas);
            }
            

            //Actualizamos Usuario Logueado
            this.authService.setCurrentUser();

            //Método para saber si es el perfil del usuario logueado
            this.currentUser.getCurrentUser$().subscribe(
              (resp:any)=>{
                if(resp.userName === this.usuario.userName){
                  this.titulo = 'MI PERFIL';
                  this.optionsUser = true;
                }

                this.isAdmin = false;
                 //Pasamos los roles a JSON
                if(typeof resp.roles !== "object"){
                  resp.roles = JSON.parse(resp.roles)
                }
        
                
                //Vemos si el usuario es admin
                resp.roles.find((role:any)=>{
                  if(role === "ROLE_ADMIN"){
                    this.isAdmin = true
                  }
                })

              }
            )

            //Buscamos la img del usuario y se la pasamos por @input al hijo
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


  logout(){
    this.authService.logout()
  }

  redirectProductos(){
    return this.router.navigate([`ofertas/productos/${this.usuario.userName}`])
  }

  redirectStats(){
    return this.router.navigate([`ofertas/stats/${this.usuario.userName}`])
  }
  
  showMaximizableDialog() {
    this.displayResponsive = true;
  }

  checkUser(){
    //Cada vez que cierre el dialogo que refresque el usuario por si ha modificado los datos
    //Método para obtener datos del usuario
    this.generalService.getUserById(this.usuario.userName).subscribe(
      (resp:any)=>{
        this.usuario = resp.data;
        
        //Convertimos la coordenadas en JSON
        if(typeof this.usuario.coordenadas !== "object"){
          this.usuario.coordenadas = JSON.parse(this.usuario.coordenadas);
        }

        this.generalService.setUpdateCoords(this.usuario.coordenadas);
      }
    )
  }

}
