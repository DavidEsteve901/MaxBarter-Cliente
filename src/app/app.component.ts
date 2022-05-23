import { Component, OnInit } from '@angular/core';
import { Router, RouterLinkActive } from '@angular/router';

//PrimeNG ripple
import { PrimeNGConfig } from 'primeng/api';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  title = 'Cliente';
  bgAnimado: boolean = false;
  
  constructor( private router: Router,
              private PrimeNGConfig: PrimeNGConfig){}

  ngOnInit(): void {
    // this.PrimeNGConfig.ripple = true;
  }

  //Determina el fondo de la página
  checkBg(): string{
    this.bgAnimado = this.router.isActive("/auth",false);
    
    if(this.bgAnimado){
      return "bg-animation"
    }else{
      //Comprobamos estamos en aboutUs
      if(this.router.isActive("/ofertas/aboutUs",false)){
        return "bg-animation"
      }else{
        return "bg-static"
      }
    }
  }
  

}
