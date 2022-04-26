import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';
import { Producto, Tipo } from 'src/app/interfaces/interfaces';
import { Subject } from 'rxjs';
import { GeneralService } from '../../services/general.service';

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
  tipos!:Tipo[] ;
  tipoSelected!: any;
  placeHolderTipo:string = "Categoría";


  @Input() producto:Producto | any ;
  @Input() edit: boolean = false;
  @Output() editProducto = new EventEmitter<Producto>();

  public form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private generalService: GeneralService,
    private router: Router) { }

  

  ngOnInit(): void {
    //Creamos el formulario
    this.form = this.formBuilder.group({
      titulo: ['',[Validators.required]],
      tipo: ['',[Validators.required]],
      descripcion: ['',[Validators.required]]
    })

    
     //Inicianlizamos los datos de los tipos
     this.generalService.getTipos().subscribe(
      (resp:any)=>{
        //mapeo la respuesta para cambiar el nombre de los atributos
        var tipoChange = resp.data.map((t:any)=>{
          var tChang:any = {};
          tChang['name'] = t.nombre;
          tChang['value'] = t.id;

          return tChang;
        })

        this.tipos = tipoChange;

        console.log(this.tipos)

        
      }
    )
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

  changeHover(){
    console.log(this.producto)

    if(this.tipoSelected){
      this.placeHolderTipo = this.tipoSelected.name;
      this.producto.tipo = this.tipoSelected.value;

      this.producto.tipoProducto.nombre = this.tipoSelected.name;
      this.producto.tipoProducto.id = this.tipoSelected.value;

    }else{
      this.placeHolderTipo = "Categoría";
    }
    
  }
}



