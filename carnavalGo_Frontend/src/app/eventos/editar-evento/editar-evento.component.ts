import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventosService } from '../services/eventos.service';
import { Evento } from '../models/evento.model';
import { Agrupacion } from '../../agrupaciones/models/agrupacion.model';
import { AgrupacionesService } from '../../agrupaciones/services/agrupaciones.service';

@Component({
  selector: 'app-editar-evento',
  standalone: false,
  templateUrl: './editar-evento.component.html',
  styleUrl: './editar-evento.component.scss'
})
export class EditarEventoComponent implements OnInit {

  editarEventoForm!: FormGroup;
  errorMsg: string | null = null;
  eventoId!: number;
  agrupaciones: Agrupacion[] = [];

  constructor( private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private eventosService: EventosService,
    private agrupacionesService: AgrupacionesService) {}

    ngOnInit(): void {
      this.eventoId = Number(this.route.snapshot.paramMap.get('id'));
  
      this.editarEventoForm = this.fb.group({
        titulo: ['', Validators.required],
        fecha: ['', Validators.required],
        hora: [''],
        localizacion: [''],
        agrupacion: ['']
      });
  
      this.eventosService.obtenerEventoPorId(this.eventoId).subscribe({
        next: (evento) => {
          this.editarEventoForm.patchValue({
            ...evento,
            hora: evento.hora?.slice(0, 5) || ''
          });
        },
        error: (err) => {
          this.errorMsg = err?.error || 'No se pudo cargar el evento.';
        }
      });
  
      this.agrupacionesService.getAgrupaciones().subscribe({
        next: (res) => this.agrupaciones = res,
        error: () => this.errorMsg = 'Error al cargar agrupaciones.'
      });
  }

  onSubmit(): void {
    if (this.editarEventoForm.invalid) {
      this.errorMsg = 'Existen errores en el formulario.';
      this.editarEventoForm.markAllAsTouched();
      return;
    }

    const formValue = this.editarEventoForm.value;
    const eventoActualizado: Evento = {
      id: this.eventoId,
      titulo: formValue.titulo,
      fecha: formValue.fecha,
      hora: formValue.hora || null,
      localizacion: formValue.localizacion || null,
      agrupacion: formValue.agrupacion ? Number(formValue.agrupacion) : null
    };

    this.eventosService.actualizarEvento(this.eventoId, eventoActualizado).subscribe({
      next: () => this.router.navigate(['/eventos']),
      error: (err: any) => {
        this.errorMsg = err?.error || 'Error al actualizar el evento.';
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/eventos']);
  }

  campoInvalido(campo: string): boolean {
    const control = this.editarEventoForm.get(campo);
    return !!(control && control.invalid && control.touched);
  }
}