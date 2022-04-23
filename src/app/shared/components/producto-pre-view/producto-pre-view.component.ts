import { Component, Input, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/ofertas/services/general.service';
import { Producto } from '../../../interfaces/interfaces';
import { CurrentUserService } from '../../services/current-user.service';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-producto-pre-view',
  templateUrl: './producto-pre-view.component.html',
  styleUrls: ['./producto-pre-view.component.scss']
})
export class ProductoPreViewComponent implements OnInit {

  @Input() producto!:Producto ;

  usuario!:any;

  imgPerfil!:any;

  isCurrentUser!:boolean;

  constructor(
    private generalService:GeneralService,
    private currentUser: CurrentUserService,


  ) { }

  displayResponsive: boolean = false;

  ngOnInit(): void {
      
    //guardamos el usuario en otra variable
    this.usuario = this.producto.propietario

    //Buscamos foto perfil
    this.generalService.getImagenPerfil(this.usuario).subscribe(
      (resp:any)=>{

        this.generalService.blobToBase64(resp).then(base64 => {
          this.imgPerfil = base64;
        });
        
      },
      (error:any)=>{
        console.log(error)
      },
    )

    
  }

  showMaximizableDialog() {
    this.displayResponsive = true;
  }
}
