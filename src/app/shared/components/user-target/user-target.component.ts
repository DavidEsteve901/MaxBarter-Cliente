import { Component, Input, OnInit } from '@angular/core';
import { Producto } from 'src/app/interfaces/interfaces';
import { GeneralService } from 'src/app/ofertas/services/general.service';

@Component({
  selector: 'app-user-target',
  templateUrl: './user-target.component.html',
  styleUrls: ['./user-target.component.scss']
})
export class UserTargetComponent implements OnInit {

  @Input() usuario!:any ;
  @Input() imgPerfil!:any;

  displayResponsive: boolean = false;

  constructor(
    private generalService:GeneralService
  ) { }

  ngOnInit(): void {
    if(!this.imgPerfil){
      //Buscamos foto perfil
    this.generalService.getImagenPerfil(this.usuario).subscribe(
        (resp:any)=>{

          this.generalService.blobToBase64(resp).then(base64 => {
            this.imgPerfil = base64;
          });
          
        },
        (error:any)=>{
          // console.log(error)
        },
      )
    }
  }

  showMaximizableDialog() {
    this.displayResponsive = true;
  }
}
