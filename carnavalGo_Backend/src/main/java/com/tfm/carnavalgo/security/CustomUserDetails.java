package com.tfm.carnavalgo.security;

public class CustomUserDetails {
    private Long idUsuario;
    private String rol;

    public CustomUserDetails(Long idUsuario, String rol) {
        this.idUsuario = idUsuario;
        this.rol = rol;
    }

    public Long getIdUsuario() {
        return idUsuario;
    }

    public String getRol() {
        return rol;
    }
}