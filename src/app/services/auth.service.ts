import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioModels } from '../models/usuario.models';
import {map} from 'rxjs/operators'
import Swal from 'sweetalert2';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url ='https://identitytoolkit.googleapis.com/v1';
  private apiKey = 'AIzaSyDXrQ-S3eqZQdpO-EQDWO0WC7rKZIQYBeg';
  usertoken :string;

  //Crear usuario 
//https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]
///
//Iniciar sesion 
//https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  constructor(private http :HttpClient,private router: Router) {
    this.leertoken();
   }
  logout(){
    localStorage.removeItem('token');
  }
  login(usuario:UsuarioModels){
    const authdata = {

      ...usuario,
      returnSecureToken:true
    }
    return this.http.post(
      `${this.url}/accounts:signInWithPassword?key=${this.apiKey}`,authdata
      ).pipe(map(resp =>{
        this.guardartoken(resp['idToken']);
        return resp;
      }));
  }
  
  nuevousuario(usuario:UsuarioModels){
    const authdata = {

      ...usuario,
      returnSecureToken:true
    }
    return this.http.post(
      `${this.url}/accounts:signUp?key=${this.apiKey}`,authdata
    ).pipe(map(resp =>{
      this.guardartoken(resp['idToken'])
      return resp;
    }));
  }
  private guardartoken(idtoken : string){
    this.usertoken = idtoken;
    localStorage.setItem('token',idtoken);

    let hoy = new Date();
    hoy.setSeconds( 3600 );
    localStorage.setItem('expira',hoy.getTime().toString());

  }
  private leertoken(){
    if (localStorage.getItem('token')){
      this.usertoken = localStorage.getItem('token');
    }else{
      this.usertoken = '';
    }
    return this.usertoken;
  }
  estaAutenticado():Boolean{
    if(this.usertoken.length<2){
    return false
  }
  const expira = Number(localStorage.getItem('expira'));
    const expiraDate = new Date();
    expiraDate.setTime(expira);
    if (expiraDate > new Date()){
      return true;
    }else{
      return false;
    }
  }
}
