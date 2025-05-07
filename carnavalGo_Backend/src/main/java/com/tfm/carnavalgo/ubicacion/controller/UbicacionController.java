package com.tfm.carnavalgo.ubicacion.controller;

import com.tfm.carnavalgo.agrupacion.model.Agrupacion;
import com.tfm.carnavalgo.agrupacion.repository.AgrupacionRepository;
import com.tfm.carnavalgo.ubicacion.model.Ubicacion;
import com.tfm.carnavalgo.ubicacion.service.UbicacionService;
import com.tfm.carnavalgo.usuario.model.Usuario;
import com.tfm.carnavalgo.usuario.model.Rol;
import com.tfm.carnavalgo.usuario.repository.UsuarioRepository;
import org.springframework.security.access.AccessDeniedException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api/ubicaciones")
@CrossOrigin(origins = "*")
public class UbicacionController {

    @Autowired
    private UbicacionService service;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping
    public List<Ubicacion> getUbicaciones() {
        return service.getAllUbicaciones();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Ubicacion> getUbicacionPorId(@PathVariable Long id) {
        return service.getUbicacion(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> saveUbicacion(@RequestBody Ubicacion ubicacion, @AuthenticationPrincipal UserDetails userDetails) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findByUsername(userDetails.getUsername());

        if (usuarioOpt.isEmpty()) {
            return ResponseEntity.status(403).body("Usuario no válido.");
        }

        Usuario usuario = usuarioOpt.get();

        try {
            Ubicacion saved = service.saveUbicacion(ubicacion, usuario);
            return ResponseEntity.ok(saved);
        } catch (AccessDeniedException ex) {
            return ResponseEntity.status(403).body(ex.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUbicacion(@PathVariable Long id, @RequestBody Ubicacion ubicacionActualizada, @AuthenticationPrincipal UserDetails userDetails) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findByUsername(userDetails.getUsername());

        if (usuarioOpt.isEmpty()) {
            return ResponseEntity.status(403).body("Usuario no válido.");
        }

        Usuario usuario = usuarioOpt.get();

        try {
            Ubicacion updated = service.updateUbicacion(id, ubicacionActualizada, usuario);
            if (updated == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(updated);
        } catch (AccessDeniedException ex) {
            return ResponseEntity.status(403).body(ex.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public void deleteUbicacion(@PathVariable Long id) {
        service.deleteUbicacion(id);
    }
}
