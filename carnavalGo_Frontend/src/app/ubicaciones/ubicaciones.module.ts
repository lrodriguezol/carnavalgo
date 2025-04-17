import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxMapLibreGLModule } from '@maplibre/ngx-maplibre-gl';
import { UbicacionesRoutingModule } from './ubicaciones-routing.module';
import { UbicacionesComponent } from './ubicaciones/ubicaciones.component';
import { EditarUbicacionComponent } from './editar-ubicacion/editar-ubicacion.component';
import { CrearUbicacionComponent } from './crear-ubicacion/crear-ubicacion.component';

@NgModule({
  declarations: [
    UbicacionesComponent,
    CrearUbicacionComponent,
    EditarUbicacionComponent
  ],
  imports: [
    CommonModule,
    NgxMapLibreGLModule ,
    UbicacionesRoutingModule
  ]
})
export class UbicacionesModule { }
