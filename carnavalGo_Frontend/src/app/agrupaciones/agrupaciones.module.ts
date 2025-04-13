import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgrupacionesRoutingModule } from './agrupaciones-routing.module';
import { AgrupacionesListComponent } from './agrupaciones-list/agrupaciones-list.component';
import { AgrupacionDetalleComponent } from './agrupacion-detalle/agrupacion-detalle.component';
import { AgrupacionCrearComponent } from './agrupacion-crear/agrupacion-crear.component';
import { AgrupacionEditarComponent } from './agrupacion-editar/agrupacion-editar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AgrupacionesListComponent,
    AgrupacionDetalleComponent,
    AgrupacionCrearComponent,
    AgrupacionEditarComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,  
    AgrupacionesRoutingModule
  ]
})
export class AgrupacionesModule { }
