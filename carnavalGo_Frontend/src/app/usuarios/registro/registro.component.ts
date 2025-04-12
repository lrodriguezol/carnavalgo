import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-registro',
  standalone: false,
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent {

  registroForm: FormGroup;
  errorMsg: string | null = null;
  roles: string[] = ['aficionado', 'postulante', 'administrador'];

  constructor(private fb: FormBuilder, private router: Router,private usuarioService: UsuarioService) {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido1: ['', Validators.required],
      apellido2: [''],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.pattern(/^[0-9]{9}$/)],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rol: ['aficionado', Validators.required]
    });
  }

  onSubmit() {

    if (this.registroForm.invalid) {
      this.errorMsg = 'Existen errores en el formulario.';
      this.registroForm.markAllAsTouched();
      return;
    }
  
    const usuario = {
      ...this.registroForm.value,
      rol: this.registroForm.value.rol.toUpperCase()
    };
  
    this.usuarioService.registrar(usuario).subscribe({
      next: (res) => {
        this.router.navigate(['/auth/login'], { queryParams: { registrado: 'true' } });
      },
      error: (err) => {
        this.errorMsg = err.error || 'Error inesperado al registrar.';
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/']);
  }

  campoInvalido(campo: string): boolean {
    const control = this.registroForm.get(campo);
    return !!(control && control.invalid && control.touched);
  }
}