package com.example.wheelsonrent.service;

import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.example.wheelsonrent.dto.ReviewDTO;
import com.example.wheelsonrent.dto.VehicleDTO;
import com.example.wheelsonrent.dto.VehicleShortProjection;
import com.example.wheelsonrent.entity.ApprovalStatus;
import com.example.wheelsonrent.entity.Vehicle;
import com.example.wheelsonrent.entity.VehicleStatus;
import com.example.wheelsonrent.entity.VehicleType;
import com.example.wheelsonrent.repository.RentalHistoryRepository;
import com.example.wheelsonrent.repository.VehicleRepository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Page;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class VehicleService {

    private final VehicleRepository vehicleRepository;
    private final RentalHistoryRepository rentalHistoryRepository;

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

    public VehicleDTO getVehicleDetails(Long id) {
        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));

        return VehicleDTO.from(vehicle);
    }
}
