import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AgrupacionesService } from '../services/agrupaciones.service';
import { Agrupacion } from '../models/agrupacion.model';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-agrupacion-crear',
  standalone: false,
  templateUrl: './agrupacion-crear.component.html',
  styleUrl: './agrupacion-crear.component.scss'
})

export class AgrupacionCrearComponent {

  crearForm: FormGroup;
  errorMsg: string | null = null;

  constructor(private fb: FormBuilder,private router: Router, private agrupacionesService: AgrupacionesService, private authService: AuthService) {
    this.crearForm = this.fb.group({
      agrupacion: ['', Validators.required],
      imagen: [''],
      modalidad: ['', Validators.required],
      autor: ['', Validators.required],
      componentes: [''],
      historia: [''],
      redesSociales: ['']
    });
  }

  onSubmit(): void {
    if (this.crearForm.invalid) {
      this.errorMsg = 'Existen errores en el formulario.';
      this.crearForm.markAllAsTouched();
      return;
    }

    const agrupacion: Agrupacion = {
      ...this.crearForm.value
    };

    this.agrupacionesService.crearAgrupacion(agrupacion).subscribe({
      next: () => {
        this.router.navigate(['/agrupaciones']);
      },
      error: (err) => {
        if (err.status === 403) {
          this.errorMsg = err.error || 'No tiene permisos para crear agrupaciones.';
        } else {
          this.errorMsg = err.error || 'Error inesperado al crear la agrupación.';
        }
      }
    });
  }

  //Si pulsamos cancelar redirige a la pantalla de Agrupaciones
  cancel(): void {
    this.router.navigate(['/agrupaciones']);
  }

  campoInvalido(campo: string): boolean {
    const control = this.crearForm.get(campo);
    return !!(control && control.invalid && control.touched);
  }
}