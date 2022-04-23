import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-form-producto',
  templateUrl: './form-producto.component.html',
  styleUrls: ['./form-producto.component.scss']
})
export class FormProductoComponent implements OnInit {

  //Iconos
  faPencil = faPencil;

  //Variables comunes
  error:any = null;

  // public formLogin!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router) { }

  form = this.formBuilder.group({
    titulo: ['',[Validators.required]],
    tipo: ['',[Validators.required]],
    descripcion: ['',[Validators.required]]
  })

  ngOnInit(): void {
    
  }

  guardar(){

    if(this.form.invalid){
      this.form.markAllAsTouched();
      return
    }

    
    console.log(this.form.value)

    this.form.reset(); 
  }

  campoEsValido(campo: string){
    return this.form.controls[campo]?.errors
            && this.form.controls[campo]?.touched
  }
}



