import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { login } from 'src/app/interfaces/login';
import { responseI } from 'src/app/interfaces/responseI';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, 
              private _loginService: LoginService, 
              private router: Router,
              private _snackBar: MatSnackBar) { 
    this.form = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.comprobarToken();
  }
  
  
  login(form: login){
    
    this._loginService.getTokenLogin(form).subscribe((response)=>{
      let responseData : responseI= response;
      if(responseData){
        localStorage.setItem("token", responseData.token);
        localStorage.setItem("idPersona", responseData.idPersona);
        this.comprobarToken();
      }
    },(error)=>{
      this.error();
      this.form.reset();
    }
    );
  }

  error(){
    this._snackBar.open("Usuario o contraseña ingresados son invalidos",'',{
      duration: 5000,
      horizontalPosition: "center",
      verticalPosition: "bottom",
      panelClass: ['red-snackbar']
    })
  }


  comprobarToken(){
    if (localStorage.getItem('token') && localStorage.getItem('idPersona')) {
        this.router.navigate(['inicio']);
    }
  }

}
