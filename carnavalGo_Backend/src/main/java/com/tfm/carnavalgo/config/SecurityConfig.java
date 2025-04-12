package com.tfm.carnavalgo.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.tfm.carnavalgo.security.JwtAuthenticationFilter;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final AuthenticationProvider authProvider;

   @Bean
public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    return http
        .csrf(csrf -> csrf.disable())
        .cors(cors -> cors.configurationSource(corsConfigurationSource()))
        .authorizeHttpRequests(auth -> auth

            // Endpoints públicos (accesibles sin autenticación)
            .requestMatchers(HttpMethod.GET, "/api/**").permitAll()
            .requestMatchers("/api/auth/**").permitAll()
            .requestMatchers(HttpMethod.POST, "/api/usuarios").permitAll()
            .requestMatchers("/api/usuarios/create").permitAll()

            // Permisos Agrupaciones
            .requestMatchers(HttpMethod.POST, "/api/agrupaciones/**").hasAnyAuthority("POSTULANTE", "ADMINISTRADOR")
            .requestMatchers(HttpMethod.PUT, "/api/agrupaciones/**").hasAnyAuthority("POSTULANTE", "ADMINISTRADOR")

            // Permisos Eventos
            .requestMatchers(HttpMethod.POST, "/api/eventos/**").hasAnyAuthority("ADMINISTRADOR")
            .requestMatchers(HttpMethod.PUT, "/api/eventos/**").hasAuthority("ADMINISTRADOR")

            // Permisos Ubicaciones
            .requestMatchers(HttpMethod.POST, "/api/ubicaciones/**").hasAnyAuthority("POSTULANTE", "ADMINISTRADOR")
            .requestMatchers(HttpMethod.PUT, "/api/ubicaciones/**").hasAnyAuthority("POSTULANTE", "ADMINISTRADOR")

            // Permisos Encuestas
            .requestMatchers(HttpMethod.POST, "/api/encuestas/**").hasAuthority("ADMINISTRADOR")

            // Permisos Comentarios
            .requestMatchers(HttpMethod.POST, "/api/comentarios/**").hasAnyAuthority("AFICIONADO", "ADMINISTRADOR")
            .requestMatchers(HttpMethod.DELETE, "/api/comentarios/**").hasAuthority("ADMINISTRADOR")

            // Para cualquier otra petición se requiere autenticación
            .anyRequest().authenticated()
        )
        .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)).authenticationProvider(authProvider)
        .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class).build();
}

    private UrlBasedCorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:4200"));  // Cambiar en PRO por la url de netlify donde esta desplegado
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}


