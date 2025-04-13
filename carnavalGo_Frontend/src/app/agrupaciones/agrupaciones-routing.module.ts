import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgrupacionesListComponent } from './agrupaciones-list/agrupaciones-list.component';
import { AgrupacionDetalleComponent } from './agrupacion-detalle/agrupacion-detalle.component';
import { AgrupacionCrearComponent } from './agrupacion-crear/agrupacion-crear.component';
import { AgrupacionEditarComponent } from './agrupacion-editar/agrupacion-editar.component';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolGuard } from '../auth/guards/rol.guard';

const routes: Routes = [
  { path: '', component: AgrupacionesListComponent },
  { path: 'crear-agrupacion', component: AgrupacionCrearComponent, canActivate: [AuthGuard, RolGuard], data: { roles: ['POSTULANTE', 'ADMINISTRADOR'] }}, 
  { path: 'editar-agrupacion/:id', component: AgrupacionEditarComponent, canActivate: [AuthGuard, RolGuard], data: { roles: ['POSTULANTE', 'ADMINISTRADOR']}},
  { path: ':id', component: AgrupacionDetalleComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgrupacionesRoutingModule { }
