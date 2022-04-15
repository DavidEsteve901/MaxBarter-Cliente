import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';

//PrimeNG
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {PasswordModule} from 'primeng/password';
import {KeyFilterModule} from 'primeng/keyfilter';
import {DividerModule} from 'primeng/divider';
import { AuthService } from '../auth/services/auth.service';
import { ProductoPreViewComponent } from './components/producto-pre-view/producto-pre-view.component';
import { ProductoViewComponent } from './components/producto-view/producto-view.component';
import {AvatarModule} from 'primeng/avatar';
import {DialogModule} from 'primeng/dialog';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {ScrollTopModule} from 'primeng/scrolltop';
import { PerfilViewComponent } from './components/perfil-view/perfil-view.component';
@NgModule({
  declarations: [
    NavBarComponent,
    FooterComponent,
    ProductoPreViewComponent,
    ProductoViewComponent,
    PerfilViewComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule,
    AvatarModule,
    DialogModule,
    ButtonModule,
    ScrollPanelModule,
    ScrollTopModule

  ],
  exports: [
    NavBarComponent,
    FooterComponent,
    ProductoPreViewComponent,
    ProductoViewComponent,
    FontAwesomeModule,
    //PrimeNG
    ButtonModule,
    InputTextModule,
    PasswordModule,
    KeyFilterModule,
    DividerModule,
    AvatarModule,
    DialogModule,
    ScrollPanelModule,
    ScrollTopModule

    
  ],
  providers: [
    AuthService
  ]

})
export class SharedModule { }
