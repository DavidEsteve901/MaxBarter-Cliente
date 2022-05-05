import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-match-view',
  templateUrl: './match-view.component.html',
  styleUrls: ['./match-view.component.scss']
})
export class MatchViewComponent implements OnInit {

  @Input() match!:any ;

  constructor() { }

  ngOnInit(): void {
  }

  
}
