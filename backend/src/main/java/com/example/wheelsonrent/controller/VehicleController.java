package com.example.wheelsonrent.controller;

import java.io.File;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
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

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/owner")
@RequiredArgsConstructor
public class VehicleController {
    @Autowired
    private final VehicleRepository vehicleRepository;
    private final UserRepository userRepository;

    @PostMapping("/add-vehicle")
    public ResponseEntity<?> uploadVehicle(
            @ModelAttribute AddVehicleDto dto,
            @CurrentSecurityContext(expression = "authentication?.name") String email) {
        try {
            // Get current user
            User owner = userRepository.findByEmail(email)
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));

            // Save image
            String fileName = UUID.randomUUID() + "_" + dto.getImage().getOriginalFilename();
            String uploadDir = System.getProperty("user.dir") + "/uploads/";
            File dir = new File(uploadDir);
            if (!dir.exists())
                dir.mkdirs();

            File dest = new File(uploadDir + fileName);
            dto.getImage().transferTo(dest);

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
            vehicle.setImagePath("/uploads/" + fileName);
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
    
}
