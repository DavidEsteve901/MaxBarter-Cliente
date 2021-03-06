import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfertasRoutingModule } from './ofertas-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { OfertasComponent } from './pages/ofertas/ofertas.component';
import { SharedModule } from '../shared/shared.module';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { AuthService } from '../auth/services/auth.service';
import { GeneralService } from './services/general.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductosComponent } from './pages/productos/productos.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { FormProductoComponent } from './components/form-producto/form-producto.component';
import { MapComponent } from './components/map/map.component';
import { FormPerfilComponent } from './components/form-perfil/form-perfil.component';
import { OfertaComponent } from './pages/oferta/oferta.component';
import { OfertasRecibidasComponent } from './components/ofertas-recibidas/ofertas-recibidas.component';
import { OfertasEnviadasComponent } from './components/ofertas-enviadas/ofertas-enviadas.component';
import { MatchsComponent } from './pages/matchs/matchs.component';
import { StatsComponent } from './pages/stats/stats.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { UsersComponent } from './pages/users/users.component';


@NgModule({
  declarations: [
    HomeComponent,
    OfertasComponent,
    PerfilComponent,
    ProductosComponent,
    ProductoComponent,
    FormProductoComponent,
    MapComponent,
    FormPerfilComponent,
    OfertaComponent,
    OfertasRecibidasComponent,
    OfertasEnviadasComponent,
    MatchsComponent,
    StatsComponent,
    AboutUsComponent,
    UsersComponent,
  ],
  imports: [
    CommonModule,
    OfertasRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    GeneralService
  ]
})
export class OfertasModule { }
