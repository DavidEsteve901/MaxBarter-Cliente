import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/ofertas/services/general.service';
import { Usuario } from '../../../interfaces/interfaces';


@Component({
  selector: 'app-perfil-view',
  templateUrl: './perfil-view.component.html',
  styleUrls: ['./perfil-view.component.scss']
})
export class PerfilViewComponent implements OnInit {

  @Input() usuario!:any;
  
  rutaPerfil!:string;

  @Input() imgPerfil!:any;

  constructor(
    private router:Router,
    private generalService:GeneralService
  ) { }

  ngOnInit(): void {
    if(!this.imgPerfil && this.usuario){
      //Buscamos foto perfil
      this.generalService.getImagenPerfil(this.usuario).subscribe(
        (resp:any)=>{

          this.generalService.blobToBase64(resp).then(base64 => {
            this.imgPerfil = base64;
          });
          
        },
        (error:any)=>{
          // console.log(error)
        },
      )
    }
    
    
    
  }

  checkRoutePerfil(){
    return !this.router.isActive("/ofertas/perfil",false);
  }

  redirectPerfil(){

    this.router.navigate([ `ofertas/perfil/${this.usuario.userName}`])
    
  }

  setUser(user:any){
    this.usuario = user
  }

 

}
