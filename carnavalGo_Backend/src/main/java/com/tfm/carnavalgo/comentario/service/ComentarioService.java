package com.tfm.carnavalgo.comentario.service;

import com.tfm.carnavalgo.comentario.model.Comentario;
import com.tfm.carnavalgo.comentario.repository.ComentarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ComentarioService {

    @Autowired
    private ComentarioRepository repository;

    public List<Comentario> getAllComentarios() {
        return repository.findAll();
    }

    public Optional<Comentario> getComentario(Long id) {
        return repository.findById(id);
    }

    public Comentario saveComentario(Comentario comentario) {
        return repository.save(comentario);
    }

    public void deleteComentario(Long id) {
        repository.deleteById(id);
    }
}