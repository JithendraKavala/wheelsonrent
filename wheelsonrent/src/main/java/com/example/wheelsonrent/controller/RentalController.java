package com.example.wheelsonrent.controller;

import com.example.wheelsonrent.dto.RentalRequest;
import com.example.wheelsonrent.entity.RentalHistory;
import com.example.wheelsonrent.entity.User;
import com.example.wheelsonrent.repository.RentalHistoryRepository;
import com.example.wheelsonrent.repository.UserRepository;
import com.example.wheelsonrent.service.RentalService;
import lombok.RequiredArgsConstructor;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/rentals")
@RequiredArgsConstructor
public class RentalController {

    private final RentalService rentalService;

    @PostMapping("/book")
    public RentalHistory book(@RequestBody RentalRequest request) {

        return rentalService.bookVehicle(request);
    }

    @Autowired
    private RentalHistoryRepository rentalHistoryRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/history")
    public List<RentalHistory> getUserRentalHistory(Principal principal) {
        // Get logged-in user
        String email = principal.getName();
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        return rentalHistoryRepository.findByRenter(user);
    }
}
