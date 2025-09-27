package com.example.wheelsonrent.dto;

import com.example.wheelsonrent.entity.Vehicle;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class AdminDashboardDto {
    private long totalUsers;
    private long totalOwners;
    private long totalBookings;
    private double totalEarnings;
    private List<VehicleReivewProjection> pendingApprovals;
}
