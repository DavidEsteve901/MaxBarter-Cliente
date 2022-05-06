import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GeneralService } from '../../services/general.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

  statsUser!:any;
  user!:any;

  constructor(
    private rutaActiva: ActivatedRoute,
    private generalService: GeneralService
  ) { }

  ngOnInit(): void {

    //Obsevable que detecta la ruta
    this.rutaActiva.params.subscribe(
      (params: any)=>{
        this.user = params.userName;
        this.generalService.getUserStats(params.userName).subscribe(
          (resp:any)=>{
            
            this.statsUser = resp.data;
            console.log(this.statsUser)
          }
        )
      }
    )
  }

}
