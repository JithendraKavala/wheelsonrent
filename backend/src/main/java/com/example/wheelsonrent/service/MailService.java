package com.example.wheelsonrent.service;

import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MailService {

    private final JavaMailSender mailSender;

    @Async
    public void sendBookingNotification(String to, String renterName, String vehicleName) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("New Booking Alert for Your Vehicle");
        message.setText("Your vehicle \"" + vehicleName + "\" has been booked by " + renterName + ".");

        mailSender.send(message);
    }
}
