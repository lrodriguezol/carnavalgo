import { Component, OnInit } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { addMonths, subMonths } from 'date-fns';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { EventosService } from '../services/eventos.service';
import { AuthService } from '../../auth/services/auth.service';
import { Evento } from '../models/evento.model';
import { Router } from '@angular/router';
import { AgrupacionesService } from '../../agrupaciones/services/agrupaciones.service';

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
  eventoSeleccionado: Evento | null = null;
  eventos: CalendarEvent[] = [];
  errorMsg: string | null = null;
  agrupacionNombre: string | null = null;
  diaSeleccionado: boolean = false;
  fechaSeleccionada: Date | null = null;

  constructor(private authService: AuthService, private router: Router, private eventosService: EventosService, private agrupacionesService: AgrupacionesService) {}

  ngOnInit(): void {
    this.userRole = this.authService.getRol();

    this.eventosService.obtenerEventos().subscribe({
      next: (eventosDesdeBack: Evento[]) => {
        this.eventos = eventosDesdeBack.map(e => ({
          start: new Date(e.fecha),
          title: e.titulo,
          color: { primary: '#ecb636', secondary: '#6a1b32' },
          meta: e
        }));
      },
      error: (err) => {
        this.errorMsg = 'No se pudieron cargar los eventos.';
        console.error(err);
      }
    });
  }

  onDayClick(date: Date): void {
    this.diaSeleccionado = true;
    this.fechaSeleccionada = date;
    
    const encontrado = this.eventos.find(e =>
      new Date(e.start).toDateString() === date.toDateString()
    );
  
    this.eventoSeleccionado = encontrado?.meta || null;
    this.agrupacionNombre = null;

    if (this.eventoSeleccionado?.agrupacion != null) {
      this.agrupacionesService.getAgrupacion(this.eventoSeleccionado.agrupacion).subscribe({
        next: (agrupacion) => this.agrupacionNombre = agrupacion.agrupacion,
        error: () => this.agrupacionNombre = 'Sin agrupación.'
      });
    } else {
      this.agrupacionNombre = 'Sin agrupación.';
    }
  }

  verMesAnterior(): void {
    this.viewDate = subMonths(this.viewDate, 1);
  }

  verMesSiguiente(): void {
    this.viewDate = addMonths(this.viewDate, 1);
  }

  crearEvento(): void {
    this.router.navigate(['/eventos/crear-evento']);
  }
  
  editarEvento(): void {
    if (this.eventoSeleccionado && this.eventoSeleccionado.id) {
      this.router.navigate(['/eventos/editar-evento', this.eventoSeleccionado.id]);
    }
  }
}