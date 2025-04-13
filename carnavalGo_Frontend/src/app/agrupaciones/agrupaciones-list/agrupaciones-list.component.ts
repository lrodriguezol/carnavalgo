import { Component, OnInit } from '@angular/core';
import { Agrupacion } from '../models/agrupacion.model';
import { Router } from '@angular/router';
import { AgrupacionesService } from '../services/agrupaciones.service';
import { AuthService } from '../../auth/services/auth.service'; 


@Component({
  selector: 'app-agrupaciones-list',
  standalone: false,
  templateUrl: './agrupaciones-list.component.html',
  styleUrl: './agrupaciones-list.component.scss'
})

export class AgrupacionesListComponent implements OnInit {

  agrupaciones: Agrupacion[] = [];
  filtradas: Agrupacion[] = [];
  paginaActual = 1;
  elementosPorPagina = 6;
  totalPaginas = 0;
  busqueda = '';
  errorMsg: string | null = null;
  userRole: string | null = null;

  constructor(private router: Router, private agrupacionesService: AgrupacionesService, private authService: AuthService) {}

  ngOnInit(): void {
    this.userRole = this.authService.getRol();
    this.agrupacionesService.getAgrupaciones().subscribe({
      next: (data) => {
        this.agrupaciones = data;
        this.filtrarYPaginar();
      },
      error: (err) => {
        console.error(err);
        this.errorMsg = 'No se pudieron cargar las agrupaciones.';
      }
    });
  }

  filtrarYPaginar(): void {
    const filtradas = this.busqueda? this.agrupaciones.filter(a =>
          a.agrupacion?.toLowerCase().includes(this.busqueda.toLowerCase()) ||
          a.autor?.toLowerCase().includes(this.busqueda.toLowerCase()) ||
          a.modalidad?.toLowerCase().includes(this.busqueda.toLowerCase())
        ): this.agrupaciones;

    this.totalPaginas = Math.ceil(filtradas.length / this.elementosPorPagina);
    const inicio = (this.paginaActual - 1) * this.elementosPorPagina;
    const fin = inicio + this.elementosPorPagina;
    this.filtradas = filtradas.slice(inicio, fin);
  }

  cambiarPagina(pagina: number): void {
    this.paginaActual = pagina;
    this.filtrarYPaginar();
  }

  buscar(): void {
    this.paginaActual = 1;
    this.filtrarYPaginar();
  }

  //redirige a Crear agrupacion
  irACrearAgrupacion(): void {
    this.router.navigate(['/agrupaciones/crear-agrupacion']);
  }
}