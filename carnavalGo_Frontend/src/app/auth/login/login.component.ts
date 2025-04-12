import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username = '';
  password = '';
  errorMsg = '';
  mensajeExito: string | null = null;

  constructor(private authService: AuthService, private router: Router,private route: ActivatedRoute) {}

    ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
        if (params['registrado'] === 'true') {
          this.mensajeExito = 'Usuario registrado correctamente.';
        }
      });
    }
  
    onLogin() {
      
      this.errorMsg = ''; 
      this.authService.login({ username: this.username, password: this.password }).subscribe({
        next: (res) => {
          this.authService.saveToken(res.token);
          this.authService.saveUser(res.usuario);
           //Redirige hasta la Home si el usuario se ha logado correctamente
          this.router.navigate(['/']);
        },
        error: () => {
          this.errorMsg = 'Usuario o contraseña incorrectos';
        }
      });
    }
}
