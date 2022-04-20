import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../../interfaces/interfaces';


@Component({
  selector: 'app-perfil-view',
  templateUrl: './perfil-view.component.html',
  styleUrls: ['./perfil-view.component.scss']
})
export class PerfilViewComponent implements OnInit {

  @Input() usuario!:Usuario;
  
  rutaPerfil!:string ;

  constructor(
    private router:Router,
  ) { }

  ngOnInit(): void {
    // this.rutaPerfil = `ofertas/perfil/${this.usuario.userName}`
  }

  checkRoutePerfil(){
    return !this.router.isActive("/ofertas/perfil",false);
  }

  redirectPerfil(){
    console.log("click")
    this.router.navigate([ `ofertas/perfil/${this.usuario.userName}`])
  }

}
