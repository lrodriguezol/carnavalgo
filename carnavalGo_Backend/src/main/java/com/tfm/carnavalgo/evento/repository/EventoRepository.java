package com.tfm.carnavalgo.evento.repository;

import com.tfm.carnavalgo.evento.model.Evento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventoRepository extends JpaRepository<Evento, Long> {
}
