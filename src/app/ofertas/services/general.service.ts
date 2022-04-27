import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http'
import { Observable, Subject } from 'rxjs';
import { Statement } from '@angular/compiler';

@Injectable()
export class GeneralService {

  private URL = environment.baseUrl;

  

  constructor(
    private http: HttpClient,
  ) { }

  private updateProducts$ = new Subject<any>();
  

  setUpdateProducts(state: any):void{
    // console.log("SET",currentUser)
    this.updateProducts$.next(state)
  }

  getUpdateProducts$(): Observable<any>{
    return this.updateProducts$.asObservable();
  }


  getUserById(userName:string){
    return this.http.get(this.URL + `user/${userName}` );
  }

  //PRODUCTOS
  getProductos()  {
    return this.http.get(this.URL + 'productos/' );
  }

  getProductsByPage(opciones: any){
    return this.http.post(this.URL + `productos/page`, opciones )
  }

  getProductById(id:number){
    return this.http.get(this.URL + `productos/${id}`)
  }

  updateProducto(producto:any){
    return this.http.put(this.URL + `productos/${producto.id}`,producto)
  }

  deleteProducto(id:any){
    return this.http.delete(this.URL + `productos/${id}`)
  }

  getComunidadesAutonomas(){
    return this.http.get(this.URL + `comunidadAutonoma`)
  }

  getTipos(){
    return this.http.get(this.URL + `tipo`)
  }

  getImagen(url:any){
    return this.http.post<File>(this.URL + `imagen`,url,{ responseType: 'blob' as 'json' })
  }
  
  getImagenPerfil(user:any){
    return this.http.post<File>(this.URL + `user/perfil`,user,{ responseType: 'blob' as 'json' })
  }
  
  //Método para convertir blob a base64
  blobToBase64(blob:any) {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    return new Promise(resolve => {
      reader.onloadend = () => {
        resolve(reader.result);
      };
    });
  };
}
