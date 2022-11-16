import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Persona } from 'src/app/interfaces/persona';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {
  p!: Persona
  form!: FormGroup;
  idUser: Number = Number(localStorage.getItem('idPersona'));
  
  constructor(private router: Router, 
              private _usuarioService: UsuarioService,
              private fb: FormBuilder,
              private _snackBar: MatSnackBar){
                this.form = fb.group({
                  nombres: ['', Validators.required],
                  apellidos: ['', Validators.required],
                  email: ['', Validators.required],
                  telefono: ['', [Validators.required, Validators.maxLength(10)]],
                  domicilioR: ['', ],
                  domicilioT: ['', ],
                });
  }

  ngOnInit(): void {
    this.comprobarToken()
    this.obtenerPersona();
  }

  comprobarToken(){
    if (!localStorage.getItem('token')) {
        this.router.navigate(['login']);
    }
    
  }

  obtenerPersona(){
    this._usuarioService.getPersona(Number(this.idUser)).subscribe(data =>{
      //esto es para presentar la data que se obtuvo de la bd
      this.p = data;
      this.form.setValue({//asiganas valores a un input que está enlazado con formGroup, 
        nombres: data.nombres,
        apellidos: data.apellidos,
        email: data.email,
        telefono: data.telefono,
        domicilioR: data.domicilio1,
        domicilioT: data.domicilioT
      });
      
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

  editarUsuario(){
    const persona: Persona ={
      idPersona: Number(this.idUser),
      nombres: this.form.value.nombres,
      apellidos: this.form.value.apellidos,
      email: this.form.value.email,
      telefono: this.form.value.telefono,
      domicilio1: this.form.value.domicilioR,
      domicilioT: this.form.value.domicilioT,
    }

    this._usuarioService.putPersona(Number(this.idUser), persona).subscribe(()=>{
      this.router.navigate(['/inicio/usuario']);
      this.mensaje();
  });
  }


  mensaje(){
    this._snackBar.open("Datos del usuario actualizados correctamente",'',{
      duration: 5000,
      horizontalPosition: "right",
      verticalPosition: "bottom",
      panelClass: ['green-snackbar']
    })
  }

}
