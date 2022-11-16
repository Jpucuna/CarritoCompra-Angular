import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Producto } from 'src/app/interfaces/producto';
import { CompraService } from 'src/app/services/compra.service';
import { ProductoService } from 'src/app/services/producto.service';
import { DialogCompraComponent } from '../dialog-compra/dialog-compra.component';




@Component({
  selector: 'app-registrar-compra',
  templateUrl: './registrar-compra.component.html',
  styleUrls: ['./registrar-compra.component.css']
})
export class RegistrarCompraComponent implements OnInit {

  total!: number;
  listaProd: Producto[]=[];
  prodAux!: Producto;
  datasource = new MatTableDataSource<Producto>();

  displayedColumns: string[] = ['producto', 'cantidad', 'precio Un.', 'Precio F.', 'accion'];

  constructor(private router: Router,
              public dialog: MatDialog, 
              private _snackBar: MatSnackBar,
              private _compraService: CompraService,
              private _productoService: ProductoService) { }

  ngOnInit(): void {
    this.comprobarToken();
    this.obtenerProductoStorage();
  }

  openDialog() {
    this.dialog.open(DialogCompraComponent,{width: '70%'});
    this.total = this.precioTotal();
    localStorage.setItem("totalCompra", String(this.total));
    localStorage.removeItem('data');
    this._compraService.getLastCompraId(Number(localStorage.getItem("idPersona"))).subscribe(data=>{
      localStorage.setItem('data', JSON.stringify(data));
    });
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

  obtenerProductoStorage(){
      this.datasource.data = JSON.parse(localStorage.getItem("listaProducto")!);
  }

  removerProductoCompra(producto: Producto){
    this.prodAux = {
      idProducto: producto.idProducto,
      nombreProducto: producto.nombreProducto,
      cantidad: producto.cantidad + producto.cant,
      precio: producto.precio,
      descripcion: producto.descripcion,
      url: producto.url,
      cant: producto.cant 
    }

    
    this.listaProd = this.datasource.data.filter(x => x.nombreProducto !== this.prodAux.nombreProducto)
    console.log(this.listaProd.length);
    this._productoService.putProducto(this.prodAux.idProducto, this.prodAux).subscribe(()=>{});
    localStorage.setItem("listaProducto", JSON.stringify(this.listaProd));
    this.mensajeExito();
    this.ngOnInit();
    
  }


  mensajeExito(){
    this._snackBar.open("Producto removido con éxito", "",{
      duration: 2000,
      horizontalPosition: "center",
      verticalPosition: "bottom",
      panelClass: ['delete-snackbar']
      });
    }

    precioCantidad(producto: Producto){
      return producto.cant*producto.precio; 
    }

    precioTotal(){
      let precioProd = 0;
      let precioFinal = 0;
      this.datasource.data.forEach(d => {
        precioProd = d.precio*d.cant;
        precioFinal += precioProd; 
      });
      return precioFinal;
    }
    

}
