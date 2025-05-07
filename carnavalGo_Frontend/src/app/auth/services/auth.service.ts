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
        this.loggedIn.next(true);
        this.usernameSubject.next(user.username);
      } else {
        try {
          const payload = JSON.parse(atob(this.getToken()!.split('.')[1]));
          const reconstructedUser = {username: payload.sub, rol: payload.rol,id: payload.idUsuario};

          this.saveUser(reconstructedUser);
          this.loggedIn.next(true);
          this.usernameSubject.next(reconstructedUser.username);
        } catch (e) {
          this.logout();
        }
      }
    }
  }

  login(credentials: { username: string; password: string }) {
    return this.http.post<{ token: string; rol: string; usuario: any }>(`${environment.apiUrl}/auth/login`, credentials).pipe(
      tap(res => {
        if (this.isBrowser) {
          sessionStorage.setItem('jwt', res.token);
          sessionStorage.setItem('usuario', JSON.stringify(res.usuario));

          this.loggedIn.next(true);
          this.usernameSubject.next(res.usuario.username);
        }
      })
    );
  }

  getToken(): string | null {
    if (this.isBrowser) {
      return sessionStorage.getItem('jwt');
    }
    return null;
  }

  saveToken(token: string) {
    if (this.isBrowser) {
      sessionStorage.setItem('jwt', token);
    }
  }

  saveUser(user: any) {
    if (this.isBrowser) {
      sessionStorage.setItem('usuario', JSON.stringify(user));
    }
  }

  getUser(): any {
    if (this.isBrowser) {
      const json = sessionStorage.getItem('usuario');
      return json ? JSON.parse(json) : null;
    }
    return null;
  }

  getUserId(): number | null {
    const user = this.getUser();
    return user?.id || null;
  }

  logout() {
    if (this.isBrowser) {
      sessionStorage.removeItem('jwt');
      sessionStorage.removeItem('usuario');
    }

    this.loggedIn.next(false);
    this.usernameSubject.next(null);
    this.router.navigate(['/']);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getRol(): string | null {
    const token = this.getToken();
    if (!token) return null;
  
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.rol?.toUpperCase();
    } catch (e) {
      return null;
    }
  }

  getUsername(): string | null {
    const token = this.getToken();
    if (!token) return null;

    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.sub;
  }
}