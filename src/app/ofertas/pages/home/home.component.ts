import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { GeneralService } from '../../services/general.service';
import { Producto } from '../../../interfaces/interfaces';
import { faArrowUp,faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  

  //Iconos
  faArrowUp = faArrowUp;
  lupa = faMagnifyingGlass

  productos:Producto[] = [];

  showButton = false;
  private pageNum = 0;

  //Pixeles para que salga el botón de subir scroll
  private scrollHeight = 300;


  filter:any ={
    titulo: '',
    tipo: '',
    comunidadAutonoma: '',
  }
  

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private generalService:GeneralService
  ) { }

  ngOnInit(): void {
    // this.generalService.getProductos().subscribe(
    //   (resp:any)=>{
    //     this.productos = resp.data;
    //     console.log(resp)
    //   },
    //   (error:any)=>{
    //     console.log(error)
    //   },
    // )



    this.onScrollDown(this.filter);
    
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

    this.generalService.getProductsByPage({
      page: this.pageNum,
      q: {
        titulo: opciones.titulo,
        tipo: opciones.tipo,
        comunidadAutonoma: opciones.comunidadAutonoma
      }
    
    }).subscribe(
      (resp:any)=>{
      
        this.productos = this.productos.concat(resp.data.data);

      },
      (error:any) =>{
        console.log(error)
      }
    )
  }

  doFilter(){
    console.log('input');

    //Reinicio parametros
    this.productos = [];

    this.pageNum = 0;

    this.onScrollDown(this.filter)
  }
}
