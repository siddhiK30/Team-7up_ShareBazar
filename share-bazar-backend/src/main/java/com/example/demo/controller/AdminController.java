package com.example.demo.controller;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Admin;
import com.example.demo.repository.AdminRepository;
import com.example.demo.security.JwtUtil;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminRepository adminRepo;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Admin request) {

        Optional<Admin> adminOpt = adminRepo.findByUsername(request.getUsername());

        if (adminOpt.isPresent() &&
            adminOpt.get().getPassword().equals(request.getPassword())) {

            String token = jwtUtil.generateToken(request.getUsername());

            return ResponseEntity.ok(Map.of(
                    "token", token,
                    "role", "ADMIN"
            ));
        }

        return ResponseEntity.status(401).body("Invalid credentials");
    }
    @GetMapping("/test")
    public String test() {
        return "JWT WORKING ✅";
    }
}