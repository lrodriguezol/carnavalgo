package com.tfm.carnavalgo.encuesta.controller;

import com.tfm.carnavalgo.encuesta.model.Encuesta;
import com.tfm.carnavalgo.encuesta.service.EncuestaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/encuestas")
@CrossOrigin(origins = "*")
public class EncuestaController {

    @Autowired
    private EncuestaService service;

    @GetMapping
    public List<Encuesta> getEncuestas() {
        return service.getAllEncuestas();
    }

    @GetMapping("/{id}")
    public Encuesta getEncuestaPorId(@PathVariable Long id) {
        return service.getEncuesta(id).orElse(null);
    }

    @PostMapping
    public Encuesta saveEncuesta(@RequestBody Encuesta encuesta) {
        return service.saveEncuesta(encuesta);
    }

    @DeleteMapping("/{id}")
    public void deleteEncuesta(@PathVariable Long id) {
        service.deleteEncuesta(id);
    }
}
