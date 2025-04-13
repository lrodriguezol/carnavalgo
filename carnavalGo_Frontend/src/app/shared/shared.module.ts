import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { PoliticaCookiesComponent } from './pages/politica-cookies/politica-cookies.component';
import { PoliticaPrivacidadComponent } from './pages/politica-privacidad/politica-privacidad.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { AccesoRestringidoComponent } from './pages/acceso-restringido/acceso-restringido.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, PoliticaCookiesComponent, PoliticaPrivacidadComponent, ContactoComponent, AccesoRestringidoComponent],
  imports: [CommonModule, RouterModule],
  exports: [HeaderComponent, FooterComponent, AccesoRestringidoComponent]
})
export class SharedModule {}
