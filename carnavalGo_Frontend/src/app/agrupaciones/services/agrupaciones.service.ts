import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Agrupacion } from '../models/agrupacion.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AgrupacionesService {

    private apiUrl = `${environment.apiUrl}/agrupaciones`;

    constructor(private http: HttpClient) {}

    getAgrupaciones(): Observable<Agrupacion[]> {
        return this.http.get<Agrupacion[]>(`${this.apiUrl}`);
    }

    crearAgrupacion(agrupacion: Agrupacion): Observable<Agrupacion> {
        return this.http.post<Agrupacion>(this.apiUrl, agrupacion);
    }

    getAgrupacion(id: number): Observable<Agrupacion> {
        return this.http.get<Agrupacion>(`${this.apiUrl}/${id}`);
    }
    
    actualizarAgrupacion(id: number, agrupacion: Agrupacion): Observable<Agrupacion> {
        return this.http.put<Agrupacion>(`${this.apiUrl}/${id}`, agrupacion);
    }

    getAgrupacionesPorUsuario(): Observable<Agrupacion[]> {
        return this.http.get<Agrupacion[]>(`${this.apiUrl}/user`);
      }
}
