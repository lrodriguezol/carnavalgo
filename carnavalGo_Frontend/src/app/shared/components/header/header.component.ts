import { Component, ElementRef, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent implements OnInit {
  usuarioLogado: any = null;
  menuAbierto = false;
  isLoggedIn = false;
  username: string | null = null;

  constructor(private authService: AuthService, private router: Router, private eRef: ElementRef) {}

  ngOnInit(): void {
    this.authService.username$.subscribe(username => {
      this.username = username;
    });

    this.authService.isLoggedIn$.subscribe(isLogged => {
      this.isLoggedIn = isLogged;
    });
  }

  toggleMenu(): void {
    this.menuAbierto = !this.menuAbierto;
  }

  editarPerfil(): void {
    this.menuAbierto = false;
    this.router.navigate(['/usuarios/editar-perfil']);
  }

  logout(): void {
    this.authService.logout();
    this.menuAbierto = false;
  }

  @HostListener('document:click', ['$event'])
  clickFuera(event: MouseEvent) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.menuAbierto = false;
    }
  }
}
