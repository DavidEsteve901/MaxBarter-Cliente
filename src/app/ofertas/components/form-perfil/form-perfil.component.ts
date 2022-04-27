import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';
import { Producto, Tipo, Usuario } from 'src/app/interfaces/interfaces';
import { Subject } from 'rxjs';
import { GeneralService } from '../../services/general.service';
import { MessageService } from 'primeng/api';
import { ValidatorService } from 'src/app/shared/validator/validator.service';

@Component({
  selector: 'app-form-perfil',
  templateUrl: './form-perfil.component.html',
  styleUrls: ['./form-perfil.component.scss']
})
export class FormPerfilComponent implements OnInit {

  //Iconos
  faPencil = faPencil;

  //Variables comunes
  error:any = null;
  comunidadesAtonomas!:Tipo[] ;
  comunidadSelected!: any;
  placeHolderTipo:string = "Categoría";


  @Input() usuario:Usuario | any ;
  @Input() edit: boolean = false;

  public form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private generalService: GeneralService,
    private router: Router,
    private messageService: MessageService,
    private validatorService: ValidatorService,
    ) { }

  

  ngOnInit(): void {
    //Creamos el formulario
    this.form = this.formBuilder.group({
      nombre: ['',[Validators.required, Validators.maxLength(23)]],
      correo: ['',
        [
          Validators.required,
          Validators.pattern(this.validatorService.emailPattern)
        ]
      ],
      telefono: ['',[Validators.required]],
      comunidadAutonoma: ['',[Validators.required]],
      apellidos: ['',[Validators.required,Validators.maxLength(1000)]]
    })

    
     //Inicianlizamos los datos de las comunidades 
    this.generalService.getComunidadesAutonomas().subscribe(
      (resp:any)=>{
        //mapeo la respuesta para cambiar el nombre de los atributos
        var comunidadesChange = resp.data.map((c:any)=>{
          var cChang:any = {};
          cChang['name'] = c.nombre;
          cChang['value'] = c.id;

          return cChang;
        })

        this.comunidadesAtonomas = comunidadesChange;

        //Establecemos el valor del tipo en el select (del producto que vamos a modificar)
        if(this.usuario.tipo != null){

          this.comunidadSelected = this.comunidadesAtonomas.filter((e:any)=>{
            return e['value'] == this.usuario.tipo
          })[0]
        
          this.placeHolderTipo = this.comunidadSelected.name;
          this.usuario.tipo = this.comunidadSelected.value;
        }
      
      }
    )


        console.log(this.usuario)
      
    
  }

  guardar(){

    if(this.form.invalid){
      this.form.markAllAsTouched();
      return
    }

    this.generalService.updateProducto(this.usuario).subscribe();
    
    //Añadimos el toast (Notificación)
    this.messageService.add({severity:'info', summary:'Producto modificado', detail:'El producto fue modificado'});
    
    //Redirigimos a la página d eproductos
    this.authService.getCurrentUser().subscribe(
      (resp:any) =>{
        this.router.navigate([`/ofertas/productos/${resp.data.userName}`])
      }
    )
  }

  campoEsValido(campo: string){
    return this.form.controls[campo]?.errors
            && this.form.controls[campo]?.touched
  }

  changeHover(){
    // console.log(this.producto)
    // console.log(this.tipoSelected)


    if(this.comunidadSelected){
      this.placeHolderTipo = this.comunidadSelected.name;
      this.usuario.comunidadAutonomaId = this.comunidadSelected.value;

      this.usuario.comunidadAutonoma.nombre = this.comunidadSelected.name;
      this.usuario.tipoProducto.id = this.comunidadSelected.value;

    }else{
      this.placeHolderTipo = "Comunidad Autónoma";
    }
    
  }

  get titulo():any{ return this.form.get('titulo')}
  get descripcion():any{ return this.form.get('descripcion')}

}


