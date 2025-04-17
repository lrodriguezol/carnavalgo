import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventosComponent } from './eventos/eventos.component';
import { CrearEventoComponent } from './crear-evento/crear-evento.component';
import { EditarEventoComponent } from './editar-evento/editar-evento.component';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolGuard } from '../auth/guards/rol.guard';

const routes: Routes = [
  { path: '', component: EventosComponent },
  { path: 'crear-evento', component: CrearEventoComponent, canActivate: [AuthGuard, RolGuard], data: { roles: [, 'ADMINISTRADOR'] }},  
  { path: 'editar-evento/:id', component: EditarEventoComponent, canActivate: [AuthGuard, RolGuard], data: { roles: [, 'ADMINISTRADOR'] }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventosRoutingModule {}
