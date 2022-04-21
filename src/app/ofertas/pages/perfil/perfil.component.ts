import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GeneralService } from '../../services/general.service';
import { Usuario } from '../../../interfaces/interfaces';
import {ActivatedRoute,Params} from "@angular/router";
import { CurrentUserService } from 'src/app/shared/services/current-user.service';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {




  usuario!:any;
  imgPerfil!:any;
  titulo:string = "PERFIL";

  constructor(
    private generalService:GeneralService,
    private rutaActiva: ActivatedRoute,
    private currentUser: CurrentUserService
  ) { }

  ngOnInit(): void {
    //Obsevable que tenecta la ruta
    this.rutaActiva.params.subscribe(
      (params: any)=>{

        //Método para obtener datos del usuario
        this.generalService.getUserById(params.userName).subscribe(
          (resp:any) =>{
            this.usuario = resp.data;
            // console.log(this.usuario)
          
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
            
            //Método para saber si es el perfil del usuario logueado
            this.currentUser.getCurrentUser$().subscribe(
              (resp:any)=>{
        
                if(resp.userName === this.usuario.userName){
                  this.titulo = 'MI PERFIL'
                }
              }
            )
    
          }
        )
      }
    )
    
     
  }



}
