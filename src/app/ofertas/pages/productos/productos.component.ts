import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Producto, Tipo } from 'src/app/interfaces/interfaces';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';
import { GeneralService } from '../../services/general.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {

  //Iconos
  faArrowUp = faArrowUp;
  
  showButton = false;
  private pageNum = 0;
  noProductos = false;

  isCurrentUser!:boolean;

  //Filtro
  tipos!:Tipo[] ;
  placeHolderTipo:string = "Categoría";


  filter:any ={
    userName: null,
    tipo: null
  }

  //Pixeles para que salga el botón de subir scroll
  private scrollHeight = 300;
  productos:Producto[] = [];



  usuario!:any;
  imgPerfil!:any;

  constructor(
    private generalService:GeneralService,
    private rutaActiva: ActivatedRoute,
    private currentUser: CurrentUserService,
    private authService: AuthService,
    private router: Router,
    @Inject(DOCUMENT) private document: Document,
  ) { }

  ngOnInit(): void {
    //Nos suscribimos al servicio que notificará si se hacen cambios en los productos
    this.generalService.getUpdateProducts$().subscribe(
      (resp:any)=>{
        this.doFilter();
      }
    )

    //Elimino los productos al entrar a la página
    this.productos.splice(0,this.productos.length);

    //Inicianlizamos los datos de los tipos
    this.generalService.getTipos().subscribe(
      (resp:any)=>{
        //mapeo la respuesta para cambiar el nombre de los atributos
        var tipoChange = resp.data.map((t:any)=>{
          var tChang:any = {};
          tChang['name'] = t.nombre;
          tChang['value'] = t.id;

          return tChang;
        })

        this.tipos = tipoChange;
      }
    )

    //Obsevable que detecta la ruta
    this.rutaActiva.params.subscribe(
      (params: any)=>{

        //Método para obtener datos del usuario
        this.generalService.getUserById(params.userName).subscribe(
          (resp:any) =>{
            this.usuario = resp.data;
            
            this.filter.userName = this.usuario.userName;
            
            this.onScrollDown({userName: this.usuario.userName});

    
            

            //Actualizamos Usuario Logueado
            this.authService.setCurrentUser();

            //Método para saber si es el perfil del usuario logueado
            this.currentUser.getCurrentUser$().subscribe(
              (resp:any)=>{
                if(resp.userName === this.usuario.userName){
                  this.isCurrentUser = true;
                }
              }
            )

          
            //Buscamos foto perfil
            this.generalService.getImagenPerfil(this.usuario).subscribe(
              (resp:any)=>{
                
                this.generalService.blobToBase64(resp).then(base64 => {
                  this.imgPerfil = base64;
                });

              },
              (error:any)=>{
                console.log(error)
              },
            )

          }
        )
      }
    )

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

  onScrollDown(options:any){
    
    this.pageNum++;
    // console.log("opciones",options)

    if(options.userName){
      this.generalService.getProductsByPage({
        page: this.pageNum,
        q: {
          userName: options.userName,
          tipo: options.tipo,
          match: false
        }
      
      }).subscribe(
        (resp:any)=>{
          this.productos = this.productos.concat(resp.data.data);

          if(this.productos.length == 0){
            this.noProductos = true;
          }else{
            this.noProductos = false;
          }
        },
        (error:any) =>{
          console.log(error)
        }
      )
    }else{
      this.pageNum--;
    }
    
  }

  doFilter(){
    
    //Reinicio parametros
    this.productos.splice(0,this.productos.length);

    this.pageNum = 0;

    //Si se selecciona un tipo extraemos su id y lo pasamos al filtro
    if(this.filter.tipo){
      this.filter.tipo = this.filter.tipo.value
    }

    this.onScrollDown(this.filter)
    
    
  }

  changeHover(){
    if(this.filter.tipo){
      this.placeHolderTipo = this.filter.tipo.name
    }else{
      this.placeHolderTipo = "Categoría";
    }
    
  }

  redirectProducto(){
    this.router.navigate([`ofertas/productos/producto/${null}`]);
  } 
}
