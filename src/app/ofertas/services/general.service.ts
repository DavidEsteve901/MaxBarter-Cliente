import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http'
import { Observable, Subject } from 'rxjs';
import { Statement } from '@angular/compiler';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable()
export class GeneralService {

  private URL = environment.baseUrl;

  

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) { }

  private updateProducts$ = new Subject<any>();
  

  setUpdateProducts(state: any):void{
    // console.log("SET",currentUser)
    this.updateProducts$.next(state)
  }

  getUpdateProducts$(): Observable<any>{
    return this.updateProducts$.asObservable();
  }

  private updateCoords$ = new Subject<any>();
  

  setUpdateCoords(state: any):void{
    this.updateCoords$.next(state)
  }

  getUpdateCoords$(): Observable<any>{
    return this.updateCoords$.asObservable();
  }


  //Actualizar img producto
  private updateImageProducto$ = new Subject<any>();
  

  setUpdateImageProducto(state: any[]):void{
    this.updateImageProducto$.next(state)
  }

  getUpdateImageProducto$(): Observable<any>{
    return this.updateImageProducto$.asObservable();
  }

  //Actualiza producto de galeria con el pasado por @input
  private updateImageProductoIndividual$ = new Subject<any>();
  

  setUpdateImageProductoIndividual(state: any):void{
    this.updateImageProductoIndividual$.next(state)
  }

  getUpdateImageProductoIndividual$(): Observable<any>{
    return this.updateImageProductoIndividual$.asObservable();
  }

  //Paso las imagenes de tipo file del producto al input 
  private updateImgFileProd$ = new Subject<any>();
  

  setUpdateImgFileProd(state: any):void{
    this.updateImgFileProd$.next(state)
  }

  getUpdateImgFileProd$(): Observable<any>{
    return this.updateImgFileProd$.asObservable();
  }

  //Notificar cambios en ofertas
  private updateOfertas$ = new Subject<any>();
  

  setUpdateOfertas(state: any):void{
    this.updateOfertas$.next(state)
  }

  getUpdateOfertas$(): Observable<any>{
    return this.updateOfertas$.asObservable();
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
  getProductosByUser(userName:any){
    return this.http.get(this.URL + `productos/user/${userName}`)
  }

  createProduct(producto:any){
    return this.http.post(this.URL + `productos/`,producto)
  }

  updateProducto(producto:any){
    return this.http.put(this.URL + `productos/${producto.id}`,producto)
  }

  deleteProducto(id:any){
    return this.http.delete(this.URL + `productos/${id}`)
  }

  getImagenesProducto(producto:any){
    return this.http.post(this.URL + `productos/imagenes`,producto,)
  }

  getImagenProducto(url:any){
    return this.http.post(this.URL + `productos/imagen`,{url},{ responseType: 'blob' as 'json' })
  }

  uploadImagenesProducto(id:any,imagenes:any){
    return this.http.post(this.URL + `productos/uploadImages/${id}`,imagenes)
  }

  //Usuarios
  updateUsuario(usuario:any){
    return this.http.put(this.URL + `user/updateUser`,usuario)
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

  uploadImagenPerfil(userName:any,imagen:any){
    return this.http.post(this.URL + `user/uploadImage/${userName}`,imagen)
  }

  getUserStats(userName:any){
    return this.http.get(this.URL + `user/stats/${userName}`)
  }

  getUserMatchs(userName:any){
    return this.http.get(this.URL + `user/matchs/${userName}`)
  }

  //Ofertas
  createOferta(oferta:any){
    return this.http.post(this.URL + `ofertas/`,oferta)
  }

  getOfertasByPage(opciones: any){
    return this.http.post(this.URL + `ofertas/page`, opciones )
  }

  deleteOferta(id:any){
    return this.http.delete(this.URL + `ofertas/${id}`)
  }
  
  aceptarOferta(id:any){
    return this.http.post(this.URL + `ofertas/aceptarOferta/${id}`,{})
  }

  rechazarOferta(id:any){
    return this.http.post(this.URL + `ofertas/rechazarOferta/${id}`,{})
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

  //Método extraer base64 de file
  extraerBase64 = async ($event: any) => new Promise((resolve, reject) :any=> {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };

    } catch (e) {
      return null;
    }
  })


  extraerImagenesBase64(imagenes:any) {
  
  
    return Promise.all(
      imagenes.map(
        (image:any) =>
          new Promise((resolve, reject) => {
            const fileReader = new FileReader();
  
            fileReader.onload = (file:any) => {
              resolve(file.target.result);
            };
  
            fileReader.onerror = (error) => reject(error);
  
            fileReader.readAsDataURL(image);
          })
      )
    )
  }

  transformSanitizerUrl(value: any, args?: any): any {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }

  
}
