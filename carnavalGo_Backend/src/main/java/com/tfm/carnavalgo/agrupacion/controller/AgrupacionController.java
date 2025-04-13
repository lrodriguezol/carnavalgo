package com.tfm.carnavalgo.agrupacion.controller;
import com.tfm.carnavalgo.agrupacion.model.Agrupacion;
import com.tfm.carnavalgo.agrupacion.service.AgrupacionService;
import com.tfm.carnavalgo.usuario.model.Rol;
import com.tfm.carnavalgo.usuario.model.Usuario;
import com.tfm.carnavalgo.usuario.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.AccessDeniedException;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/agrupaciones")
@CrossOrigin(origins = "*")
public class AgrupacionController {

    @Autowired
    private AgrupacionService service;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping
    public List<Agrupacion> getAgrupaciones() {
        return service.getAllAgrupaciones();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Agrupacion> getAgrupacionPorId(@PathVariable Long id) {
        return service.getAgrupacion(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> saveAgrupacion(@RequestBody Agrupacion agrupacion, @AuthenticationPrincipal UserDetails userDetails) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findByUsername(userDetails.getUsername());

        if (usuarioOpt.isEmpty()) {
            return ResponseEntity.status(403).body("Usuario no válido.");
        }

        Usuario usuario = usuarioOpt.get();
        Rol rolUsuario = usuario.getRol();
        if (!(rolUsuario == Rol.POSTULANTE || rolUsuario == Rol.ADMINISTRADOR)) {
            return ResponseEntity.status(403).body("No tiene permisos para crear agrupaciones");
        }

        agrupacion.setCreadoPor(usuario);
        Agrupacion saved = service.saveAgrupacion(agrupacion);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateAgrupacion(@PathVariable Long id,  @RequestBody Agrupacion agrupacionActualizada, @AuthenticationPrincipal UserDetails userDetails) {
        
        Optional<Usuario> usuarioOpt = usuarioRepository.findByUsername(userDetails.getUsername());
        if (usuarioOpt.isEmpty()) {
            return ResponseEntity.status(403).body("Usuario no válido.");
        }

        try {
            Agrupacion actualizada = service.updateAgrupacion(id, agrupacionActualizada, usuarioOpt.get());
            if (actualizada == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(actualizada);
        } catch (AccessDeniedException ex) {
            return ResponseEntity.status(403).body("No puedes editar esta agrupación.");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAgrupacion(@PathVariable Long id) {
        service.deleteAgrupacion(id);
        return ResponseEntity.noContent().build();
    }
}
