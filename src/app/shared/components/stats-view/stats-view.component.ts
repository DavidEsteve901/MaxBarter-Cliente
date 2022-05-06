import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-stats-view',
  templateUrl: './stats-view.component.html',
  styleUrls: ['./stats-view.component.scss']
})
export class StatsViewComponent implements OnInit {

  data: any;
  chartOptions!:any;

  @Input() statsUser!:any ;

  constructor() {}

  ngOnInit() {

    console.log(this.statsUser)
    this.data = {
        datasets: [{
            data: [
                this.statsUser.numProductos,
                this.statsUser.numMatchs,
                this.statsUser.numOfertasPedidas,
                this.statsUser.numOfertasRecibidas,
                this.statsUser.numOfertasRezachadas,
            ],
            backgroundColor: [
                "#42A5F5",
                "#66BB6A",
                "#FFA726",
                "#26C6DA",
                "#7E57C2"
            ],
            label: 'User stats'
        }],
        labels: [
            "Productos",
            "Matchs",
            "Ofertas Pedidas",
            "Ofertas Recibidas",
            "Ofertas Rechazadas"
        ]
    };


    this.chartOptions = {
      plugins: {
          legend: {
              labels: {
                  color: '#495057'
              }
          }
      },
      scales: {
          r: {
              grid: {
                  color: '#ebedef'
              }
          }
      }
    }
  }

 
  
}
