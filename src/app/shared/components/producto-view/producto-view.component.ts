import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-producto-view',
  templateUrl: './producto-view.component.html',
  styleUrls: ['./producto-view.component.scss']
})
export class ProductoViewComponent implements OnInit {

  constructor() { }

  displayResponsive: boolean = false;

  ngOnInit(): void {
  }

  showMaximizableDialog() {
    this.displayResponsive = true;
  }

}
