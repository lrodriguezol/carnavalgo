import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Evento } from '../models/evento.model';
import { EventosService } from '../services/eventos.service';
import { Agrupacion } from '../../agrupaciones/models/agrupacion.model';
import { AgrupacionesService } from '../../agrupaciones/services/agrupaciones.service';

@Component({
  selector: 'app-crear-evento',
  standalone: false,
  templateUrl: './crear-evento.component.html',
  styleUrl: './crear-evento.component.scss'
})
export class CrearEventoComponent implements OnInit {

  crearEventoForm!: FormGroup;
  errorMsg: string | null = null;
  agrupaciones: Agrupacion[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private eventosService: EventosService,
    private agrupacionesService: AgrupacionesService
  ) {}

  ngOnInit(): void {
    this.crearEventoForm = this.fb.group({
      titulo: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: [''],
      localizacion: [''],
      agrupacion: ['']
    });

    this.agrupacionesService.getAgrupaciones().subscribe({
      next: (res) => this.agrupaciones = res,
      error: () => this.errorMsg = 'Error al cargar agrupaciones.'
    });
  }

  onSubmit(): void {
    if (this.crearEventoForm.invalid) {
      this.errorMsg = 'Existen errores en el formulario.';
      this.crearEventoForm.markAllAsTouched();
      return;
    }

    const formValue = this.crearEventoForm.value;

    const nuevoEvento: Evento = {
      titulo: formValue.titulo,
      fecha: formValue.fecha,
      hora: formValue.hora || null,
      localizacion: formValue.localizacion || null,
      agrupacion: formValue.agrupacion ? Number(formValue.agrupacion) : null
    };

    this.eventosService.crearEvento(nuevoEvento).subscribe({
      next: () => this.router.navigate(['/eventos']),
      error: (err: any) => {
        this.errorMsg = err?.error || 'Error al crear el evento.';
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/eventos']);
  }

  campoInvalido(campo: string): boolean {
    const control = this.crearEventoForm.get(campo);
    return !!(control && control.invalid && control.touched);
  }
}