import { Component, OnInit, Input } from '@angular/core';
import { Producto } from '../../../interfaces/interfaces';

@Component({
  selector: 'app-producto-view',
  templateUrl: './producto-view.component.html',
  styleUrls: ['./producto-view.component.scss']
})
export class ProductoViewComponent implements OnInit {

  @Input() producto!:Producto ;
  @Input() imgPerfil!:any;
  constructor() { }

  displayResponsive: boolean = false;

  ngOnInit(): void {
    
  }

  showMaximizableDialog() {
    this.displayResponsive = true;
  }

}
