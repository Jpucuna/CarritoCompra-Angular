import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Compra } from 'src/app/interfaces/compra';
import { CompraService } from 'src/app/services/compra.service';



@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})
export class CompraComponent implements OnInit {
  idPersona: number = Number(localStorage.getItem('idPersona'));
  datasource = new MatTableDataSource<Compra>();
  displayedColumns: string[] = ['ID', 'Fecha de compra', 'Pago', 'Estado', 'accion'];
  constructor(private router: Router,
              private _compraService: CompraService) { }

  ngOnInit(): void {
    this.comprobarToken();
    this.obtenerComprasID();
  }

  comprobarToken(){
    if (!localStorage.getItem('token')) {
        localStorage.removeItem('idPersona');
        localStorage.removeItem('listaProducto');
        localStorage.removeItem('data');
        localStorage.removeItem('totalCompra');
        localStorage.removeItem('token');
        this.router.navigate(['login']);
    }
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('idPersona');
    localStorage.removeItem('listaProducto');
    this.router.navigate(['login']);
  }

  obtenerComprasID(){
    this._compraService.getCompraId(this.idPersona).subscribe(data => {
      this.datasource.data = data;
    });
  }


}
