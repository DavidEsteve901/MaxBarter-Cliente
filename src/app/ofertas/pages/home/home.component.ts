import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { GeneralService } from '../../services/general.service';
import { Producto } from '../../../interfaces/interfaces';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  

  //Iconos
  faArrowUp = faArrowUp;


  productos:Producto[] = [];

  showButton = false;
  private pageNum = 0;

  //Pixeles para que salga el botón de subir scroll
  private scrollHeight = 500;

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

    this.onScrollDown();
    
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

  onScrollDown(){
    // console.log("Down");
    this.pageNum++;

    this.generalService.getProductsByPage(this.pageNum).subscribe(
      (resp:any)=>{
      
        this.productos = this.productos.concat(resp.data.data);

      }
    )
  }
}
