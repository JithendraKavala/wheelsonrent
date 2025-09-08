package com.example.wheelsonrent.controller;

import com.example.wheelsonrent.dto.ReviewDTO;
import com.example.wheelsonrent.entity.Review;
import com.example.wheelsonrent.entity.User;
import com.example.wheelsonrent.service.ReviewService;
import com.example.wheelsonrent.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;
    private final UserRepository userRepository;

    @PostMapping("/{vehicleId}")
    public ResponseEntity<?> addReview(
            @PathVariable Long vehicleId,
            @RequestBody ReviewDTO reviewDTO) {

        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Review review = reviewService.addReview(vehicleId, user, reviewDTO);

        // Convert to DTO to avoid circular references
        ReviewDTO response = new ReviewDTO(
                review.getUser().getName(),
                review.getComment(),
                review.getDate(),
                review.getRating());

        return ResponseEntity.ok(response);
    }

}
