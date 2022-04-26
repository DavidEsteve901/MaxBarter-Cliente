import { Component, OnInit, Input } from '@angular/core';
import { Producto } from '../../../interfaces/interfaces';
import { CurrentUserService } from '../../services/current-user.service';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/ofertas/services/general.service';

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

  constructor(
    private currentUser: CurrentUserService,
    private authService: AuthService,
    private router: Router,
    private generalService: GeneralService

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

    
    
  }

  showMaximizableDialog() {
    this.displayResponsive = true;
  }

  modifyProduct(){
    this.router.navigate([`ofertas/productos/producto/${this.producto.id}`]);
  }


}
