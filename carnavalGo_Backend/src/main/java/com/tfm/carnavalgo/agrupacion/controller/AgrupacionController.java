package com.tfm.carnavalgo.agrupacion.controller;

import com.tfm.carnavalgo.agrupacion.model.Agrupacion;
import com.tfm.carnavalgo.agrupacion.service.AgrupacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/agrupaciones")
@CrossOrigin(origins = "*")
public class AgrupacionController {

    @Autowired
    private AgrupacionService service;

    @GetMapping
    public List<Agrupacion> getAgrupaciones() {
        return service.getAllAgrupaciones();
    }

    @GetMapping("/{id}")
    public Agrupacion getAgrupacionPorId(@PathVariable Long id) {
        return service.getAgrupacion(id).orElse(null);
    }

    @PostMapping
    public Agrupacion saveAgrupacion(@RequestBody Agrupacion agrupacion) {
        return service.saveAgrupacion(agrupacion);
    }

    @DeleteMapping("/{id}")
    public void deleteAgrupacion(@PathVariable Long id) {
        service.deleteAgrupacion(id);
    }

    @PutMapping("/{id}")
    public Agrupacion updateAgrupacion(@PathVariable Long id, @RequestBody Agrupacion agrupacionActualizada) {
        return service.updateAgrupacion(id, agrupacionActualizada);
    }

}
