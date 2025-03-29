package com.tfm.carnavalgo.ubicacion.service;

import com.tfm.carnavalgo.ubicacion.model.Ubicacion;
import com.tfm.carnavalgo.ubicacion.repository.UbicacionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UbicacionService {

    @Autowired
    private UbicacionRepository repository;

    public List<Ubicacion> getAllUbicaciones() {
        return repository.findAll();
    }

    public Optional<Ubicacion> getUbicacion(Long id) {
        return repository.findById(id);
    }

    public Ubicacion saveUbicacion(Ubicacion ubicacion) {
        return repository.save(ubicacion);
    }

    public void deleteUbicacion(Long id) {
        repository.deleteById(id);
    }

    public Ubicacion updateUbicacion(Long id, Ubicacion nueva) {
        return repository.findById(id).map(actual -> {
            actual.setLugar(nueva.getLugar());
            actual.setLatitud(nueva.getLatitud());
            actual.setLongitud(nueva.getLongitud());
            actual.setEvento(nueva.getEvento());
            actual.setAgrupacion(nueva.getAgrupacion());
            return repository.save(actual);
        }).orElse(null);
    }
    
}