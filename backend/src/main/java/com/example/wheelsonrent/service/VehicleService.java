package com.example.wheelsonrent.service;

import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.example.wheelsonrent.dto.VehicleDTO;
import com.example.wheelsonrent.entity.ApprovalStatus;
import com.example.wheelsonrent.entity.Vehicle;
import com.example.wheelsonrent.entity.VehicleStatus;
import com.example.wheelsonrent.entity.VehicleType;
import com.example.wheelsonrent.repository.VehicleRepository;

import org.springframework.data.domain.Page;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class VehicleService {

    private final VehicleRepository vehicleRepository;

    public String approveVehicle(Long vehicleId) {
        Vehicle vehicle = vehicleRepository.findById(vehicleId)
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));
        vehicle.setApprovalStatus(ApprovalStatus.APPROVED);
        vehicle.setStatus(VehicleStatus.AVAILABLE); // Optional: mark as available too
        vehicleRepository.save(vehicle);
        return "✅ Vehicle approved successfully";
    }

    public String rejectVehicle(Long vehicleId) {
        Vehicle vehicle = vehicleRepository.findById(vehicleId)
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));
        vehicle.setApprovalStatus(ApprovalStatus.REJECTED);
        vehicle.setAvailable(false); // Optional: disable availability
        vehicleRepository.save(vehicle);
        return "❌ Vehicle rejected";

    }

    public <T> Page<T> getApprovedVehicles(int page, int size, Class<T> typeClass) {
        return vehicleRepository.findByApprovalStatus(ApprovalStatus.APPROVED, PageRequest.of(page, size),
                typeClass);
    }

    public <T> Page<T> searchVehicles(VehicleType type, String brand, Double minRating, Double maxPrice, int page,
            int size, Class<T> typeClass) {
        PageRequest pageable = PageRequest.of(page, size);
        return vehicleRepository.findByFilters(type, brand, minRating, maxPrice, pageable, typeClass);
    }

    public <T> Page<T> searchVehiclesWithLocation(VehicleType type, String brand, Double minRating, Double maxPrice, 
            Double latitude, Double longitude, Double radius, int page, int size, Class<T> typeClass) {
        PageRequest pageable = PageRequest.of(page, size);
        
        // If location parameters are provided, use location-based search
        if (latitude != null && longitude != null && radius != null && radius > 0) {
            return vehicleRepository.findByFiltersWithLocation(type, brand, minRating, maxPrice, 
                    latitude, longitude, radius, pageable, typeClass);
        }
        
        // Otherwise use regular search
        return vehicleRepository.findByFilters(type, brand, minRating, maxPrice, pageable, typeClass);
    }

    public VehicleDTO getVehicleDetails(Long id) {
        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));

        return VehicleDTO.from(vehicle);
    }
}
