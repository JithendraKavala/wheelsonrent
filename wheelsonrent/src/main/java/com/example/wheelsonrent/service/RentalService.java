package com.example.wheelsonrent.service;

import java.time.Duration;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.wheelsonrent.dto.RentalRequest;
import com.example.wheelsonrent.entity.RentalHistory;
import com.example.wheelsonrent.entity.User;
import com.example.wheelsonrent.entity.Vehicle;
import com.example.wheelsonrent.entity.VehicleStatus;
import com.example.wheelsonrent.repository.RentalHistoryRepository;
import com.example.wheelsonrent.repository.UserRepository;
import com.example.wheelsonrent.repository.VehicleRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RentalService {

    private final VehicleRepository vehicleRepository;
    private final UserRepository userRepository;
    private final RentalHistoryRepository rentalHistoryRepository;
    private final MailService mailService;

    @Transactional
    public RentalHistory bookVehicle(RentalRequest request) {
        String renterEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        User renter = userRepository.findByEmail(renterEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Vehicle vehicle = vehicleRepository.findById(request.getVehicleId())
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));

        double hours = Duration.between(request.getStartTime(), request.getEndTime()).toHours();
        double cost = hours * vehicle.getRentPerHour();

        RentalHistory history = new RentalHistory();
        history.setVehicle(vehicle);
        history.setRenter(renter);
        history.setStartTime(request.getStartTime());
        history.setEndTime(request.getEndTime());
        history.setTotalCost(cost);
        history.setCompleted(false);

        rentalHistoryRepository.save(history);
        vehicle.setStatus(VehicleStatus.UNAVAILABLE);
        vehicleRepository.save(vehicle);
        // Email to owner
        User owner = vehicle.getOwner();
        if (owner != null && owner.getEmail() != null) {
            mailService.sendBookingNotification(owner.getEmail(), renter.getName(), vehicle.getName());
        }

        return history;
    }
}
