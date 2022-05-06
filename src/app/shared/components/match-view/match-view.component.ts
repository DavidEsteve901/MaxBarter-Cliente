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

  
  constructor() { }

  ngOnInit(): void {
    window.setInterval(this.re_animate, 3000);

    //Añadimos animación de confeti
    var confettiElements = document.getElementsByClassName('confetti');

    for (let i = 0; i < confettiElements.length; i++) {
      var confettiSettings = { target: confettiElements[i] };
      var confetti = new ConfettiGenerator(confettiSettings);
      confetti.render();
    }

    
  }

  re_animate() {
    $('.manos').toggleClass('animate__animated animate__swing  ');
  }
 
}
