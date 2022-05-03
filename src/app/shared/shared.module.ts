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
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SpinnerService } from './services/spinner.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FormsModule } from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import { UserTargetComponent } from './components/user-target/user-target.component';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {ToastModule} from 'primeng/toast';
import {GMapModule} from 'primeng/gmap';
import {GalleriaModule} from 'primeng/galleria';

import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {FileUploadModule} from 'primeng/fileupload';
import { GalleryComponent } from './components/gallery/gallery.component';
import {ImageModule} from 'primeng/image';

@NgModule({
  declarations: [
    NavBarComponent,
    FooterComponent,
    ProductoPreViewComponent,
    ProductoViewComponent,
    PerfilViewComponent,
    SpinnerComponent,
    UserTargetComponent,
    GalleryComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule,
    AvatarModule,
    DialogModule,
    ButtonModule,
    ScrollPanelModule,
    ScrollTopModule,
    ConfirmDialogModule,
    GalleriaModule,
    ImageModule

  ],
  exports: [
    NavBarComponent,
    FooterComponent,
    ProductoPreViewComponent,
    ProductoViewComponent,
    PerfilViewComponent,
    UserTargetComponent,
    FontAwesomeModule,
    SpinnerComponent,
    FormsModule,
    
    //PrimeNG
    ButtonModule,
    InputTextModule,
    PasswordModule,
    KeyFilterModule,
    DividerModule,
    AvatarModule,
    DialogModule,
    ScrollPanelModule,
    ScrollTopModule,
    DropdownModule,
    InputTextareaModule,
    ToastModule,
    ConfirmDialogModule,
    GalleriaModule,
    FileUploadModule,
    
    
    //Infinite scroll
    InfiniteScrollModule,

    //Mapa 
    GMapModule

  ],
  providers: [
    AuthService,
    SpinnerService
  ]

})
export class SharedModule { }
