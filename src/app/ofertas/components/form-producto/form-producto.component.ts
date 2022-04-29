import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';
import { Producto, Tipo } from 'src/app/interfaces/interfaces';
import { Subject } from 'rxjs';
import { GeneralService } from '../../services/general.service';
import { MessageService } from 'primeng/api';

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

  uploadedFiles: any[] = [];

  @Input() producto:Producto | any ;
  @Input() edit: boolean = false;

  @Output() updateImages = new EventEmitter<any[]>();


  public form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private generalService: GeneralService,
    private router: Router,
    private messageService: MessageService
    ) { }

  

  ngOnInit(): void {
    //Creamos el formulario
    this.form = this.formBuilder.group({
      titulo: ['',[Validators.required, Validators.maxLength(23)]],
      tipo: ['',[Validators.required]],
      descripcion: ['',[Validators.required,Validators.maxLength(1000)]]
    })

    
     //Inicializamos los datos de los tipos
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

        //Establecemos el valor del tipo en el select (del producto que vamos a modificar)
        if(this.producto.tipo != null){

          this.tipoSelected = this.tipos.filter((e:any)=>{
            return e['value'] == this.producto.tipo
          })[0]
        
          this.placeHolderTipo = this.tipoSelected.name;
          this.producto.tipo = this.tipoSelected.value;
        }
        

      }
    )
    
  }

  guardar(){

    if(this.form.invalid){
      this.form.markAllAsTouched();
      return
    }

    this.generalService.updateProducto(this.producto).subscribe();
    
    //Añadimos el toast (Notificación)
    this.messageService.add({severity:'info', summary:'Producto modificado', detail:'El producto fue modificado'});
    
    //Redirigimos a la página d eproductos
    this.authService.getCurrentUser().subscribe(
      (resp:any) =>{
        this.router.navigate([`/ofertas/productos/${resp.data.userName}`])
      }
    )
  }

  //Métodos Files
  onUpload(event: any) {
    for(let file of event.files) {
        this.uploadedFiles.push(file);
    }

    this.messageService.add({severity: 'info', summary: 'Imagen subida', detail: ''});

    this.updateImages.emit(this.uploadedFiles)

  }

  removeFile(event: any){
    
    //Eliminamos file del array
    this.uploadedFiles.splice(this.uploadedFiles.indexOf(event.file),1)

    this.messageService.add({severity: 'warn', summary: 'Imagen eliminada', detail: ''});

    this.updateImages.emit(this.uploadedFiles)

  }

  onClear(){
    this.uploadedFiles = [];

    this.updateImages.emit(this.uploadedFiles)
  }


  //Métodos forms
  campoEsValido(campo: string){
    return this.form.controls[campo]?.errors
            && this.form.controls[campo]?.touched
  }

  changeHover(){
    console.log(this.producto)
    console.log(this.tipoSelected)


    if(this.tipoSelected){
      this.placeHolderTipo = this.tipoSelected.name;
      this.producto.tipo = this.tipoSelected.value;

      this.producto.tipoProducto.nombre = this.tipoSelected.name;
      this.producto.tipoProducto.id = this.tipoSelected.value;

    }else{
      this.placeHolderTipo = "Categoría";
    }
    
  }

  //Getters
  get titulo():any{ return this.form.get('titulo')}
  get descripcion():any{ return this.form.get('descripcion')}
}



