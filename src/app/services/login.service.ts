import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { login } from '../interfaces/login';
import { responseI } from '../interfaces/responseI';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  requestHeader= new HttpHeaders(
    {"No-Auth":"True"}
  );
  private myAppUrl: string = environment.endpoint;
  private myApiUrl: string = 'api/Usuarios/authenticate';

  constructor(private http: HttpClient) { }

  getTokenLogin(login: login): Observable<responseI>{
    return this.http.post<responseI>(`${this.myAppUrl}${this.myApiUrl}`,login,{headers: this.requestHeader});
  }
}
