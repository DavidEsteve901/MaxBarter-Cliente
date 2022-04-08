import { Component, OnInit } from '@angular/core';

import { faUser,faLock } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  //Iconos
  faUser = faUser;
  faLock = faLock;

  constructor() { }

  ngOnInit(): void {
    
  }

}
