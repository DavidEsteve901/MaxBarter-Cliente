import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { faUser,faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { ValidatorService } from 'src/app/shared/validator/validator.service';

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


  constructor(private formBuilder: FormBuilder,
              private validatorService: ValidatorService) { }

  form: FormGroup = this.formBuilder.group({
    usuario: ['',
      [
        Validators.required
        
      ]
    ],
    correo: ['',
      [
        Validators.required,
        Validators.pattern(this.validatorService.emailPattern)
      ]
    ],
    nombre: ['',
      [
        Validators.required
        
      ]
    ],
    apellidos: ['',
      [
        Validators.required
        
      ]
    ],
    password: ['',
      [
        Validators.required
      ]
    ],
    confirmPassword: ['',
      [
        Validators.required
      ]
    ],

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

    this.form.reset(); 
  }

  campoEsValido(campo: string){
    return this.form.controls[campo].errors
            && this.form.controls[campo].touched
  }


}
