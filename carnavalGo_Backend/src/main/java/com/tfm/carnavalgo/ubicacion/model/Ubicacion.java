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

    @Column(nullable = false)
    private String latitud;
    
    @Column(nullable = false)
    private String longitud;

    private Long evento;

    private Long agrupacion;
}
