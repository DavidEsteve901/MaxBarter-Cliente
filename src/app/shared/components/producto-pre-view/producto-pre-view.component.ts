import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-producto-pre-view',
  templateUrl: './producto-pre-view.component.html',
  styleUrls: ['./producto-pre-view.component.scss']
})
export class ProductoPreViewComponent implements OnInit {

  constructor() { }

  displayResponsive: boolean = false;

  ngOnInit(): void {
  }

  showMaximizableDialog() {
    this.displayResponsive = true;
  }
}
