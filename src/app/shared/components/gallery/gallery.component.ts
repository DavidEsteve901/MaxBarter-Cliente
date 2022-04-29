import { Component, Input, OnInit } from '@angular/core';
import { faArrowLeft,faArrowRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {


  //Iconos
  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;
  @Input() imagenes!:any[];

  imagenesHtml:string = "";
  botonesHtml:string = "";


  constructor() { }

  ngOnInit(): void {
    console.log(this.imagenes)

    this.imagenes.forEach((img,index)=>{
      if(index == 0){
        this.imagenesHtml += `<div class="carousel-item active">
          <img src="${img}"   class="d-block w-100" alt="Producto">
        </div>`
        
        // this.botonesHtml += ` <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${index}" class="active" aria-current="true" aria-label="Slide ${index}"></button>`
      }else{
        this.imagenesHtml += `<div class="carousel-item">
        <img src="${img}"   class="d-block w-100" alt="Producto">
      </div>`

      // this.botonesHtml += ` 
      //   <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${index}" aria-label="Slide ${index}"></button>
      //   `
      }
      
    })

    console.log(this.imagenesHtml)
    console.log(this.botonesHtml)

    
    
  }


}
