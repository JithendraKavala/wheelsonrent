package com.example.wheelsonrent.dto;

import java.time.LocalDateTime;

public interface RentalHistoryProjection {
    Long getId();

    LocalDateTime getStartTime();

    LocalDateTime getEndTime();

    Double getTotalCost();

    boolean isCompleted();

    RenterInfo getRenter();

    VehicleInfo getVehicle();

    interface RenterInfo {
        Long getId();

        String getName();

        String getEmail();
    }

    interface VehicleInfo {
        Long getId();

        String getName();
    }
}