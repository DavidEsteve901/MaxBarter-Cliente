import { Component, Input, OnInit } from '@angular/core';
import { Producto } from '../../../interfaces/interfaces';

@Component({
  selector: 'app-producto-pre-view',
  templateUrl: './producto-pre-view.component.html',
  styleUrls: ['./producto-pre-view.component.scss']
})
export class ProductoPreViewComponent implements OnInit {

  @Input() producto!:Producto ;

  constructor() { }

  displayResponsive: boolean = false;

  ngOnInit(): void {
  }

  showMaximizableDialog() {
    this.displayResponsive = true;
  }
}
