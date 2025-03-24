package com.tfm.carnavalgo.encuesta.service;

import com.tfm.carnavalgo.encuesta.model.Encuesta;
import com.tfm.carnavalgo.encuesta.repository.EncuestaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EncuestaService {

    @Autowired
    private EncuestaRepository repository;

    public List<Encuesta> getAllEncuestas() {
        return repository.findAll();
    }

    public Optional<Encuesta> getEncuesta(Long id) {
        return repository.findById(id);
    }

    public Encuesta saveEncuesta(Encuesta encuesta) {
        return repository.save(encuesta);
    }

    public void deleteEncuesta(Long id) {
        repository.deleteById(id);
    }
}