import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: 'app-editar-perfil',
  standalone: false,
  templateUrl: './editar-perfil.component.html',
  styleUrl: './editar-perfil.component.scss'
})

export class EditarPerfilComponent {

  editarForm!: FormGroup;
  errorMsg: string | null = null;
  esAdmin: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private usuariosService: UsuariosService) {}

  ngOnInit(): void {
    
    this.editarForm = this.fb.group({
      username: [{ value: '', disabled: true }, Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      nombre: ['', Validators.required],
      apellido1: ['', Validators.required],
      apellido2: [''],
      telefono: ['', Validators.pattern(/^[0-9]{9}$/)],
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      rol: ['', Validators.required]
    });

    const user = this.authService.getUser();
    if (user) {

      this.esAdmin = user.rol === 'ADMINISTRADOR';

      //Eliminamos el password para la visualización
      this.editarForm.patchValue({ ...user, password: '' });
      this.editarForm.get('rol')?.disable();
    }
  }
    
  onSubmit(): void {

      if (this.editarForm.invalid) {       
        this.errorMsg = 'Existen errores en el formulario.';
        this.editarForm.markAllAsTouched();
        return;
      }
    
      const usuario = this.authService.getUser();
    
      if (!usuario || !usuario.id) {
        console.error('No se ha podido obtener el usuario actual.');
        this.errorMsg = 'No se ha podido obtener el usuario actual.';
        return;
      }
    
      const rawValues = this.editarForm.getRawValue();

      const datosActualizados = {
        ...rawValues,
        rol: rawValues.rol?.toUpperCase() ?? ''
      };
    
      this.usuariosService.updateUsuario(usuario.id, datosActualizados).subscribe({
        next: (res) => {
          console.log('Perfil actualizado con éxito:', res);
          this.authService.saveUser(res); // Actualiza el usuario almacenado
          this.router.navigate(['/']); 
        },
        error: (err) => {
          console.error('Error al actualizar usuario:', err);
          this.errorMsg = err?.error || 'Error al actualizar el perfil.';
        }
      });
    }

  //Si pulsamos cancelar redirige a la Home
  cancel(): void {
    this.router.navigate(['/']);
  }

  campoInvalido(campo: string): boolean {
    const control = this.editarForm.get(campo);
    return !!(control && control.invalid && control.touched);
  }
}
