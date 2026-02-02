package com.smarthire.smarthire_backend.security;

import java.security.Key;
import java.util.Date;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {

    // Secret key (auto-generated)
    private final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    // Token validity: 1 hour
    private final long EXPIRATION_TIME = 1000 * 60 * 60;

    // Generate JWT token
    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)              // who the token belongs to
                .setIssuedAt(new Date())            // token creation time
                .setExpiration(
                        new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(key)                      // sign token
                .compact();
    }

    // Extract username from token
    public String extractUsername(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }
}
