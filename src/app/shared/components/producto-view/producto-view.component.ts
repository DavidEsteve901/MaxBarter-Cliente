import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Producto } from '../../../interfaces/interfaces';
import { CurrentUserService } from '../../services/current-user.service';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/ofertas/services/general.service';
import { ConfirmationService, ConfirmEventType, MessageService} from 'primeng/api';

@Component({
  selector: 'app-producto-view',
  templateUrl: './producto-view.component.html',
  styleUrls: ['./producto-view.component.scss']
})
export class ProductoViewComponent implements OnInit {

  @Input() producto!:Producto | any ;
  @Input() imgPerfil!:any;
  @Input() showButtons:boolean = true;

  @Input() isCurrentUser!:boolean;

  @Input() images :any[] = [];

  imagesFile :any[] = [];

  @Output() getImages = new EventEmitter<any[]>();


  constructor(
    private currentUser: CurrentUserService,
    private authService: AuthService,
    private router: Router,
    private generalService: GeneralService,
    private confirmService: ConfirmationService,
    private messageService: MessageService,

  ) { }

  displayResponsive: boolean = false;

  ngOnInit(): void {
    //Miramos si  el usuario es el logueado
    this.authService.getCurrentUser().subscribe(
      (resp:any)=>{
        if(resp.data.userName === this.producto?.propietario.userName){

          this.isCurrentUser = true

        }
      }
    )

    if(this.images.length == 0 ){

        //Buscamos las imagenes de los productos
        this.generalService.getImagenesProducto(this.producto).subscribe(
          (resp:any)=>{
          // console.log("imagenes",resp)

          if(resp.length > 0){

            //Inicializamos el array de imagenes que pasamos al componente de Galeria (Carusel)
            this.images = [];

            resp.forEach((url:any) => {
                this.generalService.getImagenProducto(url).subscribe(
                  (resp:any)=>{
                    //Añadimos atributo url para luego transformar el blob en file
                    resp.url = url;
                    this.imagesFile.push(resp);
                    this.generalService.setUpdateImgFileProd(this.imagesFile)
                    
                    //Convertimos las imagenes a base64
                    this.generalService.blobToBase64(resp).then(base64 => {
                      this.images.push(base64)
                      // console.log(`IMAGENES producto ${this.producto.id}` ,this.images)
                      //Actualizo las imagenes de la galeria
                      this.generalService.setUpdateImageProductoIndividual(this.images)
                    });
                  }
                )
            });

      
          }
          
          
        },
        (error:any)=>{
          console.log(error)
        }
      )
    }

  

    // console.log(this.producto)
  
  }

  showMaximizableDialog() {
    this.displayResponsive = true;
  }

  modifyProduct(){
    this.router.navigate([`ofertas/productos/producto/${this.producto.id}`]);
  }

  doOferta(){
    this.router.navigate([`ofertas/oferta/${this.producto.propietario.userName}/${this.producto.id}`]);
  }

  confirm() {
    this.confirmService.confirm({
        message: 'Estás seguro de que quiere eliminar el producto?',
        header: 'Confirmación',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            
            

            this.generalService.deleteProducto(this.producto.id).subscribe(
              (resp:any)=>{
                console.log("Producto eliminado correctamente");

                //Notificamos al observable que ha habido un cambio
                this.generalService.setUpdateProducts(true);

                this.messageService.add({severity:'success', summary:'Confirmado', detail:'Has eliminado el producto'});
              },
              (error:any)=>{
                console.log(error);
              }
            )
        },
        reject: (type:any) => {
            switch(type) {
                case ConfirmEventType.REJECT:
                    this.messageService.add({severity:'error', summary:'Rechazado', detail:'Has rechazado la petición'});
                break;
                case ConfirmEventType.CANCEL:
                    this.messageService.add({severity:'warn', summary:'Cancelado', detail:'Has cancelado la petición'});
                break;
            }
        }
    });
}


}
