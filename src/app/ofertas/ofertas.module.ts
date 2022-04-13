import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfertasRoutingModule } from './ofertas-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { OfertasComponent } from './pages/ofertas/ofertas.component';


@NgModule({
  declarations: [
    HomeComponent,
    OfertasComponent
  ],
  imports: [
    CommonModule,
    OfertasRoutingModule
  ]
})
export class OfertasModule { }
