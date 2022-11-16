import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Compra } from '../interfaces/compra';

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  private myAppUrl: string = environment.endpoint;
  private myApiUrl: string = 'api/Compras/';
  private lastCompra: string = 'UltimaCompra/';
  
  constructor(private http: HttpClient) { }

  agregarCompra(compra: Compra){
    return this.http.post<Compra>(`${this.myAppUrl}${this.myApiUrl}`, compra);
  }

  getLastCompraId(idPersona: number): Observable<Compra>{
    return this.http.get<Compra>(`${this.myAppUrl}${this.myApiUrl}${this.lastCompra}${idPersona}`);
  }

  getCompraId(idPersona: number): Observable<Compra[]>{
    return this.http.get<Compra[]>(`${this.myAppUrl}${this.myApiUrl}${idPersona}`);  
  } 

}
