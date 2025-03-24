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

    private String agrupacion;
    private String imagen;
    private String modalidad;
    private String autor;

    @Column(columnDefinition = "TEXT")
    private String componentes;

    @Column(columnDefinition = "TEXT")
    private String historia;

    @Column(name = "redes_sociales")
    private String redesSociales;

    @ManyToOne
    @JoinColumn(name = "creado_por")
    private Usuario creadoPor;
}
