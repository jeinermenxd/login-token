import { Component,OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioModels } from '../../models/usuario.models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario:UsuarioModels = new UsuarioModels();

constructor(private auth:AuthService){
  this.usuario = new UsuarioModels();
}
  
  ngOnInit(): void {
    
  }
  
  onSubmit(form:NgForm){
    if(form.invalid){
      return;
    }
    this.auth.login(this.usuario)
  .subscribe({
    next(resp){
      console.log(resp)
    },
    error(err){
      console.log(err.error.error.message);
    }
  })
}
}
//error(err){
  //console.log(err.error.error.message);
//}