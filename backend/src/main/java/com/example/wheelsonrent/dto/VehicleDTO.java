package com.example.wheelsonrent.dto;

import java.util.List;

import com.example.wheelsonrent.entity.Vehicle;
import com.example.wheelsonrent.entity.VehicleStatus;
import com.example.wheelsonrent.entity.VehicleType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VehicleDTO {
    private Long id;
    private String name;
    private String brand;
    private String model;
    private String description;
    private String fuelType;
    private int seatCount;
    private String gearType;
    private double rentPerHour;
    private double averageRating;
    private int totalReviews;
    private String imagePath;
    private VehicleType type;
    private VehicleStatus status; // Assuming status is a string representation of VehicleStatus
    private List<ReviewDTO> reviews;
    private String address;

    public static VehicleDTO from(Vehicle vehicle) {
        List<ReviewDTO> reviewDTOs = vehicle.getReviews().stream()
                .map(ReviewDTO::from)
                .toList();

        return new VehicleDTO(
                vehicle.getId(),
                vehicle.getName(),
                vehicle.getBrand(),
                vehicle.getModel(),
                vehicle.getDescription(),
                vehicle.getFuelType(),
                vehicle.getSeatCount(),
                vehicle.getGearType(),
                vehicle.getRentPerHour(),
                vehicle.getAverageRating(),
                vehicle.getTotalReviews(),
                vehicle.getImagePath(),
                vehicle.getType(),
                vehicle.getStatus(),
                reviewDTOs,
                vehicle.getAddress());
    }
}
