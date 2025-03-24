package com.tfm.carnavalgo.encuesta.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "encuestas")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Encuesta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String pregunta;

    @Column(columnDefinition = "TEXT")
    private String opciones;

    @Column(columnDefinition = "TEXT")
    private String resultados;

    private LocalDate fecha;
}
