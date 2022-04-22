import { Component, OnInit, Input } from '@angular/core';
import { Producto } from '../../../interfaces/interfaces';
import { CurrentUserService } from '../../services/current-user.service';

@Component({
  selector: 'app-producto-view',
  templateUrl: './producto-view.component.html',
  styleUrls: ['./producto-view.component.scss']
})
export class ProductoViewComponent implements OnInit {

  @Input() producto!:Producto ;
  @Input() imgPerfil!:any;

  isCurrentUser:boolean = false;

  constructor(
    private currentUser: CurrentUserService
  ) { }

  displayResponsive: boolean = false;

  ngOnInit(): void {
    this.currentUser.getCurrentUser$().subscribe(
      (resp:any)=>{
        if(resp.userName === this.producto.propietario.userName){
          this.isCurrentUser = true
        }
      }
    )
  }

  showMaximizableDialog() {
    this.displayResponsive = true;
  }

}
