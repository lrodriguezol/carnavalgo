import { Component, OnInit } from '@angular/core';
import { Map, Marker } from 'maplibre-gl';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-ubicaciones',
  standalone: false,
  templateUrl: './ubicaciones.component.html',
  styleUrl: './ubicaciones.component.scss'
})

export class UbicacionesComponent implements OnInit {
  style = 'https://tiles.stadiamaps.com/styles/osm_bright.json';
  center: [number, number] = [-6.2925, 36.5297]; //Coordenadas Cádiz Centro
  zoom = 18;
  userRole: string | null = null;
  ubicacionSeleccionada: any = null;

  constructor(private authService: AuthService) {}

  //Datos mockeados para pruebas
  ubicaciones = [
    {
      id: 1,
      lugar: 'Calle Ancha',
      latitud: '36.5312',
      longitud: '-6.2991',
      evento: null,
      agrupacion: null
    },
    {
      id: 2,
      lugar: 'Plaza de San Juan de Dios',
      latitud: '36.5305',
      longitud: '-6.2936',
      evento: null,
      agrupacion: null
    }
  ];

  ngOnInit(): void {
    this.userRole = this.authService.getRol();
  }

  seleccionarUbicacion(ubicacion: any) {
    this.ubicacionSeleccionada = ubicacion;
  }

  editarUbicacion() {
    if (this.ubicacionSeleccionada) {
      console.log('Editar ubicación:', this.ubicacionSeleccionada);
    }
  }
}