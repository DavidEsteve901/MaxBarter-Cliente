import { Component, OnInit, Input } from '@angular/core';
import { Usuario } from '../../../interfaces/interfaces';


@Component({
  selector: 'app-perfil-view',
  templateUrl: './perfil-view.component.html',
  styleUrls: ['./perfil-view.component.scss']
})
export class PerfilViewComponent implements OnInit {

  @Input() usuario!:Usuario;
  
  constructor(

  ) { }

  ngOnInit(): void {
  }

}
