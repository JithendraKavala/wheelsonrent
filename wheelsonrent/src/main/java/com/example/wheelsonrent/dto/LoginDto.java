package com.example.wheelsonrent.dto;

import lombok.Data;

@Data
public class LoginDto {
    private String email;
    private String password;
    private String role; // Expected role from frontend
    // Getters and setters
}
