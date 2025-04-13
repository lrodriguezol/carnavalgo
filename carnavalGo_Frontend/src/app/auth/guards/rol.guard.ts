import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RolGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {

    const expectedRoles: string[] = route.data['roles'];
    const userRol = this.authService.getRol();
    const isLoggedIn = this.authService.isLoggedIn();

    //Si el usuario no está logado redirige al login
    if (!isLoggedIn) {
      return this.router.parseUrl('/auth/login');
    }

    if (userRol && expectedRoles.includes(userRol)) {
      return true;
    }

    //Si el usuario está logado pero no tiene el rol requerido redirige a la página de acceso restringido
    return this.router.parseUrl('/acceso-restringido');
  }
}
