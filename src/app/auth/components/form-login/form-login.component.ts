import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { faUser,faLock } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss']
})
export class FormLoginComponent implements OnInit {

  //Iconos
  faUser = faUser;
  faLock = faLock;

  // public formLogin!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  formLogin = this.formBuilder.group({
    usuario: ['',
    [
      Validators.required
      
    ]
  ],
    password: ['',
    [
      Validators.required
    ]
  ]
  })

  ngOnInit(): void {
    
  }

  guardar(){

    if(this.formLogin.invalid){
      this.formLogin.markAllAsTouched();
      return
    }
    console.log(this.formLogin.value)

    this.formLogin.reset(); 
  }

  campoEsValido(campo: string){
    return this.formLogin.controls[campo].errors
            && this.formLogin.controls[campo].touched
  }
}
