import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  public emailPattern: string = "^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$";
  
  public numeroTelefono: string = "(\+34|0034|34)?[ -]*(6|7)[ -]*([0-9][ -]*){8}";
  
  constructor() { }

  //Metodos
  camposIguales( campo1: string, campo2: string){
    return (formGroup: AbstractControl) : ValidationErrors|null =>{
      
      const pass1 = formGroup.get(campo1)?.value;
      const pass2 = formGroup.get(campo2)?.value;

      if(pass1 !== pass2){
        formGroup.get(campo2)?.setErrors({noIguales: true});
        return { noIguales: true }
      }

      // formGroup.get(campo2)?.setErrors(null);

      return null;
    }
  }
}
