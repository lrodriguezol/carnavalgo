package com.tfm.carnavalgo.comentario.controller;

import com.tfm.carnavalgo.comentario.model.Comentario;
import com.tfm.carnavalgo.comentario.service.ComentarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comentarios")
@CrossOrigin(origins = "*")
public class ComentarioController {

    @Autowired
    private ComentarioService service;

    @GetMapping
    public List<Comentario> getComentarios() {
        return service.getAllComentarios();
    }

    @GetMapping("/{id}")
    public Comentario getComentarioPorId(@PathVariable Long id) {
        return service.getComentario(id).orElse(null);
    }

    @PostMapping
    public Comentario saveComentario(@RequestBody Comentario comentario) {
        return service.saveComentario(comentario);
    }

    @DeleteMapping("/{id}")
    public void deleteComentario(@PathVariable Long id) {
        service.deleteComentario(id);
    }
}
