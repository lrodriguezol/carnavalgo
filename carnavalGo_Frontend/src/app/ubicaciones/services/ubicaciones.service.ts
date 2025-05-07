import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Ubicacion } from '../models/ubicacion.model';

@Injectable({
  providedIn: 'root'
})
export class UbicacionesService {

   private apiUrl = `${environment.apiUrl}/ubicaciones`; 

  constructor(private http: HttpClient) {}

  obtenerUbicaciones(): Observable<any[]> {
    return this.http.get<Ubicacion[]>(this.apiUrl);
  }

  obtenerUbicacionPorId(id: number): Observable<Ubicacion> {
    return this.http.get<Ubicacion>(`${this.apiUrl}/${id}`);
  }

  crearUbicacion(ubicacion: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, ubicacion);
  }

  actualizarUbicacion(id: number, ubicacion: Ubicacion): Observable<Ubicacion> {
    return this.http.put<Ubicacion>(`${this.apiUrl}/${id}`, ubicacion);
  }
}
