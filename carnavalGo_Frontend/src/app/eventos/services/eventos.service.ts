import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Evento } from '../models/evento.model';

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  private apiUrl = `${environment.apiUrl}/eventos`;

  constructor(private http: HttpClient) {}

  crearEvento(evento: Evento): Observable<Evento> {
    return this.http.post<Evento>(this.apiUrl, evento);
  }

  obtenerEventos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.apiUrl);
  }

  obtenerEventoPorId(id: number): Observable<Evento> {
    return this.http.get<Evento>(`${this.apiUrl}/${id}`);
  }

  actualizarEvento(id: number, evento: Evento): Observable<Evento> {
    return this.http.put<Evento>(`${this.apiUrl}/${id}`, evento);
  }

  eliminarEvento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
