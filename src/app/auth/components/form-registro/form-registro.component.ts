import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { faUser,faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { ValidatorService } from 'src/app/shared/validator/validator.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-form-registro',
  templateUrl: './form-registro.component.html',
  styleUrls: ['./form-registro.component.scss']
})
export class FormRegistroComponent implements OnInit {

  //Iconos
  faUser = faUser;
  faLock = faLock;
  faEnvelope = faEnvelope;

  //Variables comunes
  error:any = null;

  constructor(private formBuilder: FormBuilder,
              private validatorService: ValidatorService,
              private authService: AuthService,
              private router: Router) { }

  form: FormGroup = this.formBuilder.group({
    userName: ['',[ Validators.required]],
    correo: ['',
      [
        Validators.required,
        Validators.pattern(this.validatorService.emailPattern)
      ]
    ],
    nombre: ['',[Validators.required]],
    apellidos: ['',[Validators.required]],
    password: ['',[Validators.required]],
    confirmPassword: ['',[Validators.required]],

  },
  {
    // validators: [this.MustMatch('password','confirmPassword')]
    validator: [this.validatorService.camposIguales('password','confirmPassword')]
  }
  )

  ngOnInit(): void {}



  guardar(){

    if(this.form.invalid){
      this.form.markAllAsTouched();
      return
    }
    console.log(this.form.value)
    
    this.authService.registrarse(this.form.value).subscribe(
      (resp: any) =>{
        console.log(resp)
        
        this.error = null;
        //Guardamos el TOKEN que recibimos en el localStorage
        // localStorage.setItem('token', resp.token) 

        //Redirigimos a login porque se ha registrado
        this.router.navigate(['/auth/login'])
      },
      (err: any) =>{
        console.log(err)
        this.error = err.error;
        
      }
    );
    
    
    this.form.reset(); 
  }

  campoEsValido(campo: string){
    return this.form.controls[campo].errors
            && this.form.controls[campo].touched
  }


}
