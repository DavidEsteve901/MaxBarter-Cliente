import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { GeneralService } from '../../services/general.service';
import { Producto } from '../../../interfaces/interfaces';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  productos!:Producto[];

  constructor(
    private generalService:GeneralService
  ) { }

  ngOnInit(): void {
    this.generalService.getProductos().subscribe(
      (resp:any)=>{
        this.productos = resp.data;
        console.log(resp)
      },
      (error:any)=>{
        console.log(error)
      },
    )
  }

  

}
