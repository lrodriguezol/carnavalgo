import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UbicacionesService } from '../services/ubicaciones.service';
import { AuthService } from '../../auth/services/auth.service';
import { AgrupacionesService } from '../../agrupaciones/services/agrupaciones.service';
import { EventosService } from '../../eventos/services/eventos.service';

@Component({
  selector: 'app-crear-ubicacion',
  standalone: false,
  templateUrl: './crear-ubicacion.component.html',
  styleUrl: './crear-ubicacion.component.scss'
})
export class CrearUbicacionComponent implements OnInit {

  crearUbicacionForm!: FormGroup;
  errorMsg: string | null = null;
  agrupaciones: any[] = [];
  eventos: any[] = [];
  userRole: string | null = null;

  constructor(
    private fb: FormBuilder, private router: Router, private ubicacionesService: UbicacionesService, private authService: AuthService, 
    private agrupacionesService: AgrupacionesService, private eventosService: EventosService) {}

  ngOnInit(): void {
    this.userRole = this.authService.getRol();

    this.crearUbicacionForm = this.fb.group({
      lugar: ['', Validators.required],
      latitud: ['', Validators.required],
      longitud: ['', Validators.required],
      evento: [''],
      agrupacion: ['']
    });
    
    this.cargarEventos();
    this.cargarAgrupaciones();
  }

  cargarEventos() {
    if (this.userRole === 'ADMINISTRADOR') {
      this.eventosService.obtenerEventos().subscribe({
        next: (eventos) => this.eventos = eventos,
        error: () => this.errorMsg = 'Error al cargar eventos.'
      });
    }
  }

  cargarAgrupaciones() {
    if (this.userRole === 'ADMINISTRADOR') {
      this.agrupacionesService.getAgrupaciones().subscribe({
        next: (agrupaciones) => this.agrupaciones = agrupaciones,
        error: () => this.errorMsg = 'Error al cargar agrupaciones.'
      });
    } else if (this.userRole === 'POSTULANTE') {
      this.agrupacionesService.getAgrupacionesPorUsuario().subscribe({
        next: (agrupaciones) => this.agrupaciones = agrupaciones,
        error: () => this.errorMsg = 'Error al cargar las agrupaciones.'
      });
    }
  }

  onSubmit(): void {
    if (this.crearUbicacionForm.invalid) {
      this.errorMsg = 'Existen errores en el formulario.';
      this.crearUbicacionForm.markAllAsTouched();
      return;
    }

    const formValue = this.crearUbicacionForm.value;

    const nuevaUbicacion = {
      lugar: formValue.lugar,
      latitud: formValue.latitud,
      longitud: formValue.longitud,
      evento: formValue.evento || null,
      agrupacion: formValue.agrupacion || null
    };

    this.ubicacionesService.crearUbicacion(nuevaUbicacion).subscribe({
      next: () => this.router.navigate(['/ubicaciones']),
      error: (err) => {
        this.errorMsg = err?.error || 'Error al crear la ubicación.';
      }
    });
  }


  cancel(): void {
    this.router.navigate(['/ubicaciones']);
  }

  campoInvalido(campo: string): boolean {
    const control = this.crearUbicacionForm.get(campo);
    return !!(control && control.invalid && control.touched);
  }
}
