package com.tfm.carnavalgo.auth.controller;

import com.tfm.carnavalgo.auth.model.AuthResponse;
import com.tfm.carnavalgo.auth.model.LoginRequest;
import com.tfm.carnavalgo.security.JwtService;
import com.tfm.carnavalgo.usuario.model.Usuario;
import com.tfm.carnavalgo.usuario.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest loginRequest) {
        Optional<Usuario> usuario = usuarioService.getUsuarioPorUsername(loginRequest.getUsername());

        if (usuario.isEmpty()) {
            System.out.println("Usuario no encontrado: " + loginRequest.getUsername());
        }

        if (usuario.isPresent() && passwordEncoder.matches(loginRequest.getPassword(), usuario.get().getPassword())) {
            System.out.println("Usuario autenticado: " + loginRequest.getUsername());
            String token = jwtService.generateToken(usuario.get(), usuario.get().getId());
            return ResponseEntity.ok(new AuthResponse(token, usuario.get().getRol().toString()));
        }

        System.out.println("Fallo en la autenticación para usuario: " + loginRequest.getUsername());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}
