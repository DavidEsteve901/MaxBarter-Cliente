import { Component, Input, OnInit } from '@angular/core';
import { faSquareXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-mensaje-not-found',
  templateUrl: './mensaje-not-found.component.html',
  styleUrls: ['./mensaje-not-found.component.scss']
})
export class MensajeNotFoundComponent implements OnInit {

  //iconos
  faSquareXmark = faSquareXmark;

  @Input() message!:string;

  constructor() { }

  ngOnInit(): void {
  }

}
