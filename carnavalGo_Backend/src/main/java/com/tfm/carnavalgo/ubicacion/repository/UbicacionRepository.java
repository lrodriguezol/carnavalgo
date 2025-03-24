package com.tfm.carnavalgo.ubicacion.repository;

import com.tfm.carnavalgo.ubicacion.model.Ubicacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UbicacionRepository extends JpaRepository<Ubicacion, Long> {
}
