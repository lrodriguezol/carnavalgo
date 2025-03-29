package com.tfm.carnavalgo.comentario.model;

import com.tfm.carnavalgo.usuario.model.Usuario;
import com.tfm.carnavalgo.agrupacion.model.Agrupacion;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "comentarios")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Comentario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String comentario;

    @ManyToOne
    @JoinColumn(name = "autor_id", nullable = false)
    private Usuario autor;

    @ManyToOne
    @JoinColumn(name = "relacionado_con", nullable = false)
    private Agrupacion relacionadoCon;

    private LocalDate fecha;
}
