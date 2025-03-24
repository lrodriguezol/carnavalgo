package com.tfm.carnavalgo.ubicacion.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "ubicaciones")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Ubicacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String lugar;

    private String coordenadas; // Ejemplo: "36.5271,-6.2886"

    private Long evento; // ID del evento relacionado (opcional)

    private Long agrupacion; // ID de agrupación que actúa en esa ubicación (opcional)
}
