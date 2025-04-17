import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UbicacionesComponent } from './ubicaciones/ubicaciones.component';
import { EditarUbicacionComponent } from './editar-ubicacion/editar-ubicacion.component';
import { CrearUbicacionComponent } from './crear-ubicacion/crear-ubicacion.component';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolGuard } from '../auth/guards/rol.guard';

const routes: Routes = [
    { path: '', component: UbicacionesComponent },
    { path: 'crear-ubicacion', component: CrearUbicacionComponent, canActivate: [AuthGuard, RolGuard], data: { roles: ['POSTULANTE', 'ADMINISTRADOR'] }},  
    { path: 'editar-ubicacion/:id', component: EditarUbicacionComponent, canActivate: [AuthGuard, RolGuard], data: { roles: ['POSTULANTE', 'ADMINISTRADOR'] }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UbicacionesRoutingModule { }
