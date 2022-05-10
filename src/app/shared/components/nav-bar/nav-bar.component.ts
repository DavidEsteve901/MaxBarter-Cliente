import { Component, OnInit } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CurrentUserService } from '../../services/current-user.service';
import { Router } from '@angular/router';
import { RegistroComponent } from '../../../auth/pages/registro/registro.component';
import { GeneralService } from 'src/app/ofertas/services/general.service';
declare var $:any;

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  faBars = faBars;
  color: boolean = false;
  user:any = null;

  matchs:any = 0;

  rutaPerfil!:string ;
  imgPerfil!:any;

  intervalo!:any;

  constructor(
    private authService:AuthService,
    private currentUserService:CurrentUserService,
    private router:Router,
    private generalService:GeneralService
  ) { }

  ngOnInit(): void {
    //Actualizamos Usuario Logueado
    this.authService.setCurrentUser();

    //Nos suscribismo al servicio para obtener el usuario logueado (gracias al obsevable se notificario si cambia)
    this.currentUserService.getCurrentUser$().subscribe( (user) =>{
      this.user = user;
      this.rutaPerfil = `ofertas/perfil/${this.user.userName}`;
      
      
      
      if(user){
        
        //Buscamos foto perfil
        this.generalService.getImagenPerfil(this.user).subscribe(
          (resp:any)=>{
            
            this.generalService.blobToBase64(resp).then(base64 => {
              this.imgPerfil = base64;
            });
            
          },
          (error:any)=>{
            this.imgPerfil = null;
            // console.log(error)
          },
        )
      }

      //Buscamos lo matchs que tiene
      this.generalService.getUserMatchs(this.user.userName).subscribe(
        (resp:any)=>{
          this.matchs = resp.data;
        }
      )
      

      //Seteamos el intervalo de animacion
      clearInterval(this.intervalo);
      this.intervalo =  setInterval(this.re_animate, 4000);

      // console.log("SUB",user)
    })

    
    
    
  }



  isLogin(){
    return this.authService.loggedIn()
  }

  checkRoute(){
     return !this.router.isActive("/auth",false);
  }

  logout(){
    this.authService.logout()
  }

  //Determina el fondo del nav
  checkColor(): string{
    this.color = this.router.isActive("/auth",false);
    
    if(this.color){
      return "color-auth"
    }else{
      //Comprobamos estamos en aboutUs
      if(this.router.isActive("/ofertas/aboutUs",false)){
        return "color-auth" 
      }else{
        return "color"
      }
    }

    
    
  }

  currentUser(){
    console.log("Usuario",this.user)
  }

  redirectProductos(){
    if(this.user){
      return `ofertas/productos/${this.user.userName}`;

    }else{
      return ""
    }
  }

  re_animate() {
    $('#badgeMatchs').toggleClass('animate__animated animate__bounce');
  }
}
