import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { GeneralService } from '../../services/general.service';
import { faArrowUp, faSquareXmark} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-ofertas-enviadas',
  templateUrl: './ofertas-enviadas.component.html',
  styleUrls: ['./ofertas-enviadas.component.scss']
})
export class OfertasEnviadasComponent implements OnInit {

  //Iconos
  faArrowUp = faArrowUp;
  faSquareXmark = faSquareXmark;

  ofertas:any[] = [];
  noOfertas:boolean = false;

  private pageNum = 0;
  showButton = false;

  //Pixeles para que salga el botón de subir scroll
  private scrollHeight = 300;


  filter:any ={
    user: '',
  }

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private generalService:GeneralService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.ofertas = this.ofertas.splice(0,this.ofertas.length);

    //Nos suscribimos al servicio que notificará si se hacen cambios 
    this.generalService.getUpdateOfertas$().subscribe(
      (resp:any)=>{
        this.doFilter();
      }
    )

    //Obtenemos el usuario logueado
    this.authService.getCurrentUser().subscribe(
      (resp:any)=>{
        this.filter.user = resp.data.userName;

        this.onScrollDown(this.filter);

      })
  }

  @HostListener('window:scroll')
  onWindowScroll():void{
    const yOffSet = window.pageYOffset;
    const scrollTop = this.document.documentElement.scrollTop;

    this.showButton = (yOffSet || scrollTop) > this.scrollHeight;
  }

  onScrollTop():void{
    this.document.documentElement.scrollTop = 0;
  }

  onScrollDown(opciones:any){
    // console.log("Down");
    this.pageNum++;

    this.generalService.getOfertasByPage({
      page: this.pageNum,
      q: {
        userPide: opciones.user,
        activa: true,
        rechazada: false
      }
    
    }).subscribe(
      (resp:any)=>{
        this.ofertas = this.ofertas.concat(resp.data.data);
        
        if(this.ofertas.length == 0){
          this.noOfertas = true;
        }else{
          this.noOfertas = false;
        }
      },
      (error:any) =>{
        // console.log(error)
      }
    )
  }

  doFilter(){
    
    //Reinicio parametros
    this.ofertas.splice(0,this.ofertas.length);

    this.pageNum = 0;

    this.onScrollDown(this.filter)
    
    
  }

}
