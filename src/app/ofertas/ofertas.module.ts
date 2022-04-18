import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfertasRoutingModule } from './ofertas-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { OfertasComponent } from './pages/ofertas/ofertas.component';
import { SharedModule } from '../shared/shared.module';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { AuthService } from '../auth/services/auth.service';
import { GeneralService } from './services/general.service';

@NgModule({
  declarations: [
    HomeComponent,
    OfertasComponent,
    PerfilComponent
  ],
  imports: [
    CommonModule,
    OfertasRoutingModule,
    SharedModule
  ],
  providers: [
    AuthService,
    GeneralService
  ]
})
export class OfertasModule { }
