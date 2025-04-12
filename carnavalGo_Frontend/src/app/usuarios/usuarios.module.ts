import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroComponent } from './registro/registro.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { EditarPerfilComponent } from './editar-perfil/editar-perfil.component';

@NgModule({
  declarations: [RegistroComponent, EditarPerfilComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UsuariosRoutingModule
  ]
})
export class UsuariosModule {}
