package com.tfm.carnavalgo.comentario.repository;

import com.tfm.carnavalgo.comentario.model.Comentario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ComentarioRepository extends JpaRepository<Comentario, Long> {
}
