import { Component, Input, OnInit } from '@angular/core';
import { Producto } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-user-target',
  templateUrl: './user-target.component.html',
  styleUrls: ['./user-target.component.scss']
})
export class UserTargetComponent implements OnInit {

  @Input() usuario!:any ;
  @Input() imgPerfil!:any;

  displayResponsive: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  showMaximizableDialog() {
    this.displayResponsive = true;
  }
}
