package com.tfm.carnavalgo.usuario.repository;

import com.tfm.carnavalgo.usuario.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    Optional<Usuario> findByUsername(String username);
    Optional<Usuario> findByNumIdent(String numIdent);
    boolean existsByEmail(String email);
    boolean existsByUsername(String username);
}
