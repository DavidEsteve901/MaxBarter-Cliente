import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { OfertasComponent } from './pages/ofertas/ofertas.component';
import { AuthGuard } from '../auth/guards/auth.guard';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { OfertaComponent } from './pages/oferta/oferta.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'ofertas', component: OfertasComponent, canActivate: [AuthGuard]},
      { path: 'perfil/:userName', component: PerfilComponent},
      { path: 'productos/:userName', component: ProductosComponent},
      { path: 'productos/producto/:id', component: ProductoComponent},
      { path: 'oferta/:idUser/:idProducto', component: OfertaComponent},
      { path: '**', redirectTo: 'home' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfertasRoutingModule { }
