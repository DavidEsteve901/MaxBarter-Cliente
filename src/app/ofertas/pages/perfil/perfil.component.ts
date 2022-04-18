import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../../services/general.service';
import { Usuario } from '../../../interfaces/interfaces';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  usuario!:Usuario;
  constructor(
    private generalService:GeneralService
  ) { }

  ngOnInit(): void {
    this.generalService.getUserById("david").subscribe(
      (resp:any) =>{
        this.usuario = resp.data;
      }
    )
  }

}
