import { BrowserModule } from '@angular/platform-browser';
import { NgModule  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { routing, appRoutingProviders } from './app.routing';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


import { AdminGuard } from './services/admin.guard';
import { UsuarioService } from './services/usuario.service';
import { PedidoService } from './services/pedido.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { InicioComponent} from './component/inicio/inicio.component';
import { NavAdminComponent} from './component/partial/partial.component';
import { PedidoComponent } from './component/pedido/pedido.component';
import { PedidoEditarComponent } from './component/pedido-editar/pedido-editar.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InicioComponent,
    NavAdminComponent,
    PedidoComponent,
    PedidoEditarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routing,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    appRoutingProviders,
    UsuarioService,
    PedidoService,
    AdminGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
