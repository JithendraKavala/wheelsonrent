package com.example.wheelsonrent.config;

import com.example.wheelsonrent.entity.Role;
import com.example.wheelsonrent.entity.User;
import com.example.wheelsonrent.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner seedAdmin(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            String adminEmail = "admin@wheelsonrent.com";

            if (userRepository.findByEmail(adminEmail).isEmpty()) {
                User admin = new User(
                    "Admin",
                    adminEmail,
                    passwordEncoder.encode("admin123"),
                    Role.ADMIN
                );

                admin.setEnabled(true);

                userRepository.save(admin);
                System.out.println("Admin user seeded: " + adminEmail);
            }
            else {
                System.out.println("Admin user already exists: " + adminEmail);
            }
        };
    }
}
