import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isBrowser: boolean;
  private loggedIn = new BehaviorSubject<boolean>(this.isLoggedIn());
  public isLoggedIn$ = this.loggedIn.asObservable();
  private usernameSubject = new BehaviorSubject<string | null>(this.getUsername());
  public username$ = this.usernameSubject.asObservable();

  constructor(private http: HttpClient, private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  
    if (this.isBrowser && this.getToken()) {
      const user = this.getUser();
  
      if (user) {
        // Usuario guardado previamente
        this.loggedIn.next(true);
        this.usernameSubject.next(user.username);
      } else {
        const payload = JSON.parse(atob(this.getToken()!.split('.')[1]));
        const reconstructedUser = {
          username: payload.sub,
          rol: payload.rol
        };
  
        this.saveUser(reconstructedUser);
        this.loggedIn.next(true);
        this.usernameSubject.next(reconstructedUser.username);
      }
    }
  }

  login(credentials: { username: string; password: string }) {
    return this.http.post<{ token: string; rol: string; usuario: any }>(`${environment.apiUrl}/auth/login`, credentials).pipe(
      tap(res => {
        if (this.isBrowser) {
          localStorage.setItem('jwt', res.token);
          localStorage.setItem('usuario', JSON.stringify(res.usuario));

          this.loggedIn.next(true);
          this.usernameSubject.next(res.usuario.username);
        }
      })
    );
  }

  getToken(): string | null {
    if (this.isBrowser) {
      return localStorage.getItem('jwt');
    }
    return null;
  }

  saveToken(token: string) {
    if (this.isBrowser) {
      localStorage.setItem('jwt', token);
    }
  }

  saveUser(user: any) {
    if (this.isBrowser) {
      localStorage.setItem('usuario', JSON.stringify(user));
    }
  }

  getUser(): any {
    if (this.isBrowser) {
      const json = localStorage.getItem('usuario');
      return json ? JSON.parse(json) : null;
    }
    return null;
  }

  logout() {
    if (this.isBrowser) {
      localStorage.removeItem('jwt');
      localStorage.removeItem('usuario');
    }

    this.loggedIn.next(false);
    this.usernameSubject.next(null);

    this.router.navigate(['/auth/login']);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getRol(): string | null {
    const token = this.getToken();
    if (!token) return null;

    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.rol;
  }

  getUsername(): string | null {
    const token = this.getToken();
    if (!token) return null;

    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.sub;
  }
}
