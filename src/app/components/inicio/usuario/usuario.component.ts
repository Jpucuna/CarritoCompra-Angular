import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Persona } from 'src/app/interfaces/persona';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  persona!: Persona;
  constructor(private router: Router, private _usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.comprobarToken();
    this.obtenerPersona();
  }

  comprobarToken(){
    if (!localStorage.getItem('token')) {
        this.router.navigate(['login']);
    }
    
  }

  obtenerPersona(){
    this._usuarioService.getPersona(Number(localStorage.getItem('idPersona'))).subscribe(data =>{
      this.persona = data;//esto es para presentar la data que se obtuvo de la bd
      console.log(this.persona);
      
    },error =>{//manejo de errores cuando no hay data
      setTimeout(() => {alert('Oops, ocurrió un error :(');
      }, 5000);
      this.router.navigate(['login']);
    })
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('idPersona');
    localStorage.removeItem('listaProducto');
    this.router.navigate(['login']);
  }
}
