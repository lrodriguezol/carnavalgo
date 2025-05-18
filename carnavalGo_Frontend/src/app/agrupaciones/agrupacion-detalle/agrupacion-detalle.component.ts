import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Agrupacion } from '../models/agrupacion.model';
import { AgrupacionesService } from '../services/agrupaciones.service';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-agrupacion-detalle',
  standalone: false,
  templateUrl: './agrupacion-detalle.component.html',
  styleUrl: './agrupacion-detalle.component.scss'
})
export class AgrupacionDetalleComponent implements OnInit {

  agrupacion?: Agrupacion;
  errorMsg: string | null = null;
  userRole: string | null = null;

  constructor( private route: ActivatedRoute, private router: Router, private agrupacionesService: AgrupacionesService, private authService: AuthService) {}

  ngOnInit(): void {
    this.userRole = this.authService.getRol();
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : null;

    if (!id || isNaN(id)) {
      this.errorMsg = 'ID de agrupación no válido.';
      return;
    }

    this.agrupacionesService.getAgrupacion(id).subscribe({
      next: (data) => {
        this.agrupacion = data;
      },
      error: (err) => {
        this.errorMsg = 'No se pudo cargar la agrupación.';
        console.error(err);
      }
    });
  }

  puedeEditarAgrupacion(): boolean {
    if (!this.agrupacion) return false;
  
    if (this.userRole === 'ADMINISTRADOR') return true;
  
    if (this.userRole === 'POSTULANTE') {
      let creadorId: number | null = null;
  
      if (typeof this.agrupacion.creadoPor === 'object' && this.agrupacion.creadoPor !== null) {
        creadorId = (this.agrupacion.creadoPor as any).id;
      } else {
        creadorId = this.agrupacion.creadoPor as number;
      }

      const userId = this.authService.getUser()?.id;
      return creadorId === userId;
    }
  
    return false;
  }
  

  //Si pulsamos editar nos lleva a la pantalla de edición con los datos de la agrupación
  editarAgrupacion(): void {
    if (this.agrupacion?.id) {
      this.router.navigate(['/agrupaciones/editar-agrupacion', this.agrupacion.id]);
    }
  }

  anadirEncuesta(): void {
    
  }
}