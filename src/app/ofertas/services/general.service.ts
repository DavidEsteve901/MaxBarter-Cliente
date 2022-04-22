import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http'

@Injectable()
export class GeneralService {

  private URL = environment.baseUrl;

  

  constructor(
    private http: HttpClient,
  ) { }



  getProductos()  {
    return this.http.get(this.URL + 'productos/' );
  }

  getUserById(userName:string){
    return this.http.get(this.URL + `user/${userName}` );
  }

  getProductsByPage(opciones: any){
    return this.http.post(this.URL + `productos/page`, opciones )
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
