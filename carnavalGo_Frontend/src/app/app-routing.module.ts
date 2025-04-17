import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PoliticaCookiesComponent } from './shared/pages/politica-cookies/politica-cookies.component';
import { PoliticaPrivacidadComponent } from './shared/pages/politica-privacidad/politica-privacidad.component';
import { ContactoComponent } from './shared/pages/contacto/contacto.component';
import { AccesoRestringidoComponent } from './shared/pages/acceso-restringido/acceso-restringido.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'politica-cookies', component: PoliticaCookiesComponent },
  { path: 'politica-privacidad', component: PoliticaPrivacidadComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'acceso-restringido', component: AccesoRestringidoComponent },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  { path: 'agrupaciones', loadChildren: () => import('./agrupaciones/agrupaciones.module').then(m => m.AgrupacionesModule)},
  { path: 'usuarios', loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsuariosModule)},
  { path: 'eventos', loadChildren: () => import('./eventos/eventos.module').then(m => m.EventosModule)},
  { path: 'ubicaciones', loadChildren: () => import('./ubicaciones/ubicaciones.module').then(m => m.UbicacionesModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
  