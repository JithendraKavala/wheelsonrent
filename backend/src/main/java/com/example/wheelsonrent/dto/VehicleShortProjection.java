package com.example.wheelsonrent.dto;

public interface VehicleShortProjection {
    String getName();

    float getAverageRating();

    double getRentPerHour();

    String getImagePath();

    Long getId();

    int getSeatCount();

    String getFuelType();

    String getGearType();

    String getAddress();
}
