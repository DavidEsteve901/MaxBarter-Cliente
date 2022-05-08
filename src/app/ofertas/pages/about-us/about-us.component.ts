import { Component, OnInit } from '@angular/core';
import { faCloudUpload} from '@fortawesome/free-solid-svg-icons';
import { faInstagram,faTwitter,faFacebook} from '@fortawesome/free-brands-svg-icons';

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
  constructor(
    private generalService:GeneralService
  ) { }

  ngOnInit(): void {
    var rellax =  new Rellax('.rellax')

    //Añadimos animación de confeti
  
    var confettiSettings = { target: 'confetti'};
    var confetti = new ConfettiGenerator(confettiSettings);
    confetti.render();

    //Buscamos el producto de prueba para mostrar
    this.generalService.getProductosByUser("prueba").subscribe(
      (resp:any)=>{
        console.log(resp)
        this.producto = resp.data[0]
      }
    )
  }

}
