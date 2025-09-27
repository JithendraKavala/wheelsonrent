package com.example.wheelsonrent.controller;

import com.example.wheelsonrent.dto.AdminDashboardDto;
import com.example.wheelsonrent.dto.VehicleReivewProjection;
import com.example.wheelsonrent.entity.ApprovalStatus;
import com.example.wheelsonrent.entity.RentalHistory;
import com.example.wheelsonrent.entity.Vehicle;
import com.example.wheelsonrent.repository.RentalHistoryRepository;
import com.example.wheelsonrent.repository.UserRepository;
import com.example.wheelsonrent.repository.VehicleRepository;
import com.example.wheelsonrent.service.VehicleService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// import javax.management.relation.Role;
import com.example.wheelsonrent.entity.Role;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    private final UserRepository userRepository;
    private final VehicleRepository vehicleRepository;
    private final RentalHistoryRepository rentalHistoryRepository;

    @GetMapping("/dashboard-summary")
    public AdminDashboardDto getDashboardSummary() {
        long totalUsers = userRepository.count();
        long totalOwners = userRepository.countByRole(Role.OWNER);
        long totalBookings = rentalHistoryRepository.count();
        double totalEarnings = rentalHistoryRepository.getTotalEarnings();
        List<VehicleReivewProjection> pendingVehicles = vehicleRepository.findByApprovalStatus(ApprovalStatus.PENDING,
                VehicleReivewProjection.class);

        return new AdminDashboardDto(
                totalUsers,
                totalOwners,
                totalBookings,
                totalEarnings,
                pendingVehicles);
    }

    private final VehicleService vehicleService;

    @PostMapping("/vehicle/{id}/approve")
    public ResponseEntity<String> approveVehicle(@PathVariable Long id) {
        return ResponseEntity.ok(vehicleService.approveVehicle(id));
    }

    @PostMapping("/vehicle/{id}/reject")
    public ResponseEntity<String> rejectVehicle(@PathVariable Long id) {
        return ResponseEntity.ok(vehicleService.rejectVehicle(id));
    }
}
