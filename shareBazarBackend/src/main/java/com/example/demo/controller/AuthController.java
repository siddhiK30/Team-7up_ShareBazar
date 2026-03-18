package com.example.demo.controller;

import com.example.demo.dto.AuthResponse;
import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.RegisterRequest;
import com.example.demo.entity.User;
import com.example.demo.service.AuthService;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/auth")

public class AuthController {

    private final AuthService authService;

    // ✅ Constructor Injection (MANDATORY)
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

 @PostMapping("/register")
public ResponseEntity<String> register(@Valid @RequestBody RegisterRequest request) {
    authService.register(request);
    return ResponseEntity.ok("User registered successfully");
}

    // ✅ Login
    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request) {
        return authService.login(request);
    }
}