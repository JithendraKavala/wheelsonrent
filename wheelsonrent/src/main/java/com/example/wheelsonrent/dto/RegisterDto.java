package com.example.wheelsonrent.dto;

import com.example.wheelsonrent.entity.Role;

import lombok.Data;

@Data
public class RegisterDto {
    private String name;
    private String email;
    private String password;
    private Role role;
}