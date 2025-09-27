package com.example.wheelsonrent.service;

import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MailService {

    private final BrevoEmailService brevoEmailService;

    @Async
    public void sendBookingNotification(String to, String renterName, String vehicleName) {

        String subject = "Booking Confirmation for " + renterName;
        String htmlBody = "<h3>Hi " + renterName + ",</h3>" +
                "<p>Your booking for <strong>" + vehicleName + "</strong> is confirmed.</p>";

        brevoEmailService.sendEmail(to, renterName, subject, htmlBody);
    }

    public boolean sendEmail(String to, String toName, String subject, String htmlContent) {
        try {
            brevoEmailService.sendEmail(to, toName, subject, htmlContent).block();
            return true;
        } catch (Exception e) {
            System.err.println("Failed to send email: " + e.getMessage());
            return false;
        }
    }
}
