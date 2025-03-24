package com.tfm.carnavalgo.encuesta.repository;

import com.tfm.carnavalgo.encuesta.model.Encuesta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EncuestaRepository extends JpaRepository<Encuesta, Long> {
}
