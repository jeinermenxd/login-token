import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private auth: AuthService, private router :Router){}

  Salir(){
    Swal.fire({
      allowOutsideClick : false,
      text : 'Exito al salir',
      icon : 'success'
    });
    this.auth.logout();
    this.router.navigateByUrl('/login');
    
  }

}
