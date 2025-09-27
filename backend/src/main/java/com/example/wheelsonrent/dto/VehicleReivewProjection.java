package com.example.wheelsonrent.dto;

import com.example.wheelsonrent.entity.VehicleType;

public interface VehicleReivewProjection {
    String getName();

    double getRentPerHour();

    String getImagePath();

    Long getId();

    int getSeatCount();

    VehicleType getType();

    String getFuelType();

    String getGearType();

    String getAddress();

    Owner getOwner();

    interface Owner {
        Long getId();

        String getName();

        String getEmail();
    }
}
