import { Component, OnInit } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  faBars = faBars;
  color: boolean = false;

  constructor(
    private authService:AuthService,
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  isLogin(){
    return this.authService.loggedIn()
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
      return "color"
    }
  }
}
