import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Producto } from 'src/app/interfaces/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  products: Producto[]=[];
  listaProducto: Producto[]=[];
  cant: number = 0;


  constructor(private router: Router, 
              private _productoService: ProductoService,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.comprobarToken();
    this.obtenerProductos();
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


  obtenerProductos(){
    this.comprobarToken();
    this._productoService.getProductos().subscribe(data=>{
      this.products = data;
      console.log(data);
      
    },error =>{//manejo de errores cuando no hay data
      
      setTimeout(() => {alert('Oops, ocurrió un error :(');
      localStorage.removeItem('token');
      this.comprobarToken();
      this.router.navigate(['login']);
    }, 2000);
    });
    
  }

  aumentarCantidad(producto: Producto){
    if(isNaN(producto.cant ))
    {
      producto.cant = this.cant;
      producto.cant++;
    }else{
      if(producto.cantidad != producto.cant)
        producto.cant++;
    }
  }


  disminuirCantidad(producto: Producto){
    if(isNaN(producto.cant ))
    {
      producto.cant = this.cant;
    }else{
      if(producto.cant != 0){
        producto.cant--;
      }
    }
  }

  mensajeCompra(){
    this._snackBar.open("PRODUCTO AGREGADO AL CARRITO CON ÉXITO",'',{
      duration: 2000,
      horizontalPosition: "center",
      verticalPosition: "bottom",
      panelClass: ['green-snackbar']
    })
  }

  agregarProducto(producto: Producto){//recibimos el producto desde la UI
    if(!localStorage.getItem("listaProducto")){//comprobamos si existe en el local storage data con el keyName "listaProducto"
      this.modificarProductoStorageBD(producto);
    }else{
      this.listaProducto = JSON.parse(localStorage.getItem("listaProducto")!);
      let index = this.listaProducto.findIndex(b => b.nombreProducto==producto.nombreProducto); 
      
      if(index == -1){ //si el indice es -1 quiere decir que no existe el producto
        this.modificarProductoStorageBD(producto);
      }
      else{// caso contrario encontró un producto con el mismo nombre
        this.listaProducto[index].cant += producto.cant;
        this.listaProducto[index].cantidad-=producto.cant
        localStorage.setItem("listaProducto", JSON.stringify(this.listaProducto));
        this.actualizarProductos();
        this.mensajeCompra()
        producto.cantidad -=producto.cant;
        producto.cant=0;
      }
    }
  }


  modificarProductoStorageBD(producto: Producto){
    producto.cantidad -=producto.cant;
    this.listaProducto.push(producto);
    localStorage.setItem("listaProducto", JSON.stringify(this.listaProducto));
    this.actualizarProductos();
    this.mensajeCompra();
    producto.cant=0;
  }


  actualizarProductos(){
    this.listaProducto = JSON.parse(localStorage.getItem("listaProducto")!);
    this.listaProducto.forEach(producto => {
      this._productoService.putProducto(producto.idProducto, producto).subscribe();
    });
  }

  
}
