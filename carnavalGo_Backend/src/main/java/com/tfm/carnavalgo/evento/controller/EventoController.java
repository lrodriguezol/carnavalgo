package com.tfm.carnavalgo.evento.controller;

import com.tfm.carnavalgo.evento.model.Evento;
import com.tfm.carnavalgo.evento.service.EventoService;
import com.tfm.carnavalgo.usuario.model.Usuario;
import com.tfm.carnavalgo.usuario.model.Rol;
import com.tfm.carnavalgo.usuario.repository.UsuarioRepository;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/eventos")
@CrossOrigin(origins = "*")
public class EventoController {

    @Autowired
    private EventoService service;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping
    public List<Evento> getEventos() {
        return service.getAllEventos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Evento> getEventoPorId(@PathVariable Long id) {
        return service.getEvento(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> saveEvento(@RequestBody Evento evento, @AuthenticationPrincipal UserDetails userDetails) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findByUsername(userDetails.getUsername());

        if (usuarioOpt.isEmpty()) {
            return ResponseEntity.status(403).body("Usuario no válido.");
        }

        Usuario usuario = usuarioOpt.get();

        if (usuario.getRol() != Rol.ADMINISTRADOR) {
            return ResponseEntity.status(403).body("No tiene permisos para crear eventos.");
        }

        evento.setCreadoPor(usuario.getId());

        Evento saved = service.saveEvento(evento);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateEvento(@PathVariable Long id, @RequestBody Evento eventoActualizado, @AuthenticationPrincipal UserDetails userDetails) {
        
        Optional<Usuario> usuarioOpt = usuarioRepository.findByUsername(userDetails.getUsername());
        if (usuarioOpt.isEmpty()) {
            return ResponseEntity.status(403).body("Usuario no válido.");
        }
    
        try {
            Evento actualizado = service.updateEvento(id, eventoActualizado, usuarioOpt.get());
            if (actualizado == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(actualizado);
        } catch (AccessDeniedException ex) {
            return ResponseEntity.status(403).body("No puede editar este evento.");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteEvento(@PathVariable Long id) {
        service.deleteEvento(id);
        return ResponseEntity.noContent().build();
    }
}