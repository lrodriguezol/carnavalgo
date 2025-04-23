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

    @Column(nullable = false)
    private String titulo;

    @Column(nullable = false)
    private LocalDate fecha;

    private LocalTime hora;

    private String localizacion;

    private Long agrupacion; 

    @Column(name = "creado_por", nullable = false)
    private Long creadoPor; 
}