import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioModels } from '../models/usuario.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url ='https://identitytoolkit.googleapis.com/v1';
  private apiKey = 'AIzaSyDXrQ-S3eqZQdpO-EQDWO0WC7rKZIQYBeg'

  //Crear usuario 
//https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]
///
//Iniciar sesion 
//https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  constructor(private http :HttpClient) { }
  logout(){

  }
  login(usuario:UsuarioModels){
    const authdata = {

      ...usuario,
      returnSecureToken:true
    }
    return this.http.post(
      `${this.url}/accounts:signInWithPassword?key=${this.apiKey}`,authdata
    )

  }
  nuevousuario(usuario:UsuarioModels){
    const authdata = {

      ...usuario,
      returnSecureToken:true
    }
    return this.http.post(
      `${this.url}/accounts:signUp?key=${this.apiKey}`,authdata
    )
  }
}
