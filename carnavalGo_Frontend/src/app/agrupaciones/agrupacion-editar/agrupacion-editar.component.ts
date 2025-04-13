import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AgrupacionesService } from '../services/agrupaciones.service';
import { Agrupacion } from '../models/agrupacion.model';

@Component({
  selector: 'app-agrupacion-editar',
  standalone: false,
  templateUrl: './agrupacion-editar.component.html',
  styleUrl: './agrupacion-editar.component.scss'
})
export class AgrupacionEditarComponent implements OnInit {

  editarForm!: FormGroup;
  errorMsg: string | null = null;
  agrupacionId!: number;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private agrupacionesService: AgrupacionesService
  ) {}

  ngOnInit(): void {
    this.editarForm = this.fb.group({
      agrupacion: ['', Validators.required],
      imagen: [''],
      modalidad: ['', Validators.required],
      autor: ['', Validators.required],
      componentes: [''],
      historia: [''],
      redesSociales: ['']
    });

    this.agrupacionId = Number(this.route.snapshot.paramMap.get('id'));
    this.cargarAgrupacion();
  }

  cargarAgrupacion(): void {
    this.agrupacionesService.getAgrupacion(this.agrupacionId).subscribe({
      next: (agrupacion) => {
        this.editarForm.patchValue(agrupacion);
      },
      error: (err) => {
        this.errorMsg = 'No se pudo cargar la agrupación.';
        console.error(err);
      }
    });
  }

  onSubmit(): void {
    if (this.editarForm.invalid) {
      this.errorMsg = 'Existen errores en el formulario.';
      this.editarForm.markAllAsTouched();
      return;
    }

    const agrupacionEditada: Agrupacion = {
      ...this.editarForm.value,
      id: this.agrupacionId
    };

    this.agrupacionesService.actualizarAgrupacion(this.agrupacionId, agrupacionEditada).subscribe({
      next: () => {
        this.router.navigate(['/agrupaciones', this.agrupacionId]);
      },
      error: (err) => {
        if (err.status === 403) {
          this.errorMsg = err.error || 'No tiene permisos para editar esta agrupación.';
        } else {
          this.errorMsg = err.error || 'Error al actualizar la agrupación.';
        }
      }
    });
  }

  //Si cancelamos nos redirige al detalle de la agrupación
  cancel(): void {
    this.router.navigate(['/agrupaciones/', this.agrupacionId]);
  }

  campoInvalido(campo: string): boolean {
    const control = this.editarForm.get(campo);
    return !!(control && control.invalid && control.touched);
  }
}