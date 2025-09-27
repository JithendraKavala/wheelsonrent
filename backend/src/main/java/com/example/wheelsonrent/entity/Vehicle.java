package com.example.wheelsonrent.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Vehicle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String brand;
    private String model;
    private String description;
    private String fuelType;
    private int seatCount;
    private String gearType;
    private double rentPerHour;
    private boolean available = true;
    private double averageRating;
    private int totalReviews;

    private String imagePath;

    @Enumerated(EnumType.STRING)
    private VehicleType type;

    @Enumerated(EnumType.STRING)
    private ApprovalStatus approvalStatus = ApprovalStatus.PENDING;

    private VehicleStatus status = VehicleStatus.CHECKING;

    private double latitude;
    private double longitude;
    private String address;
    @ManyToOne
    private User owner;
    @OneToMany(mappedBy = "vehicle", cascade = CascadeType.ALL)
    private List<Review> reviews = new ArrayList<>();

}
