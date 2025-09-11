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
    
    @Value("${app.base-url:https://wheelsonrent-mch0.onrender.com}")
    private String baseUrl;

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

        // Send professional verification email
        String link = baseUrl + "/auth/verify?token=" + token;
        MimeMessage msg = mailSender.createMimeMessage();
        MimeMessageHelper helper;
        try {
            helper = new MimeMessageHelper(msg, true, "UTF-8");
            helper.setTo(user.getEmail());
            helper.setSubject("Welcome to WheelsOnRent - Verify Your Account");
            
            // Professional HTML email content
            String htmlContent = createVerificationEmailHtml(user.getName(), link);
            helper.setText(htmlContent, true);
            
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

        return ResponseEntity.ok("<!DOCTYPE html>" +
            "<html>" +
            "<head>" +
                "<meta charset=\"UTF-8\">" +
                "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">" +
                "<title>Email Verified - WheelsOnRent</title>" +
                "<style>" +
                    "body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background: #f5f5f5; }" +
                    ".container { max-width: 600px; margin: 50px auto; padding: 20px; }" +
                    ".success-card { background: white; border-radius: 10px; padding: 40px; text-align: center; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }" +
                    ".success-icon { font-size: 64px; color: #4CAF50; margin-bottom: 20px; }" +
                    ".success-title { color: #2c3e50; margin-bottom: 20px; }" +
                    ".success-message { color: #666; margin-bottom: 30px; }" +
                    ".cta-button { display: inline-block; background: #667eea; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; }" +
                    ".cta-button:hover { background: #5a6fd8; }" +
                "</style>" +
            "</head>" +
            "<body>" +
                "<div class=\"container\">" +
                    "<div class=\"success-card\">" +
                        "<div class=\"success-icon\">✅</div>" +
                        "<h1 class=\"success-title\">Email Verified Successfully!</h1>" +
                        "<p class=\"success-message\">Your WheelsOnRent account has been activated. You can now log in and start exploring our platform.</p>" +
                        "<a href=\"https://wheelsonrent-dk9j.vercel.app/login\" class=\"cta-button\">Go to Login</a>" +
                    "</div>" +
                "</div>" +
            "</body>" +
            "</html>");
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
    
    private String createVerificationEmailHtml(String userName, String verificationLink) {
        return "<!DOCTYPE html>" +
            "<html>" +
            "<head>" +
                "<meta charset=\"UTF-8\">" +
                "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">" +
                "<title>Email Verification - WheelsOnRent</title>" +
                "<style>" +
                    "body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }" +
                    ".container { max-width: 600px; margin: 0 auto; padding: 20px; }" +
                    ".header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }" +
                    ".content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }" +
                    ".button { display: inline-block; background: #667eea; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; font-weight: bold; }" +
                    ".button:hover { background: #5a6fd8; }" +
                    ".footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }" +
                    ".highlight { background: #e8f4fd; padding: 15px; border-left: 4px solid #667eea; margin: 20px 0; }" +
                "</style>" +
            "</head>" +
            "<body>" +
                "<div class=\"container\">" +
                    "<div class=\"header\">" +
                        "<h1>🚗 WheelsOnRent</h1>" +
                        "<p>Your trusted vehicle rental platform</p>" +
                    "</div>" +
                    "<div class=\"content\">" +
                        "<h2>Welcome, " + userName + "!</h2>" +
                        "<p>Thank you for registering with WheelsOnRent. We're excited to have you join our community of vehicle renters and owners.</p>" +
                        
                        "<div class=\"highlight\">" +
                            "<strong>📧 Email Verification Required</strong><br>" +
                            "To complete your registration and start using our platform, please verify your email address by clicking the button below." +
                        "</div>" +
                        
                        "<div style=\"text-align: center;\">" +
                            "<a href=\"" + verificationLink + "\" class=\"button\">Verify My Email Address</a>" +
                        "</div>" +
                        
                        "<p><strong>What happens next?</strong></p>" +
                        "<ul>" +
                            "<li>✅ Verify your email to activate your account</li>" +
                            "<li>🚗 Browse and book vehicles from our extensive collection</li>" +
                            "<li>💰 List your own vehicles and start earning</li>" +
                            "<li>⭐ Leave reviews and build your reputation</li>" +
                        "</ul>" +
                        
                        "<p><strong>Important:</strong> This verification link will expire in 24 hours for security reasons.</p>" +
                        
                        "<p>If you didn't create an account with WheelsOnRent, please ignore this email.</p>" +
                    "</div>" +
                    "<div class=\"footer\">" +
                        "<p>© 2025 WheelsOnRent. All rights reserved.</p>" +
                        "<p>This is an automated message, please do not reply to this email.</p>" +
                    "</div>" +
                "</div>" +
            "</body>" +
            "</html>";
    }

}
