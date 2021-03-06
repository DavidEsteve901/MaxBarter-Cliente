import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { OfertasComponent } from './pages/ofertas/ofertas.component';
import { AuthGuard } from '../auth/guards/auth.guard';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { OfertaComponent } from './pages/oferta/oferta.component';
import { OfertasRecibidasComponent } from './components/ofertas-recibidas/ofertas-recibidas.component';
import { OfertasEnviadasComponent } from './components/ofertas-enviadas/ofertas-enviadas.component';
import { MatchsComponent } from './pages/matchs/matchs.component';
import { StatsComponent } from './pages/stats/stats.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { UsersComponent } from './pages/users/users.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'home',canActivate: [AuthGuard], component: HomeComponent },
      { path: 'ofertas', component: OfertasComponent, 
        canActivate: [AuthGuard],
        children:[
          { path: 'recibidas', component: OfertasRecibidasComponent },
          { path: 'enviadas', component: OfertasEnviadasComponent },
          { path: '**', redirectTo: 'recibidas' },
        ]
      },
      { path: 'perfil/:userName', canActivate: [AuthGuard], component: PerfilComponent},
      { path: 'productos/:userName',canActivate: [AuthGuard], component: ProductosComponent},
      { path: 'productos/producto/:id',canActivate: [AuthGuard], component: ProductoComponent},
      { path: 'oferta/:idUser/:idProducto',canActivate: [AuthGuard], component: OfertaComponent},
      { path: 'matchs',canActivate: [AuthGuard], component: MatchsComponent},
      { path: 'stats/:userName',canActivate: [AuthGuard], component: StatsComponent},
      { path: 'home/users',canActivate: [AuthGuard], component: UsersComponent },
      { path: 'aboutUs', component: AboutUsComponent},
      { path: '**', redirectTo: 'home' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfertasRoutingModule { }
