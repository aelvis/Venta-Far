import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from '../../services/global';
import { PedidoService } from '../../services/pedido.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {
  public ticket;
  public inicio:boolean;
  constructor(private toastr: ToastrService, private _ped: PedidoService, private _router: Router){ 

  }
  ngOnInit() {
  	this.obtenerTicket();
  }
  showSuccess(titulo,mensaje) {
    this.toastr.success(mensaje, titulo);
  }
  showError(titulo,mensaje) {
    this.toastr.error(mensaje, titulo);
  }
  obtenerTicket(){
    this.inicio = false;
  	this._ped.obtenerPedido().subscribe(
  		res => {
  			if(res["mensaje"].terminar){
				localStorage.clear();
				this._router.navigate(['/login']);
  			}else{
  				if(res["mensaje"].ticket){
  					this.ticket = res["mensaje"].ticket;
            this.inicio = true;
  				}else{
  					this.showError("Alerta","No se Encuentran Productos");
            this.inicio = true;
  				}
  			}
  		},
  		error => {
  			this.showError("Alerta","Error de Internet");
        this.inicio = true;
  		}
  	);
  }
  agregarTicket(){
    this.inicio = false;
  	this._ped.crearPedido().subscribe(
  		res => {
  			if(res["mensaje"].terminar){
				localStorage.clear();
				this._router.navigate(['/login']);
  			}else{
  				if(res["mensaje"].codigo == "success"){
  					this.showSuccess("Alerta","Se agregó");
  					this.obtenerTicket();
  				}else{
  					this.showError("Alerta","No se Encuentran Productos");
  				}
  			}
  		},
  		error => {
  			this.showSuccess("Alerta","Error de Internet");
  		}
  	);
  } 
}
