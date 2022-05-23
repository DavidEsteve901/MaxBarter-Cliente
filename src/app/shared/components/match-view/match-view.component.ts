import { Component, Input, OnInit } from '@angular/core';
import ConfettiGenerator from "confetti-js";


declare var $:any;

@Component({
  selector: 'app-match-view',
  templateUrl: './match-view.component.html',
  styleUrls: ['./match-view.component.scss']
})
export class MatchViewComponent implements OnInit {

  @Input() match!:any ;
  @Input() show:boolean = true ;
 


  intervalo!:any;

  constructor() { }

  ngOnInit(): void {
    
  
    this.intervalo = setInterval(this.re_animate, 3000);
    

    //Añadimos animación de confeti
    var confettiElements = document.getElementsByClassName('confetti');

    for (let i = 0; i < confettiElements.length; i++) {
      var confettiSettings = { target: confettiElements[i] };
      var confetti = new ConfettiGenerator(confettiSettings);
      confetti.render();
    }

    
  }

  /*Ciclo de vida de los componentes de Angular */
  //Cada vez que se destrulla el componenteque me elimine el intervalo de la animación
  ngOnDestroy(){
    clearInterval(this.intervalo)
  }

  re_animate() {
    $('.manos').toggleClass('animate__animated animate__swing  ');
  }
 
}
