import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';

import { AuthGuard } from './guards/auth.guard';
const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'registro', component: RegistroComponent },
      { path: '**', redirectTo: 'login' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
