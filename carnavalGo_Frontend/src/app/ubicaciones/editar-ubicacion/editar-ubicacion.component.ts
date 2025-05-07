import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UbicacionesService } from '../services/ubicaciones.service';
import { AgrupacionesService } from '../../agrupaciones/services/agrupaciones.service';
import { EventosService } from '../../eventos/services/eventos.service';
import { AuthService } from '../../auth/services/auth.service';
import { Ubicacion } from '../models/ubicacion.model';
import { Agrupacion } from '../../agrupaciones/models/agrupacion.model';
import { Evento } from '../../eventos/models/evento.model';

@Component({
  selector: 'app-editar-ubicacion',
  standalone: false,
  templateUrl: './editar-ubicacion.component.html',
  styleUrl: './editar-ubicacion.component.scss'
})
export class EditarUbicacionComponent implements OnInit {

  editarUbicacionForm!: FormGroup;
  errorMsg: string | null = null;
  ubicacionId!: number;
  agrupaciones: Agrupacion[] = [];
  eventos: Evento[] = [];
  userRole: string | null = null;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private ubicacionesService: UbicacionesService, 
    private agrupacionesService: AgrupacionesService, private eventosService: EventosService, private authService: AuthService) {}

    ngOnInit(): void {
      this.userRole = this.authService.getRol();
      this.ubicacionId = Number(this.route.snapshot.paramMap.get('id'));
  
      this.editarUbicacionForm = this.fb.group({
        lugar: ['', Validators.required],
        latitud: ['', Validators.required],
        longitud: ['', Validators.required],
        evento: [''],
        agrupacion: ['']
      });
  
      this.cargarEventos();
      this.cargarAgrupaciones();
      this.cargarUbicacion();
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
          error: () => this.errorMsg = 'Error al cargar tus agrupaciones.'
        });
      }
    }
  
    cargarUbicacion() {
      this.ubicacionesService.obtenerUbicacionPorId(this.ubicacionId).subscribe({
        next: (ubicacion) => {
          this.editarUbicacionForm.patchValue({
            lugar: ubicacion.lugar,
            latitud: ubicacion.latitud,
            longitud: ubicacion.longitud,
            evento: ubicacion.evento ?? '',
            agrupacion: ubicacion.agrupacion ?? ''
          });
        },
        error: () => this.errorMsg = 'Error al cargar los datos de la ubicación.'
      });
    }

    onSubmit(): void {
      if (this.editarUbicacionForm.invalid) {
        this.errorMsg = 'Existen errores en el formulario.';
        this.editarUbicacionForm.markAllAsTouched();
        return;
      }
  
      const formValue = this.editarUbicacionForm.value;
  
      const ubicacionActualizada: Ubicacion = {
        id: this.ubicacionId,
        lugar: formValue.lugar,
        latitud: formValue.latitud,
        longitud: formValue.longitud,
        evento: formValue.evento ? Number(formValue.evento) : null,
        agrupacion: formValue.agrupacion ? Number(formValue.agrupacion) : null
      };
  
      this.ubicacionesService.actualizarUbicacion(this.ubicacionId, ubicacionActualizada).subscribe({
        next: () => this.router.navigate(['/ubicaciones']),
        error: (err) => {
          this.errorMsg = err?.error || 'Error al actualizar la ubicación.';
        }
      });
    }
  

  cancel(): void {
    this.router.navigate(['/ubicaciones']);
  }

  campoInvalido(campo: string): boolean {
    const control = this.editarUbicacionForm.get(campo);
    return !!(control && control.invalid && control.touched);
  }
}