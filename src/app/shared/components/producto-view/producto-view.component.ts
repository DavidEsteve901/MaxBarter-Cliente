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

    this.images = [
      "https://www.empack.mx/wp-content/uploads/2018/04/RM-01-1-scaled-500x312.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFUKfhPSZVeJUiThwzjz0CJuIiEnWcbAIfHg&usqp=CAU"
    ]

    this.generalService.getUpdateImageProducto$().subscribe(
      (resp:any)=>{
        console.log("imagenes",resp)
        console.log("imagenesAntes",this.images)

        this.images = resp

        // this.imagen = resp [0];
        console.log(this.images)
      }
    )
    
  }

  showMaximizableDialog() {
    this.displayResponsive = true;
  }

  modifyProduct(){
    this.router.navigate([`ofertas/productos/producto/${this.producto.id}`]);
  }

  confirm() {
    this.confirmService.confirm({
        message: 'Estás seguro de que quiere eliminar el producto?',
        header: 'Confirmación',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.messageService.add({severity:'success', summary:'Confirmado', detail:'Has eliminado el producto'});
            

            this.generalService.deleteProducto(this.producto.id).subscribe(
              (resp:any)=>{
                console.log("Producto eliminado correctamente");

                //Notificamos al observable que ha habido un cambio
                this.generalService.setUpdateProducts(true);
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
