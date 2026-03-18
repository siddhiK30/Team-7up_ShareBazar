package com.example.demo.dto;



import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class RegisterRequest {

    @Email(message = "Invalid email format")
    @NotBlank(message = "Email is required")
    private String email;

    @Pattern(
        regexp = "[A-Z]{5}[0-9]{4}[A-Z]{1}",
        message = "Invalid PAN format"
    )
    private String pan;
    @NotBlank(message = "Username is required")
private String username;

    @Size(min = 8, message = "Password must be at least 8 characters")
    @NotBlank(message = "Password is required")
    private String password;
}