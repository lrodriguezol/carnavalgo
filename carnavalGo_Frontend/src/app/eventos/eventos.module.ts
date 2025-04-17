import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns'
import { LOCALE_ID } from '@angular/core';

import { EventosRoutingModule } from './eventos-routing.module';
import { EventosComponent } from './eventos/eventos.component';
import { CrearEventoComponent } from './crear-evento/crear-evento.component';
import { EditarEventoComponent } from './editar-evento/editar-evento.component';

registerLocaleData(localeEs);

@NgModule({

  providers: [
    { provide: LOCALE_ID, useValue: 'es' },
    {
      provide: DateAdapter,
      useFactory: adapterFactory,
      deps: []
    }
  ],
  declarations: [
    EventosComponent,
    CrearEventoComponent,
    EditarEventoComponent
  ],
  imports: [
    CommonModule,
    EventosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ]
})
export class EventosModule {}
