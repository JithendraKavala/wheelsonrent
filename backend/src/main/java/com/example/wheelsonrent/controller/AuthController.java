package com.example.wheelsonrent.controller;

import com.example.wheelsonrent.dto.LoginDto;
import com.example.wheelsonrent.dto.RegisterDto;

import com.example.wheelsonrent.entity.Role;
import com.example.wheelsonrent.entity.User;
import com.example.wheelsonrent.entity.VerificationToken;
import com.example.wheelsonrent.repository.UserRepository;
import com.example.wheelsonrent.repository.VerificationTokenRepository;
import com.example.wheelsonrent.security.JwtUtil;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.authentication.*;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;

import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    @Autowired
    private JavaMailSender mailSender;

    @Value("${server.port}")
    private String port;

    private final UserRepository userRepository;
    private final VerificationTokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterDto dto) {
        if (userRepository.findByEmail(dto.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email already registered.");
        }

        User user = new User();
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setRole(dto.getRole());
        user.setEnabled(false); // must verify
        String token = UUID.randomUUID().toString();

        // Send email (log for now)
        String link = "http://localhost:" + port + "/auth/verify?token=" + token;
        MimeMessage msg = mailSender.createMimeMessage();
        MimeMessageHelper helper;
        try {
            helper = new MimeMessageHelper(msg, true);
            helper.setTo(user.getEmail());
            helper.setSubject("Verify your email");
            helper.setText("Click to verify: " + link);
            mailSender.send(msg);
            userRepository.save(user);

            // Create token
            VerificationToken verificationToken = new VerificationToken(
                    null,
                    token,
                    user,
                    LocalDateTime.now().plusHours(24));
            tokenRepository.save(verificationToken);
        } catch (MessagingException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to send verification email: " + e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Registration failed: " + e.getMessage());
        }

        return ResponseEntity.ok("Registered. Please check email to verify your account.");
    }

    @GetMapping("/verify")
    public ResponseEntity<String> verifyEmail(@RequestParam String token) {
        Optional<VerificationToken> optionalToken = tokenRepository.findByToken(token);
        if (optionalToken.isEmpty()) {
            return ResponseEntity.badRequest().body("Invalid token");
        }

        VerificationToken vToken = optionalToken.get();

        if (vToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            return ResponseEntity.badRequest().body("Token expired");
        }

        User user = vToken.getUser();
        user.setEnabled(true);
        userRepository.save(user);

        tokenRepository.delete(vToken);

        return ResponseEntity.ok("Email verified successfully. You can now log in.");
    }

    // ✅ Login endpoint
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDto dto) {
        try {
            System.out.println("Login attempt for email: " + dto.getEmail() + " with role: " + dto.getRole());
            // Authenticate credentials
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword()));

            // Fetch user from DB
            Optional<User> optionalUser = userRepository.findByEmail(dto.getEmail());
            if (optionalUser.isEmpty()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found.");
            }

            User user = optionalUser.get();

            // Check if the role matches the one provided in API request
            if (!user.getRole().name().equalsIgnoreCase(dto.getRole())) {
                System.out.println("Role mismatch: expected " + dto.getRole() + ", found " + user.getRole().name());
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Incorrect role for this user.");
            }

            // Email verification check
            if (!user.isEnabled()) {
                System.out.println("Email not verified for user: " + user.getEmail());
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Email not verified. Please check your inbox.");
            }

            // Generate JWT
            String token = jwtUtil.generateToken((UserDetails) authentication.getPrincipal());

            return ResponseEntity.ok(Map.of(
                    "token", token));
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Login failed: " + e.getMessage());
        }
    }
    

}
