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
  comunidadesAutonomas!:Tipo[] ;
  comunidadSelected!: any;
  placeHolderComunidad:string = "Comunidad Autónoma";


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
      nombre: ['',[Validators.required, Validators.maxLength(10)]],
      apellidos: ['',[Validators.required,Validators.maxLength(20)]],
      correo: ['',
        [
          Validators.required,
          Validators.pattern(this.validatorService.emailPattern)
        ]
      ],
      telefono: ['',[Validators.required,Validators.pattern(this.validatorService.numeroTelefono)]],
      comunidadAutonoma: ['',[Validators.required]],
      
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

        this.comunidadesAutonomas = comunidadesChange;

        //Establecemos el valor del tipo en el select (del producto que vamos a modificar)
        if(this.usuario.comunidadAutonoma != null){

          this.comunidadSelected = this.comunidadesAutonomas.filter((e:any)=>{
            return e['value'] == this.usuario.comunidadAutonomaId
          })[0]
          console.log(this.usuario.comunidadAutonoma)
          this.placeHolderComunidad = this.comunidadSelected.name;
          this.usuario.comunidadAutonomaId = this.comunidadSelected.value;
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

    // this.generalService.updateProducto(this.usuario).subscribe();
    
    // //Añadimos el toast (Notificación)
    // this.messageService.add({severity:'info', summary:'Producto modificado', detail:'El producto fue modificado'});
    
    // //Redirigimos a la página d eproductos
    // this.authService.getCurrentUser().subscribe(
    //   (resp:any) =>{
    //     this.router.navigate([`/ofertas/productos/${resp.data.userName}`])
    //   }
    // )
  }

  campoEsValido(campo: string){
    return this.form.controls[campo]?.errors
            && this.form.controls[campo]?.touched
  }

  changeHover(){
    // console.log(this.producto)
    // console.log(this.tipoSelected)


    if(this.comunidadSelected){
      this.placeHolderComunidad = this.comunidadSelected.name;
      this.usuario.comunidadAutonomaId = this.comunidadSelected.value;

      this.usuario.comunidadAutonoma.nombre = this.comunidadSelected.name;
      this.usuario.comunidadAutonoma.id = this.comunidadSelected.value;

    }else{
      this.placeHolderComunidad = "Comunidad Autónoma";
    }
    
  }


  get nombre():any{ return this.form.get('nombre')}
  get apellidos():any{ return this.form.get('apellidos')}
  get correo():any{ return this.form.get('correo')}
  get telefono():any{ return this.form.get('telefono')}
  get comunidadAutonoma():any{ return this.form.get('comunidadAutonoma')}

}


