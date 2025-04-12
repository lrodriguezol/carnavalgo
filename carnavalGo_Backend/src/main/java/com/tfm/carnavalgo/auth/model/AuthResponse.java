package com.tfm.carnavalgo.auth.model;

import com.tfm.carnavalgo.usuario.model.Usuario;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private String rol;
    private Usuario usuario; 
}