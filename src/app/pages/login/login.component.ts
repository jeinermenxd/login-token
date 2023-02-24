import { Component,OnInit, TRANSLATIONS } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import { UsuarioModels } from '../../models/usuario.models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario:UsuarioModels = new UsuarioModels();
  recordarme = false;

constructor(private auth:AuthService,private router : Router){
  this.usuario = new UsuarioModels();
}
  
  ngOnInit(): void {
    if(localStorage.getItem('email')){
      this.usuario.email = localStorage.getItem('email');
      this.recordarme = true;
    }
  }
  
  onSubmit(form:NgForm){
    if(form.invalid){
      return;
    }
    Swal.fire({
      allowOutsideClick : false,
      text : 'espere porfavor',
      icon : 'info'
    });

    this.auth.login(this.usuario)
  .subscribe({
    next:(resp)=>{
      console.log(resp);
      if (this.recordarme){
        localStorage.setItem('email',this.usuario.email);
      }
      Swal.close();
      Swal.fire({
        allowOutsideClick : false,
        text : 'Inicio exitoso',
        icon : 'success'
      });
    },
    error(err){
      console.log(err.error.error.message);
      Swal.fire({
        allowOutsideClick : false,
        title : 'Error al crear usuario',
        text : err.error.error.message ,
        icon : 'error'
      });
    },
    complete:()=> this.router.navigateByUrl('/home')
  })
 
}
}
