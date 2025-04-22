package com.tfm.carnavalgo.evento.service;

import com.tfm.carnavalgo.evento.model.Evento;
import com.tfm.carnavalgo.evento.repository.EventoRepository;
import com.tfm.carnavalgo.usuario.model.Rol;
import com.tfm.carnavalgo.usuario.model.Usuario;
import org.springframework.security.access.AccessDeniedException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventoService {

    @Autowired
    private EventoRepository repository;

    public List<Evento> getAllEventos() {
        return repository.findAll();
    }

    public Optional<Evento> getEvento(Long id) {
        return repository.findById(id);
    }

    public Evento saveEvento(Evento evento) {
        return repository.save(evento);
    }

    public void deleteEvento(Long id) {
        repository.deleteById(id);
    }

    public Evento updateEvento(Long id, Evento nuevo, Usuario usuarioActual) {
        return repository.findById(id).map(actual -> {

            boolean esCreador = actual.getCreadoPor().equals(usuarioActual.getId());
            boolean esAdmin = usuarioActual.getRol() == Rol.ADMINISTRADOR;

            if (!esCreador && !esAdmin) {
                throw new AccessDeniedException("No tiene permiso para editar este evento.");
            }

            actual.setTitulo(nuevo.getTitulo());
            actual.setFecha(nuevo.getFecha());
            actual.setHora(nuevo.getHora());
            actual.setLocalizacion(nuevo.getLocalizacion());
            actual.setAgrupacion(nuevo.getAgrupacion());

            return repository.save(actual);
        }).orElse(null);
    }
}
