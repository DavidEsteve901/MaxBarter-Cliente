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

@NgModule({
  declarations: [
    NavBarComponent,
    FooterComponent,
    ProductoPreViewComponent,
    ProductoViewComponent,
    
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule,
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
    DividerModule
    
  ],
  providers: [
    AuthService
  ]

})
export class SharedModule { }
