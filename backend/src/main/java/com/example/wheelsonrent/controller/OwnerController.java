package com.example.wheelsonrent.controller;

import java.io.File;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.util.TypeCollector;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.wheelsonrent.dto.AddVehicleDto;
import com.example.wheelsonrent.entity.ApprovalStatus;
import com.example.wheelsonrent.entity.User;
import com.example.wheelsonrent.entity.Vehicle;
import com.example.wheelsonrent.repository.UserRepository;
import com.example.wheelsonrent.repository.VehicleRepository;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.CurrentSecurityContext;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.data.domain.Sort;
import com.example.wheelsonrent.dto.RentalHistoryProjection;
import com.example.wheelsonrent.entity.RentalHistory;
import com.example.wheelsonrent.repository.RentalHistoryRepository;

import lombok.RequiredArgsConstructor;

import com.example.wheelsonrent.service.R2StorageService;

@RestController
@RequestMapping("/owner")
@RequiredArgsConstructor
public class OwnerController {
    @Autowired
    private final VehicleRepository vehicleRepository;
    private final UserRepository userRepository;
    private final RentalHistoryRepository rentalHistoryRepository;
    private final R2StorageService r2StorageService;

    @PostMapping("/add-vehicle")
    public ResponseEntity<?> uploadVehicle(
            @ModelAttribute AddVehicleDto dto,
            @CurrentSecurityContext(expression = "authentication?.name") String email) {
        try {
            // Get current user
            User owner = userRepository.findByEmail(email)
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));

            // Upload image to R2
            String imageUrl = r2StorageService.uploadFile(dto.getImage());

            // Build vehicle entity
            Vehicle vehicle = new Vehicle();
            vehicle.setName(dto.getName());
            vehicle.setBrand(dto.getBrand());
            vehicle.setModel(dto.getModel());
            vehicle.setFuelType(dto.getFuelType());
            vehicle.setSeatCount(dto.getSeatCount());
            vehicle.setGearType(dto.getGearType());
            vehicle.setRentPerHour(dto.getRentPerHour());
            vehicle.setDescription(dto.getDescription());
            vehicle.setType(dto.getType());
            vehicle.setApprovalStatus(ApprovalStatus.PENDING);
            vehicle.setAvailable(true);
            vehicle.setImagePath(imageUrl); // store R2/CDN URL
            vehicle.setOwner(owner);

            vehicleRepository.save(vehicle);

            return ResponseEntity.ok("Vehicle uploaded and pending approval.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to upload vehicle: " + e.getMessage());
        }
    }

    @GetMapping("/my-vehicles")
    public List<Vehicle> getMyVehicles(Authentication auth) {
        User owner = userRepository.findByEmail(auth.getName()).orElseThrow();
        return vehicleRepository.findByOwnerId(owner.getId());
    }

    @GetMapping("/rental-history")
    public Page<RentalHistoryProjection> getRentalHistory(Authentication auth,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        User owner = userRepository.findByEmail(auth.getName()).orElseThrow();
        Pageable pageable = PageRequest.of(page, size, Sort.by("startTime").descending());
        // System.out.println("Owner ID: " + owner.getId()); // Debug logs
        return rentalHistoryRepository.findByOwnerId(owner.getId(), pageable);
    }

    @GetMapping("/dashboard-summary")
    public ResponseEntity<?> getDashboardSummary(Authentication auth) {
        try {
            User owner = userRepository.findByEmail(auth.getName()).orElseThrow();
            double totalVehicles = vehicleRepository.countByOwnerId(owner.getId());
            double approvedVehicles = vehicleRepository.countByOwnerIdAndApprovalStatus(owner.getId(),
                    ApprovalStatus.APPROVED);
            double pendingVehicles = vehicleRepository.countByOwnerIdAndApprovalStatus(owner.getId(),
                    ApprovalStatus.PENDING);
            double totalEarnings = rentalHistoryRepository.sumAmountByOwnerIdAndCompleted(owner.getId(), true);

            Pageable pageable = PageRequest.of(0, 5, Sort.by("startTime").descending());
            // System.out.println("Owner ID: " + owner.getId()); // Debug logs
            Page<RentalHistoryProjection> firstFive = rentalHistoryRepository.findByOwnerId(owner.getId(), pageable);
            return ResponseEntity.ok(new Object() {
                public final double totalVehiclesCount = totalVehicles;
                public final double approvedVehiclesCount = approvedVehicles;
                public final double pendingVehiclesCount = pendingVehicles;
                public final double totalEarningsAmount = totalEarnings;
                public final List<RentalHistoryProjection> recentRentals = firstFive.getContent();
            });
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to fetch dashboard summary: " + e.getMessage());
        }
    }
}
