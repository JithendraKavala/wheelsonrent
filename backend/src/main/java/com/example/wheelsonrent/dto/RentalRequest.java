package com.example.wheelsonrent.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class RentalRequest {
    private Long vehicleId;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
}
