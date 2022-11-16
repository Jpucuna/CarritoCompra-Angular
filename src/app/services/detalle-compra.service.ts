import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DetalleCompra } from '../interfaces/detalleCompra';

@Injectable({
  providedIn: 'root'
})
export class DetalleCompraService {

  private myAppUrl: string = environment.endpoint;
  private myApiUrl: string = 'api/DetalleCompras/';
  
  constructor(private http: HttpClient) { }

  agregarDetalleCompra(detalle: DetalleCompra){
    return this.http.post<DetalleCompra>(`${this.myAppUrl}${this.myApiUrl}`, detalle);
  }

}
