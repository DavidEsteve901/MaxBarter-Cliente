import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, ConfirmEventType, MessageService} from 'primeng/api';
import { GeneralService } from 'src/app/ofertas/services/general.service';

@Component({
  selector: 'app-oferta-view',
  templateUrl: './oferta-view.component.html',
  styleUrls: ['./oferta-view.component.scss']
})
export class OfertaViewComponent implements OnInit {

  @Input() oferta!:any ;

  constructor(
    private router:Router,
    private generalService: GeneralService,
    private confirmService: ConfirmationService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {

  }

  checkRoute(){
    if(this.router.isActive("ofertas/ofertas/recibidas",true)){
      return true;
    }else{
      return false;
    }
  }

  confirm() {
    this.confirmService.confirm({
        message: 'Estás seguro de que quiere eliminar la oferta?',
        header: 'Confirmación',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            
            

            this.generalService.deleteOferta(this.oferta.id).subscribe(
              (resp:any)=>{
                console.log("Oferta eliminado correctamente");

                //Notificamos al observable que ha habido un cambio
                this.generalService.setUpdateOfertas(true);

                this.messageService.add({severity:'success', summary:'Confirmado', detail:'Has eliminado la oferta'});
              },
              (error:any)=>{
                // console.log(error);
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

  aceptar(){
    this.generalService.aceptarOferta(this.oferta.id).subscribe(
      (resp:any)=>{
        this.messageService.add({severity:'success', summary:'Aceptada', detail:'La oferta fue aceptada!!'});
        this.generalService.setUpdateOfertas(true);
      },

      (error:any)=>{
        // console.log(error)
      }
    )
  }

  rechazar(){
    this.generalService.rechazarOferta(this.oferta.id).subscribe(
      (resp:any)=>{
        this.messageService.add({severity:'warn', summary:'Rechazada', detail:'La oferta fue rechazada :('});
        this.generalService.setUpdateOfertas(true);

      },

      (error:any)=>{
        // console.log(error)
      }
    )
  }

}
