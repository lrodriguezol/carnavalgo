package com.tfm.carnavalgo.agrupacion.repository;

import com.tfm.carnavalgo.agrupacion.model.Agrupacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AgrupacionRepository extends JpaRepository<Agrupacion, Long> {
}
