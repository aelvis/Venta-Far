import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams  } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { GLOBAL } from './global';	
import { UsuarioService } from './usuario.service'

@Injectable()
export class PedidoService{

	public url: string;
	public identity;
	public token;
	public verify;
	constructor(private _http: HttpClient, private _usuSer: UsuarioService){
		this.url = GLOBAL.url;
	}
	obtenerPedido(){
		let params = new HttpParams();
			params = params.append('verificar', 'lorem');
		let headers = new HttpHeaders({
			'Content-Type':'application/json',
			'Authorization': this._usuSer.getToken()
		});
		return this._http.post(this.url+'/pedidos/pedido/obtenerPedido', params, {headers:headers});
	}
	crearPedido(){
		let params = new HttpParams();
			params = params.append('verificar', 'crear');
		let headers = new HttpHeaders({
			'Content-Type':'application/json',
			'Authorization': this._usuSer.getToken()
		});
		return this._http.post(this.url+'/pedidos/pedido/registrarPedido', params, {headers:headers});
	}
	buscarPedidoNombre(nombre){
		let params = new HttpParams();
			params = params.append('buscar_nombre', nombre);
		let headers = new HttpHeaders({
			'Content-Type':'application/json',
			'Authorization': this._usuSer.getToken()
		});
		return this._http.post(this.url+'/pedidos/pedido/buscarProductoPedidoNombre', params, {headers:headers});
	}
	buscarPedidoCodigo(codigo){
		let params = new HttpParams();
			params = params.append('buscar_codigo', codigo);
		let headers = new HttpHeaders({
			'Content-Type':'application/json',
			'Authorization': this._usuSer.getToken()
		});
		return this._http.post(this.url+'/pedidos/pedido/buscarProductoPedidoCodigo', params, {headers:headers});
	}
	agregarPedido(id_producto_unidad,cantidad,representacion,precio,id_producto,id_pedido){
		let params = new HttpParams();
			params = params.append('unidad_pedido_id', id_producto_unidad);
			params = params.append('id_producto', id_producto);
			params = params.append('cantidad', cantidad);
			params = params.append('representacion', representacion);
			params = params.append('precio', precio);
			params = params.append('ticket', id_pedido);
		let headers = new HttpHeaders({
			'Content-Type':'application/json',
			'Authorization': this._usuSer.getToken()
		});
		return this._http.post(this.url+'/pedidos/pedido/agregarPedido', params, {headers:headers});
	}
	obtenerPedidosClientePagar(id_pedido){
		let params = new HttpParams();
			params = params.append('id_pedido', id_pedido);
		let headers = new HttpHeaders({
			'Content-Type':'application/json',
			'Authorization': this._usuSer.getToken()
		});
		return this._http.post(this.url+'/pedidos/pedido/obtenerPedidosClientePagar', params, {headers:headers});
	}
	eliminarPedidoTick(id_pedido){
		let params = new HttpParams();
			params = params.append('id_pedido', id_pedido);
		let headers = new HttpHeaders({
			'Content-Type':'application/json',
			'Authorization': this._usuSer.getToken()
		});
		return this._http.post(this.url+'/pedidos/pedido/eliminarPedidosClientePagar', params, {headers:headers});
	}
	actualizarPedidoTick(id_pedido,cantidad,precio,representacion,id_producto){
		let params = new HttpParams();
			params = params.append('id_pedido', id_pedido);
			params = params.append('cantidad', cantidad);
			params = params.append('precio', precio);
			params = params.append('representacion', representacion);
			params = params.append('id_producto', id_producto);
		let headers = new HttpHeaders({
			'Content-Type':'application/json',
			'Authorization': this._usuSer.getToken()
		});
		return this._http.post(this.url+'/pedidos/pedido/actualizarPedidosClientePagar', params, {headers:headers});
	}
}