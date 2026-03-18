// shareBazarBackend/src/main/java/com/example/demo/security/JwtUtil.java

package com.example.demo.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private long expiration;

    private Key getKey() {
        return Keys.hmacShaKeyFor(secret.getBytes());
    }

    // ✅ NEW - accepts userId
    public String generateToken(String email, Long userId) {
        return Jwts.builder()
                .setSubject(email)
                .claim("userId", userId)
                .claim("email", email)
                .setIssuedAt(new Date())
                .setExpiration(
                    new Date(System.currentTimeMillis() + expiration)
                )
                .signWith(getKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    // ✅ OLD method - keep this so nothing breaks
    public String generateToken(String email) {
        return generateToken(email, null);
    }

    public String extractEmail(String token) {
        return parseClaims(token).getSubject();
    }

    public Long extractUserId(String token) {
        try {
            Object id = parseClaims(token).get("userId");
            return id == null ? null : Long.valueOf(id.toString());
        } catch (Exception e) {
            return null;
        }
    }

    public boolean validateToken(String token) {
        try {
            return !parseClaims(token).getExpiration().before(new Date());
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }

    private Claims parseClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}