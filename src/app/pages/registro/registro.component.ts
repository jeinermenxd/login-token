import { Component,OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

import { AuthService } from 'src/app/services/auth.service';
import { UsuarioModels } from '../../models/usuario.models';



@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
usuario:UsuarioModels;
constructor(private auth:AuthService,private router : Router){
  this.usuario = new UsuarioModels();
}
ngOnInit(): void {
  this.usuario.email='mjair360@gmail.com';
}
onSubmit(form:NgForm){
  if(form.invalid){
    return;
  }
  this.auth.nuevousuario(this.usuario)
  .subscribe({
    next(resp){
      console.log(resp)
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
    complete:()=> this.router.navigateByUrl('/login'),
  })
}
}

