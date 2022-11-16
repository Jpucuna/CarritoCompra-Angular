import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, retry } from 'rxjs';
/* ESTE ES UN SERVICIO GENERADO CON EL COMANDO ng g s services/token-interceptor */
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{//se le agrega la herencia a httpInterceptor

  constructor(private router: Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {//se genera el metodo interceptor
    //

    let tokenJWT = req.clone({//clonamos la cabecera de la peticion a enviar
      setHeaders:{//seteamos la autorizacion con el token 
        Authorization: 'bearer '+localStorage.getItem('token'),//extraemos el token desde el localstorage
      }
    })

    return next.handle(tokenJWT);//retornamos la cabecera nueva con el token 
  }
}
