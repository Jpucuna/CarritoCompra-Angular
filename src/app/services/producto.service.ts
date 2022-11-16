import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Producto } from '../interfaces/producto';
import { ProductOut } from '../interfaces/productOut';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private myAppUrl: string = environment.endpoint;
  private myApiUrl: string = 'api/Productoes/';

  constructor(private http: HttpClient) { }

  getProductos(): Observable<Producto[]>{
    return this.http.get<Producto[]>(`${this.myAppUrl}${this.myApiUrl}`);  
  }

  putProducto(idProducto: number, producto: ProductOut): Observable<void>{
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${idProducto}`, producto);
  }

}
