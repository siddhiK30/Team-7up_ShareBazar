package com.example.admin_service.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @PostMapping("/register")
    public String register(@RequestBody String body) {
        System.out.println("Received: " + body);
        return "User registered successfully";
    }
}