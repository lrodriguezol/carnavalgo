import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UbicacionesService } from '../../ubicaciones/services/ubicaciones.service';
import { AgrupacionesService } from '../../agrupaciones/services/agrupaciones.service';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private ubicacionesService: UbicacionesService, private agrupacionesService: AgrupacionesService) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {

    const expectedRoles: string[] = route.data['roles'];
    const userRol = this.authService.getRol();
    const isLoggedIn = this.authService.isLoggedIn();

    //Si el usuario no está logado redirige al login
    if (!isLoggedIn) {
      return of(this.router.parseUrl('/auth/login'));
    }

    if (!userRol || !expectedRoles.includes(userRol)) {
      return of(this.router.parseUrl('/acceso-restringido'));
    }

    const userId = this.authService.getUserId();

    //Controlar que un usuario postulante no pueda editar la ubicacion de una agrupación que no es suya o de un evento creado por Admin
    const isRutaEdicionUbicacion = route.routeConfig?.path?.includes('editar-ubicacion/:id');

    if (isRutaEdicionUbicacion && userRol === 'POSTULANTE') {
      const ubicacionId = Number(route.paramMap.get('id'));
      const userId = this.authService.getUserId();
    
      return this.ubicacionesService.obtenerUbicacionPorId(ubicacionId).pipe(
        switchMap(ubicacion => {

          if (ubicacion.evento) {
            return of(false);
          }
          
          if (!ubicacion?.agrupacion) {
            return of(true); 
          }
    
          return this.agrupacionesService.getAgrupacion(ubicacion.agrupacion).pipe(
            map(agrupacion => {
              const creadorId = (agrupacion.creadoPor as any)?.id ?? agrupacion.creadoPor;
              return Number(creadorId) === Number(userId);
            }),
            catchError(() => of(false))
          );
        }),
        map(permitted => (permitted ? true : this.router.parseUrl('/acceso-restringido')))
      );
    }

    //Controlar que si el usuario postulante logado no es creador de la agrupacion no pueda editarla
    const isRutaEdicionAgrupacion = route.routeConfig?.path?.includes('editar-agrupacion/:id');

    if (isRutaEdicionAgrupacion && userRol === 'POSTULANTE') {
      const agrupacionId = Number(route.paramMap.get('id'));
      const userId = this.authService.getUserId();
    
      return this.agrupacionesService.getAgrupacion(agrupacionId).pipe(
        map(agrupacion => {
          const creadorId = (agrupacion.creadoPor as any)?.id ?? agrupacion.creadoPor;
          return creadorId === userId;
        }),
        catchError(() => of(false)),
        map(permitted => (permitted ? true : this.router.parseUrl('/acceso-restringido')))
      );
    }
    return of(true);
  }
}
