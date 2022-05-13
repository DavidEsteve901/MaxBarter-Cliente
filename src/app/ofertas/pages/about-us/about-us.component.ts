import { Component, OnInit } from '@angular/core';
import { faCloudUpload} from '@fortawesome/free-solid-svg-icons';
import { faInstagram,faTwitter,faFacebook} from '@fortawesome/free-brands-svg-icons';
import AOS from 'aos';

import { GeneralService } from '../../services/general.service';
import ConfettiGenerator from "confetti-js";


declare var Rellax : any
@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  faCloudUpload = faCloudUpload;
  faInstagram = faInstagram;
  faTwitter = faTwitter;
  faFacebook = faFacebook;

  producto!:any;
  oferta!:any;

  constructor(
    private generalService:GeneralService
  ) { }

  ngOnInit(): void {
    var rellax =  new Rellax('.rellax')

    //Inicializo AOS para animaciones del scroll
    AOS.init();

    //Añadimos animación de confetti
    var confettiSettings = { target: 'confetti'};
    var confetti = new ConfettiGenerator(confettiSettings);
    confetti.render();

    //Buscamos el producto de prueba para mostrar
    this.generalService.getProductosByUser("prueba").subscribe(
      (resp:any)=>{
        this.producto = resp.data[0]
      }
    )

    //Buscamos la oferta de prueba
   

    this.generalService.getOfertasByPage({
      q:{
        user1: "prueba",
        user2: "prueba2",
      }
    }).subscribe(
      (resp:any)=>{
        this.oferta = resp.data.data[0]
      }
    )
  }

}
