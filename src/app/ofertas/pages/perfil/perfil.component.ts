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

            //Actualizamos Usuario Logueado
            this.authService.setCurrentUser();

            //Método para saber si es el perfil del usuario logueado
            this.currentUser.getCurrentUser$().subscribe(
              (resp:any)=>{
                if(resp.userName === this.usuario.userName){
                  this.titulo = 'MI PERFIL';
                  this.optionsUser = true;
                }
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
  


}
