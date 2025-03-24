package com.tfm.carnavalgo.evento.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "eventos")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Evento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titulo;

    private LocalDate fecha;

    private LocalTime hora;

    private String localizacion;

    private Long agrupacion; // ID de la agrupación (puede ser null)

    @Column(name = "creado_por")
    private Long creadoPor; // ID del usuario que creó el evento
}
