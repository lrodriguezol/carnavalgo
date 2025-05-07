import { Component, OnInit, Inject } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../../auth/services/auth.service';
import { UbicacionesService } from '../services/ubicaciones.service';
import { AgrupacionesService } from '../../agrupaciones/services/agrupaciones.service';
import { EventosService } from '../../eventos/services/eventos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ubicaciones',
  standalone: false,
  templateUrl: './ubicaciones.component.html',
  styleUrl: './ubicaciones.component.scss'
})

export class UbicacionesComponent implements OnInit {
  style: string = 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json';
  center: [number, number] = [-6.2925, 36.5297]; //Coordenadas Cádiz Centro
  zoom = 18;
  userRole: string | null = null;
  ubicaciones: any[] = [];
  ubicacionSeleccionada: any = null;
  agrupacionGuardada: any = null;
  eventoGuardado: any = null;

  isBrowser = false;

  constructor(private router: Router, private authService: AuthService, private ubicacionesService: UbicacionesService, private eventosService: EventosService, private agrupacionesService: AgrupacionesService, @Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.userRole = this.authService.getRol();
    console.log('ROL del usuario:', this.userRole); 
    this.cargarUbicaciones();
  }

  cargarUbicaciones() {
    this.ubicacionesService.obtenerUbicaciones().subscribe({
      next: (data) => {
        this.ubicaciones = data;
      },
      error: (err) => {
        console.error('Error al cargar las ubicaciones:', err);
      }
    });
  }


  seleccionarUbicacion(ubicacion: any, event?: MouseEvent) {
    console.log('Ubicación seleccionada:', ubicacion); 

    if (event) {
      event.stopPropagation();
    }

    this.ubicacionSeleccionada = ubicacion;
    this.agrupacionGuardada = null;
    this.eventoGuardado = null;
  
    if (ubicacion.agrupacion) {
      this.agrupacionesService.getAgrupacion(ubicacion.agrupacion).subscribe({
        next: (agrupacion) => {
          this.agrupacionGuardada = agrupacion;
        },
        error: () => {
          this.agrupacionGuardada = null;
        }
      });
    }
  
    if (ubicacion.evento) {
      this.eventosService.obtenerEventoPorId(ubicacion.evento).subscribe({
        next: (evento) => {
          this.eventoGuardado = evento;
        },
        error: () => {
          this.eventoGuardado = null;
        }
      });
    }
  }


  deseleccionarUbicacion(): void {
    this.ubicacionSeleccionada = null;
    this.agrupacionGuardada = null;
    this.eventoGuardado = null;
  }
  
  crearUbicacion() {
    this.router.navigate(['/ubicaciones/crear-ubicacion']);
  }

  puedeEditarUbicacion(): boolean {
    if (!this.ubicacionSeleccionada) return false;
  
    if (this.userRole === 'ADMINISTRADOR') {
      return true;
    }
  
    if (this.userRole === 'POSTULANTE') {
      return this.agrupacionGuardada && this.agrupacionGuardada.creadoPor?.id === this.authService.getUserId();
    }
  
    return false;
  }

  editarUbicacion() {
    if (this.ubicacionSeleccionada) {
      this.router.navigate(['/ubicaciones/editar-ubicacion', this.ubicacionSeleccionada.id]);
    }
  }

}