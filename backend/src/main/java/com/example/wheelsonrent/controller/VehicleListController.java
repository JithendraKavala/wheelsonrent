package com.example.wheelsonrent.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.wheelsonrent.dto.VehicleDTO;
import com.example.wheelsonrent.dto.VehicleShortProjection;
import com.example.wheelsonrent.entity.VehicleType;
import com.example.wheelsonrent.service.VehicleService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/vehicles")
@RequiredArgsConstructor
public class VehicleListController {
    private final VehicleService vehicleService;

    @GetMapping("/list")
    public Page<VehicleShortProjection> getVehicles(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return vehicleService.getApprovedVehicles(page, size, VehicleShortProjection.class);
    }

    @GetMapping("/search")
    public ResponseEntity<Page<VehicleShortProjection>> searchVehicles(
            @RequestParam(required = false) VehicleType type,
            @RequestParam(required = false) String brand,
            @RequestParam(required = false) Double minRating,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(required = false) Double latitude,
            @RequestParam(required = false) Double longitude,
            @RequestParam(required = false) Double radius,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        System.out.println("Searching vehicles with parameters: " +
                "type=" + type +
                ", brand=" + brand +
                ", minRating=" + minRating +
                ", maxPrice=" + maxPrice +
                ", latitude=" + latitude +
                ", longitude=" + longitude +
                ", radius=" + radius +
                ", page=" + page +
                ", size=" + size);
        if (type == null && (brand == null || brand.isEmpty()) && minRating == 0.0 && maxPrice == 0.0 && latitude == null && longitude == null) {
            return ResponseEntity.ok(vehicleService.getApprovedVehicles(page, size, VehicleShortProjection.class));
        }
        if (maxPrice != null && maxPrice <= 0) {
            maxPrice = Double.MAX_VALUE; // Default to no max price if negative
        }
        Page<VehicleShortProjection> vehicles = vehicleService.searchVehiclesWithLocation(type, brand, minRating, maxPrice, 
                latitude, longitude, radius, page, size, VehicleShortProjection.class);
        return ResponseEntity.ok(vehicles);
    }

    @GetMapping("/{id}")
    public ResponseEntity<VehicleDTO> getVehicleById(@PathVariable Long id) {
        return ResponseEntity.ok(vehicleService.getVehicleDetails(id));
    }

}
