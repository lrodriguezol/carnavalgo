package com.tfm.carnavalgo.agrupacion.model;

import com.tfm.carnavalgo.usuario.model.Usuario;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "agrupaciones")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Agrupacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String imagen;

    @Column(nullable = false)
    private String agrupacion;

    @Column(nullable = false)
    private String modalidad;

    @Column(nullable = false)
    private String autor;

    @Column(columnDefinition = "TEXT")
    private String componentes;

    @Column(columnDefinition = "TEXT")
    private String historia;

    @Column(name = "redes_sociales", columnDefinition = "TEXT")
    private String redesSociales;

    @ManyToOne(optional = false)
    @JoinColumn(name = "creado_por", nullable = false)
    private Usuario creadoPor;
}
