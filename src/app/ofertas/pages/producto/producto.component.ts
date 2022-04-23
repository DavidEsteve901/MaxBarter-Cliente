import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../../services/general.service';
import { ActivatedRoute } from '@angular/router';
import { Producto } from '../../../interfaces/interfaces';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {

  producto !:Producto;

  constructor(
    private generalService:GeneralService,
    private rutaActiva: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.rutaActiva.params.subscribe(
      (resp:any)=>{
        
        if(resp.id){ // Si el id no es null que me busque el producto
          this.generalService.getProductById(resp.id).subscribe(
            (resp:any)=>{
              console.log(resp.data)
              this.producto = resp.data
            }
          )
        }

      }
    )
    
  }

}
