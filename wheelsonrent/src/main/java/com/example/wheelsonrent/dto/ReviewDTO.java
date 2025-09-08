package com.example.wheelsonrent.dto;

import java.time.LocalDateTime;

import com.example.wheelsonrent.entity.Review;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReviewDTO {
    private String username;
    private String comment;
    private LocalDateTime date;
    private double rating;

    public static ReviewDTO from(Review review) {
        return new ReviewDTO(
                review.getUser().getName(),
                review.getComment(),
                review.getDate(),
                review.getRating() // Now matches double
        );
    }
}
