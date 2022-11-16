import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Compra } from 'src/app/interfaces/compra';
import { UsuarioService } from 'src/app/services/usuario.service';
import { CompraService } from 'src/app/services/compra.service';
import { DetalleCompraService } from 'src/app/services/detalle-compra.service';
import { DetalleCompra } from 'src/app/interfaces/detalleCompra';
import { Producto } from 'src/app/interfaces/producto';



@Component({
  selector: 'app-dialog-compra',
  templateUrl: './dialog-compra.component.html',
  styleUrls: ['./dialog-compra.component.css']
})
export class DialogCompraComponent implements OnInit {

  idUser: Number = Number(localStorage.getItem('idPersona'));
  form!: FormGroup;
  detalleProd!: DetalleCompra;
  auxCompra: Compra[] = [];
  domicilios: string[]=[];

  constructor(
    public dialogRef: MatDialogRef<DialogCompraComponent>,
    private fb: FormBuilder,
    private _usuarioService: UsuarioService,
    private _detalleService: DetalleCompraService,
    private _compraService: CompraService,
    private router: Router,) {

      this.form = fb.group({
        nombres: ['', Validators.required],
        apellidos: ['', Validators.required],
        email: ['', Validators.required],
        telefono: ['', Validators.required],
        domicilioE: ['',Validators.required],
      });
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.comprobarToken();
    this.obtenerPersona();
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
  
  obtenerPersona(){
    this._usuarioService.getPersona(Number(this.idUser)).subscribe(data =>{
      //esto es para presentar la data que se obtuvo de la bd
      this.form.setValue({//asiganas valores a un input que está enlazado con formGroup, 
        nombres: data.nombres,
        apellidos: data.apellidos,
        email: data.email,
        telefono: data.telefono,
        domicilioE: data.domicilio1,
      });

      this.domicilios[0] = data.domicilio1;
      this.domicilios[1] = data.domicilioT;
    },error =>{//manejo de errores cuando no hay data
      setTimeout(() => {alert('Oops, ocurrió un error :(');
      }, 2000);
      this.router.navigate(['login']);
    });
  }

  pagarCompra(){
    let fecha = new Date();

    const compra: Compra ={
      idPersona: Number(this.idUser),
      fechaCompra: fecha,
      pago: Number(localStorage.getItem("totalCompra")),
      domicilioEntrega: this.form.value.domicilioE
    }

    this._compraService.agregarCompra(compra).subscribe(()=>{
    });

    var data = JSON.parse(localStorage.getItem('data')!);
    if(data){
      let id = data[0]["idCompra"];
      console.log(id);
      this.generarDetalleProducto(id);

    }else{
      console.log("error");
      
    }
    
  }

  generarDetalleProducto(idCompra: number){
    let productos: Producto[] = JSON.parse(localStorage.getItem("listaProducto")!);
    productos.forEach(product => {
      
      let detalle: DetalleCompra= {
        idCompra: idCompra,
        idProducto: product.idProducto,
        cantidad: product.cant
      }
      
      this._detalleService.agregarDetalleCompra(detalle).subscribe(()=>{

      })
    });
    this.eliminarDataLocalStorage();
  }

  eliminarDataLocalStorage(){
    localStorage.removeItem('listaProducto');
    localStorage.removeItem('data');
    localStorage.removeItem('totalCompra');
    this.router.navigate(['registrarCompra']);
  }

}
