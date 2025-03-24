package com.tfm.carnavalgo.evento.controller;

import com.tfm.carnavalgo.evento.model.Evento;
import com.tfm.carnavalgo.evento.service.EventoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/eventos")
@CrossOrigin(origins = "*")
public class EventoController {

    @Autowired
    private EventoService service;

    @GetMapping
    public List<Evento> getEventos() {
        return service.getAllEventos();
    }

    @GetMapping("/{id}")
    public Evento getEventoPorId(@PathVariable Long id) {
        return service.getEvento(id).orElse(null);
    }

    @PostMapping
    public Evento saveEvento(@RequestBody Evento evento) {
        return service.saveEvento(evento);
    }

    @DeleteMapping("/{id}")
    public void deleteEvento(@PathVariable Long id) {
        service.deleteEvento(id);
    }

    @PutMapping("/{id}")
    public Evento updateEvento(@PathVariable Long id, @RequestBody Evento eventoActualizado) {
        return service.updateEvento(id, eventoActualizado);
    }

}
