import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Persona } from '../interfaces/persona';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private myAppUrl: string = environment.endpoint;
  private myApiUrl: string = 'api/Personas/';

  constructor(private http: HttpClient) { }

  getPersona(idPersona: number): Observable<Persona>{
    return this.http.get<Persona>(`${this.myAppUrl}${this.myApiUrl}${idPersona}`);  
}

  putPersona(idPersona: number, persona: Persona): Observable<void>{
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${idPersona}`, persona);
  }

}
