import { Component, Input, OnInit } from '@angular/core';
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
  }

  re_animate() {
    $('#img').toggleClass('animate__animated animate__swing  ');
  }
 
}
