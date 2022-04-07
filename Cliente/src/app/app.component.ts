import { Component, OnInit } from '@angular/core';
import { Router, RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  title = 'Cliente';
  bgAnimado: boolean = false;
  constructor( private router: Router){}

  ngOnInit(): void {

  }

  //Determina el fondo de la página
  checkBg(): string{
    this.bgAnimado = this.router.isActive("/auth",false);
    
    if(this.bgAnimado){
      return "bg-animation"
    }else{
      return ""
    }
  }
  

}
