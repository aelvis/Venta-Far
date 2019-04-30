import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//Admin
import { InicioComponent} from './component/inicio/inicio.component';
import { LoginComponent} from './component/login/login.component';
import { PedidoComponent } from './component/pedido/pedido.component';
import { PedidoEditarComponent } from './component/pedido-editar/pedido-editar.component';
import { AdminGuard } from './services/admin.guard';

const appRoutes: Routes = [
	{path: '', component: LoginComponent},
	{path: '', redirectTo: 'login', pathMatch: 'full'},
	{path: 'login', component: LoginComponent},
	{path: 'inicio', component: PedidoComponent, canActivate: [AdminGuard]},
	{path: 'pedido', component: PedidoComponent, canActivate: [AdminGuard]},
	{path: 'pedido-editar/:id_pedido', component: PedidoEditarComponent, canActivate: [AdminGuard]},
	{path: '**', component: LoginComponent},
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { enableTracing: false, useHash:true });