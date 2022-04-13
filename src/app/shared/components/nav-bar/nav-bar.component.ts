import { Component, OnInit } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/auth/services/auth.service';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  faBars = faBars;
  constructor(
    private authService:AuthService
  ) { }

  ngOnInit(): void {
  }

  isLogin(){
    return this.authService.loggedIn()
  }

  logout(){
    this.authService.logout()
  }
}
