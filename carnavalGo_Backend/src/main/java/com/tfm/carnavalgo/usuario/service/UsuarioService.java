package com.tfm.carnavalgo.usuario.service;

import com.tfm.carnavalgo.usuario.model.Usuario;
import com.tfm.carnavalgo.usuario.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<Usuario> getAllUsuarios() {
        return usuarioRepository.findAll();
    }

    public Optional<Usuario> getUsuario(Long id) {
        return usuarioRepository.findById(id);
    }

    public Usuario saveUsuario(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    public void deleteUsuario(Long id) {
        usuarioRepository.deleteById(id);
    }

    public Usuario updateUsuario(Long id, Usuario nuevo) {
        return usuarioRepository.findById(id).map(actual -> {
            actual.setNombre(nuevo.getNombre());
            actual.setApellido1(nuevo.getApellido1());
            actual.setApellido2(nuevo.getApellido2());
            actual.setEmail(nuevo.getEmail());
            actual.setTelefono(nuevo.getTelefono());
            actual.setUsername(nuevo.getUsername());
            actual.setPassword(nuevo.getPassword());
            actual.setRol(nuevo.getRol());
            return usuarioRepository.save(actual);
        }).orElse(null);
    }

    public Optional<Usuario> getUsuarioPorUsername(String username) {
        return usuarioRepository.findByUsername(username);
    }
    
}