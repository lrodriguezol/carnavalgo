package com.tfm.carnavalgo.agrupacion.service;

import com.tfm.carnavalgo.agrupacion.model.Agrupacion;
import com.tfm.carnavalgo.agrupacion.repository.AgrupacionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AgrupacionService {

    @Autowired
    private AgrupacionRepository repository;

    public List<Agrupacion> getAllAgrupaciones() {
        return repository.findAll();
    }

    public Optional<Agrupacion> getAgrupacion(Long id) {
        return repository.findById(id);
    }

    public Agrupacion saveAgrupacion(Agrupacion agrupacion) {
        return repository.save(agrupacion);
    }

    public void deleteAgrupacion(Long id) {
        repository.deleteById(id);
    }

    public Agrupacion updateAgrupacion(Long id, Agrupacion nueva) {
        return repository.findById(id).map(actual -> {
            actual.setAgrupacion(nueva.getAgrupacion());
            actual.setImagen(nueva.getImagen());
            actual.setModalidad(nueva.getModalidad());
            actual.setAutor(nueva.getAutor());
            actual.setComponentes(nueva.getComponentes());
            actual.setHistoria(nueva.getHistoria());
            actual.setRedesSociales(nueva.getRedesSociales());
            return repository.save(actual);
        }).orElse(null);
    }       
}