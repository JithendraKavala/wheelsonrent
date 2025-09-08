package com.example.wheelsonrent.service;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.wheelsonrent.dto.ReviewDTO;
import com.example.wheelsonrent.entity.Review;
import com.example.wheelsonrent.entity.User;
import com.example.wheelsonrent.entity.Vehicle;
import com.example.wheelsonrent.repository.ReviewRepository;
import com.example.wheelsonrent.repository.VehicleRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final VehicleRepository vehicleRepository;

    @Transactional
    public Review addReview(Long vehicleId, User user, ReviewDTO dto) {
        Vehicle vehicle = vehicleRepository.findById(vehicleId)
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));

        Review review = new Review();
        review.setUser(user);
        review.setVehicle(vehicle);
        review.setComment(dto.getComment());
        review.setDate(LocalDateTime.now());
        review.setRating(dto.getRating());

        reviewRepository.save(review);

        // Update average rating and total reviews
        int newTotal = vehicle.getTotalReviews() + 1;
        double newAverage = ((vehicle.getAverageRating() * vehicle.getTotalReviews()) + dto.getRating()) / newTotal;

        vehicle.setTotalReviews(newTotal);
        vehicle.setAverageRating(newAverage);
        vehicleRepository.save(vehicle);

        return review;
    }
}
