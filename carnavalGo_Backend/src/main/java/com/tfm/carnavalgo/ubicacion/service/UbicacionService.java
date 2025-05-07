package com.tfm.carnavalgo.ubicacion.service;

import com.tfm.carnavalgo.agrupacion.model.Agrupacion;
import com.tfm.carnavalgo.agrupacion.repository.AgrupacionRepository;
import com.tfm.carnavalgo.ubicacion.model.Ubicacion;
import com.tfm.carnavalgo.ubicacion.repository.UbicacionRepository;
import com.tfm.carnavalgo.usuario.model.Rol;
import com.tfm.carnavalgo.usuario.model.Usuario;
import org.springframework.security.access.AccessDeniedException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UbicacionService {

    @Autowired
    private UbicacionRepository repository;

    @Autowired
    private AgrupacionRepository agrupacionRepository;

    public List<Ubicacion> getAllUbicaciones() {
        return repository.findAll();
    }

    public Optional<Ubicacion> getUbicacion(Long id) {
        return repository.findById(id);
    }

    public Ubicacion saveUbicacion(Ubicacion ubicacion, Usuario usuarioActual) {
        if (usuarioActual.getRol() == Rol.ADMINISTRADOR) {
            return repository.save(ubicacion);
        }

        if (usuarioActual.getRol() == Rol.POSTULANTE) {
            if (ubicacion.getAgrupacion() != null) {
                Optional<Agrupacion> agrupacionOpt = agrupacionRepository.findById(ubicacion.getAgrupacion());
                if (agrupacionOpt.isPresent()) {
                    Agrupacion agrupacion = agrupacionOpt.get();
                    if (agrupacion.getCreadoPor().getId().equals(usuarioActual.getId())) {
                        return repository.save(ubicacion);
                    }
                }
            }
            throw new AccessDeniedException("No tiene permisos para crear ubicaciones de otra agrupación.");
        }
        throw new AccessDeniedException("No tiene permisos para crear ubicaciones.");
    }


    public Ubicacion updateUbicacion(Long id, Ubicacion nueva, Usuario usuarioActual) {
        return repository.findById(id).map(actual -> {
            if (usuarioActual.getRol() == Rol.ADMINISTRADOR) {
                actual.setLugar(nueva.getLugar());
                actual.setLatitud(nueva.getLatitud());
                actual.setLongitud(nueva.getLongitud());
                actual.setEvento(nueva.getEvento());
                actual.setAgrupacion(nueva.getAgrupacion());
                return repository.save(actual);
            }
    
            if (usuarioActual.getRol() == Rol.POSTULANTE) {
                if (nueva.getAgrupacion() != null) {
                    Optional<Agrupacion> agrupacionOpt = agrupacionRepository.findById(nueva.getAgrupacion());
                    if (agrupacionOpt.isPresent()) {
                        Agrupacion agrupacion = agrupacionOpt.get();
                        if (agrupacion.getCreadoPor().getId().equals(usuarioActual.getId())) {
                            actual.setLugar(nueva.getLugar());
                            actual.setLatitud(nueva.getLatitud());
                            actual.setLongitud(nueva.getLongitud());
                            actual.setEvento(nueva.getEvento());
                            actual.setAgrupacion(nueva.getAgrupacion());
                            return repository.save(actual);
                        }
                    }
                }
                throw new AccessDeniedException("No tiene permisos para editar ubicaciones de otra agrupación.");
            }
    
            throw new AccessDeniedException("No tiene permisos para editar ubicaciones.");
        }).orElse(null);
    }
    
    public void deleteUbicacion(Long id) {
        repository.deleteById(id);
    }

}