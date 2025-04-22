package com.tfm.carnavalgo.security;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.tfm.carnavalgo.usuario.model.Usuario;

import io.github.cdimascio.dotenv.Dotenv;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

    @Autowired(required = false) // Pude ser 'null' en producción
    Dotenv dotenv;

    private String getEnvVariable(String key) {
        if (dotenv != null && dotenv.get(key) != null) {
            return dotenv.get(key);
        } else {
            return System.getenv(key);
        }
    }

    private Key getSigningKey() {
        String secretKey = getEnvVariable("JWT_SECRET_KEY");
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }
    
    public Claims extractAllClaims(String token) {
        return Jwts.parserBuilder().setSigningKey(getSigningKey()).build().parseClaimsJws(token).getBody();
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    // Extrae el nombre del usuario desde el token
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    // Extrae el rol del usuario desde el token
    public String extractRol(String token) {
        return extractClaim(token, claims -> claims.get("rol", String.class));
    }

    // Extrae el ID del usuario desde el token
    public Long extractIdUsuario(String token) {
        return extractClaim(token, claims -> claims.get("idUsuario", Long.class));
    }

    // Comprueba si el token ha expirado
    private boolean isTokenExpired(String token) {
        return extractClaim(token, Claims::getExpiration).before(new Date());
    }

    // Valida si el token es válido
    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }

    // Genera el token con rol e idUsuario
    public String generateToken(Usuario usuario, Long userId) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("rol", usuario.getRol().name());
        claims.put("idUsuario", userId);

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(usuario.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000L * 60 * 60 * 2)) // 2 horas
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }
}
