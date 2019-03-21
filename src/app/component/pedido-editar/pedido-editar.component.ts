import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from '../../services/global';
import { PedidoService } from '../../services/pedido.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pedido-editar',
  templateUrl: './pedido-editar.component.html',
  styleUrls: ['./pedido-editar.component.css']
})
export class PedidoEditarComponent implements OnInit {
  public pedido:any = [];
  public id_pedido;
  public tabla_principal:boolean;
  public pedido_buscado;
  public introduccion:boolean;
  public usuario;
  public total;
  constructor(private toastr: ToastrService, private _ped: PedidoService, private _router: Router, private route:ActivatedRoute) { 
  	this.route.params.forEach(x => this.id_pedido = x['id_pedido']);
  	this.tabla_principal = false;
  	this.introduccion = false;
  }
  showSuccess(titulo,mensaje) {
    this.toastr.success(mensaje, titulo);
  }
  showError(titulo,mensaje) {
    this.toastr.error(mensaje, titulo);
  }
  ngOnInit() {
  	this.obtenerPedido();
  }
  obtenerPedido(){
  	this._ped.obtenerPedidosClientePagar(this.id_pedido).subscribe(
  		res => {
  			if(res["mensaje"].terminar){
				localStorage.clear();
				this._router.navigate(['/login']);
  			}else{
  				if(res["mensaje"].ped){
  					if(res["mensaje"].usuario.estado_id == '1'){
						this._router.navigate(['/pedido']);
  					}
  					this.pedido = res["mensaje"].ped;
  					this.usuario = res["mensaje"].usuario;
  					this.introduccion = true;
  				}else{
  					this.showError("Alerta","No se Encuentran Productos");
  				}
  			}
  		},
  		error => {
  			this.showError("Alerta","Error de Internet");
  		}
  	);
  }
	getSum(): number {
    let sum = 0;
    for (let i = 0; i < this.pedido.length; i++) {
      sum += parseFloat(this.pedido[i].precio);
    }
    return sum;
  }
  buscarNombre(nombre){
  	this._ped.buscarPedidoNombre(nombre).subscribe(
  		res => {
  			if(res["mensaje"].terminar){
				localStorage.clear();
				this._router.navigate(['/login']);
  			}else{
  				if(res["mensaje"].buscados){
  					this.pedido_buscado = res["mensaje"].buscados;
  					this.tabla_principal = true;
  				}else{
  					this.showError("Alerta","No se Encuentran Productos");
  				}
  			}
  		},
  		error => {
  			this.showError("Alerta","Error de Internet");
  		}
  	);
  }
  buscarCodigo(codigo){
  	this._ped.buscarPedidoCodigo(codigo).subscribe(
  		res => {
  			if(res["mensaje"].terminar){
				localStorage.clear();
				this._router.navigate(['/login']);
  			}else{
  				if(res["mensaje"].buscados){
  					this.pedido_buscado = res["mensaje"].buscados;
  					this.tabla_principal = true;
  				}else{
  					this.showError("Alerta","No se Encuentran Productos");
  				}
  			}
  		},
  		error => {
  			this.showError("Alerta","Error de Internet");
  		}
  	);
  }
  agregarPedidoAlCarrito(producto_unidad_id,cantidad,representacion,precio,id_producto,id_producto_sucursal){
  	this._ped.agregarPedido(producto_unidad_id,cantidad,representacion,precio,id_producto,this.id_pedido,id_producto_sucursal).subscribe(
  		res => {
  			if(res["mensaje"].terminar){
				localStorage.clear();
				this._router.navigate(['/login']);
  			}else{
  				if(res["mensaje"].codigo == 'success'){
  					this.obtenerPedido();
  					this.showSuccess("Alerta","Se agregó correctamente");
  					this.tabla_principal = true;
  				}else{
  					this.showError("Alerta",res["mensaje"].msg);
  				}
  			}
  		},
  		error => {
  			this.showError("Alerta","Error de Internet");
  		}
  	);
  }
  eliminarPedidoCarritoCompras(id_pedido){
  	this.introduccion = false;
  	this._ped.eliminarPedidoTick(id_pedido).subscribe(
  		res => {
  			if(res["mensaje"].terminar){
				localStorage.clear();
				this._router.navigate(['/login']);
  			}else{
  				if(res["mensaje"].codigo == 'success'){
  					this.obtenerPedido();
  					this.showSuccess("Alerta","Se Actualizó correctamente");
  					this.introduccion = true;
  				}else{
  					this.showError("Alerta",res["mensaje"].msg);
  					this.introduccion = true;
  				}
  			}
  		},
  		error => {
  			this.showError("Alerta","Error de Internet");
  			this.introduccion = true;
  		}
  	); 	
  }
  actualizarPedidoAlCarrito(id_pedido,cantidad,precio,representacion,producto_sucursal){
  	this.introduccion = false;
  	this._ped.actualizarPedidoTick(id_pedido,cantidad,precio,representacion,producto_sucursal).subscribe(
  		res => {
  			if(res["mensaje"].terminar){
				localStorage.clear();
				this._router.navigate(['/login']);
  			}else{
  				if(res["mensaje"].codigo == 'success'){
  					this.obtenerPedido();
  					this.showSuccess("Alerta","Se Actualizó correctamente");
  					this.introduccion = true;
  				}else{
  					this.showError("Alerta",res["mensaje"].msg);
  					this.introduccion = true;
  				}
  			}
  		},
  		error => {
  			this.showError("Alerta","Error de Internet");
  			this.introduccion = true;
  		}
  	); 
  }
   actualizarPedidoUsuarioAlCarrito(dni_ruc){
  	this._ped.actualizarUsuarioTicket(dni_ruc,this.id_pedido).subscribe(
  		res => {
  			if(res["mensaje"].terminar){
				localStorage.clear();
				this._router.navigate(['/login']);
  			}else{
  				if(res["mensaje"].codigo == 'success'){
  					this.obtenerPedido();
  					this.showSuccess("Alerta","Se Actualizó correctamente");
  				}else{
  					this.showError("Alerta",res["mensaje"].msg);
  				}
  			}
  		},
  		error => {
  			this.showError("Alerta","Error de Internet");
  		}
  	); 
  }
  actualizarPedidoUsuarioAlCarritoDireccion(direccion){
  	this._ped.actualizarUsuarioTicketDireccion(direccion,this.id_pedido).subscribe(
  		res => {
  			if(res["mensaje"].terminar){
				localStorage.clear();
				this._router.navigate(['/login']);
  			}else{
  				if(res["mensaje"].codigo == 'success'){
  					this.obtenerPedido();
  					this.showSuccess("Alerta","Se Actualizó la Dirección correctamente");
  				}else{
  					this.showError("Alerta",res["mensaje"].msg);
  				}
  			}
  		},
  		error => {
  			this.showError("Alerta","Error de Internet");
  		}
  	); 
  }
  mandarCaja(){
  	this._ped.mandarCaja(this.id_pedido).subscribe(
  		res => {
  			if(res["mensaje"].terminar){
				localStorage.clear();
				this._router.navigate(['/login']);
  			}else{
  				if(res["mensaje"].codigo == 'success'){
  					this._router.navigate(['/pedido']);
  				}else{
  					this.showError("Alerta",res["mensaje"].msg);
  				}
  			}
  		},
  		error => {
  			this.showError("Alerta","Error de Internet");
  		}
  	); 
  }
}
