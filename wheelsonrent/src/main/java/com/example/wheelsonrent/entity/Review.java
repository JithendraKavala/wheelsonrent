package com.example.wheelsonrent.entity;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String comment;
    private double rating;
    private LocalDateTime date;

    // In Review.java
    @ManyToOne
    @JsonIgnore
    private Vehicle vehicle;

    @ManyToOne
    @JsonIgnore
    private User user;
    // ✅ Add this field

}
