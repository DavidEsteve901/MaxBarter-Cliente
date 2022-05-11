import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { GeneralService } from '../../services/general.service';
import { ComunidadAutonoma, Producto, Tipo } from '../../../interfaces/interfaces';
import { faArrowUp,faMagnifyingGlass,faSquareXmark } from '@fortawesome/free-solid-svg-icons';
import { DOCUMENT } from '@angular/common';
import { FormControl } from '@angular/forms';
import { debounceTime, tap } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  //Iconos
  faArrowUp = faArrowUp;
  lupa = faMagnifyingGlass;

  comunidadesAutonomas!:ComunidadAutonoma[] ;
  placeHolderComunidad:string = "Comunidad Autónoma";

  usuarios:any[] = [];
  noUsuarios:boolean = false;


  showButton = false;
  private pageNum = 0;

  //Pixeles para que salga el botón de subir scroll
  private scrollHeight = 300;


  public search: FormControl = new FormControl('');

  filter:any ={
    userName: '',
    comunidadAutonoma: null
  }
  

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private generalService:GeneralService
  ) { }

  ngOnInit(): void {

    this.usuarios = this.usuarios.splice(0,this.usuarios.length);


    //Inicianlizamos los datos de las comunidades 
    this.generalService.getComunidadesAutonomas().subscribe(
      (resp:any)=>{
        //mapeo la respuesta para cambiar el nombre de los atributos
        var comunidadesChange = resp.data.map((c:any)=>{
          var cChang:any = {};
          cChang['name'] = c.nombre;
          cChang['value'] = c.id;

          return cChang;
        })

        this.comunidadesAutonomas = comunidadesChange;
      
      }
    )
    
    


    //Para que tras dejar de escribir en el filtro tarde un tiempo en hacer la petición 
    this.search.valueChanges
        .pipe(
          debounceTime(350) // tiempo que tiene que esperar
        )
        .subscribe(v => {
          this.doFilter()
          // console.log(v);
       });


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

    this.generalService.getUsersByPage({
      page: this.pageNum,
      q: {
        userName: opciones.userName,
        comunidadAutonoma: opciones.comunidadAutonoma
      }
    
    }).subscribe(
      (resp:any)=>{
      
        this.usuarios = this.usuarios.concat(resp.data.data);

        //Quitamos los usuarios de prueba

        this.usuarios.forEach((e:any) => {
          if(e.userName == "prueba" || e.userName == "prueba2" ){
            let index = this.usuarios.indexOf(e);
            this.usuarios.splice(index,1)
          }
        });

        if(this.usuarios.length == 0){
          this.noUsuarios = true;
        }else{
          this.noUsuarios = false;
        }
      },
      (error:any) =>{
        console.log(error)
      }
    )
  }

  doFilter(){
    
    //Reinicio parametros
    this.usuarios.splice(0,this.usuarios.length);

    this.pageNum = 0;

    //Si se selecciona una comunidad autonoma extraemos su id y lo pasamos al filtro
    if(this.filter.comunidadAutonoma && typeof this.filter.comunidadAutonoma === 'object'){
      this.filter.comunidadAutonoma = this.filter.comunidadAutonoma.value
    }

    //Si se selecciona un tipo extraemos su id y lo pasamos al filtro
    if(this.filter.tipo && typeof this.filter.tipo === 'object'){
      this.filter.tipo = this.filter.tipo.value
    }
    
    this.onScrollDown(this.filter)
    
    
  }


  changeHover(){

    if(this.filter.comunidadAutonoma && typeof this.filter.comunidadAutonoma === 'object'){
      this.placeHolderComunidad = this.filter.comunidadAutonoma.name
    }else{
      if(!this.filter.comunidadAutonoma){
        this.placeHolderComunidad = "Comunidad Autónoma";
      }
    }
    
  }


}
