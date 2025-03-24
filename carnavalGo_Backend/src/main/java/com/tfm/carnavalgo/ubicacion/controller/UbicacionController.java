package com.tfm.carnavalgo.ubicacion.controller;

import com.tfm.carnavalgo.ubicacion.model.Ubicacion;
import com.tfm.carnavalgo.ubicacion.service.UbicacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ubicaciones")
@CrossOrigin(origins = "*")
public class UbicacionController {

    @Autowired
    private UbicacionService service;

    @GetMapping
    public List<Ubicacion> getUbicaciones() {
        return service.getAllUbicaciones();
    }

    @GetMapping("/{id}")
    public Ubicacion getUbicacionPorId(@PathVariable Long id) {
        return service.getUbicacion(id).orElse(null);
    }

    @PostMapping
    public Ubicacion saveUbicacion(@RequestBody Ubicacion ubicacion) {
        return service.saveUbicacion(ubicacion);
    }

    @DeleteMapping("/{id}")
    public void deleteUbicacion(@PathVariable Long id) {
        service.deleteUbicacion(id);
    }

    @PutMapping("/{id}")
    public Ubicacion updateUbicacion(@PathVariable Long id, @RequestBody Ubicacion ubicacionActualizada) {
        return service.updateUbicacion(id, ubicacionActualizada);
    }
}
