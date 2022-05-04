import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-oferta-view',
  templateUrl: './oferta-view.component.html',
  styleUrls: ['./oferta-view.component.scss']
})
export class OfertaViewComponent implements OnInit {

  @Input() oferta!:any ;

  constructor() { }

  ngOnInit(): void {
  }

}
