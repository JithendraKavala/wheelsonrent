package com.example.wheelsonrent.dto;

import com.example.wheelsonrent.entity.VehicleType;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class AddVehicleDto {
    private String name;
    private String brand;
    private String model;
    private String fuelType;
    private int seatCount;
    private String gearType;
    private double rentPerHour;
    private String description;
    private VehicleType type;
    private MultipartFile image; // <-- needed for file upload

    // getters + setters
}
