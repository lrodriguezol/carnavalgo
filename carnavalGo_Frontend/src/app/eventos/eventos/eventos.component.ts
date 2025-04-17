import { Component } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { addMonths, subMonths } from 'date-fns';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { AuthService } from '../../auth/services/auth.service';

registerLocaleData(localeEs);

@Component({
  selector: 'app-eventos',
  standalone: false,
  templateUrl: './eventos.component.html',
  styleUrl: './eventos.component.scss'
})

export class EventosComponent {
  viewDate: Date = new Date();
  userRole: string | null = null;
  eventoSeleccionado: CalendarEvent | null = null;

  constructor(private authService: AuthService) {}

  //Datos mockeados para pruebas
  eventos: CalendarEvent[] = [
    {
      start: new Date(), 
      title: 'Gran Desfile Inaugural',
      color: { primary: '#ecb636', secondary: '#6a1b32' }
    },
    {
      start: new Date('2025-04-15'),
      title: 'Concurso de Comparsas',
      color: { primary: '#ecb636', secondary: '#6a1b32' }
    },
    {
      start: new Date('2025-05-02'),
      title: 'Gran Final del Carnaval',
      color: { primary: '#ecb636', secondary: '#6a1b32' }
    }
  ];
  
  ngOnInit(): void {
    this.userRole = this.authService.getRol();
  }

  onDayClick(date: Date): void {
    this.eventoSeleccionado = this.eventos.find(e =>
      new Date(e.start).toDateString() === date.toDateString()
    ) || null;
  }

  verMesAnterior(): void {
    this.viewDate = subMonths(this.viewDate, 1);
  }
  
  verMesSiguiente(): void {
    this.viewDate = addMonths(this.viewDate, 1);
  }

  crearEvento(): void {
  }

  editarEvento(): void {
    if (this.eventoSeleccionado) {
    }
  }
}