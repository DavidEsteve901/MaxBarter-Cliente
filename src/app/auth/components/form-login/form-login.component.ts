import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { faUser,faLock } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss']
})
export class FormLoginComponent implements OnInit {

  //Iconos
  faUser = faUser;
  faLock = faLock;

  //Variables comunes
  error:any = null;

  // public formLogin!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router) { }

  formLogin = this.formBuilder.group({
    userName: ['',[Validators.required]],
    password: ['',[Validators.required]]
  })

  ngOnInit(): void {
    
  }

  guardar(){

    if(this.formLogin.invalid){
      this.formLogin.markAllAsTouched();
      return
    }

    this.authService.login(this.formLogin.value).subscribe(
      (resp: any) =>{
        console.log(resp)
        
        this.error = null;
        //Guardamos el TOKEN que recibimos en el localStorage
        localStorage.setItem('token', resp.token) 

        //Método para actualizar usuario que tiene sesión iniciada
        this.authService.setCurrentUser();

        this.router.navigate(['/ofertas/home'])
        
      },
      (err: any) =>{
        console.log(err)
        this.error = err.error;
        
      }
    )
    console.log(this.formLogin.value)

    this.formLogin.reset(); 
  }

  campoEsValido(campo: string){
    return this.formLogin.controls[campo].errors
            && this.formLogin.controls[campo].touched
  }
}
