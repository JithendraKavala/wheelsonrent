// package com.example.wheelsonrent.service;

// import com.resend.Resend;
// import com.resend.core.exception.ResendException;
// import com.resend.services.emails.model.CreateEmailOptions;
// import com.resend.services.emails.model.CreateEmailResponse;

// import org.springframework.beans.factory.annotation.Value;
// import org.springframework.stereotype.Service;

// @Service
// public class ResendEmailService {

// private final Resend resend;

// @Value("${RESEND_FROM}")
// private String from;

// public ResendEmailService(@Value("${RESEND_API_KEY}") String apiKey) {
// this.resend = new Resend(apiKey);
// }

// /**
// * Send a basic email using Resend SDK
// *
// * @param to recipient email
// * @param subject email subject
// * @param text email body (HTML supported)
// * @return true if email was sent successfully
// */
// public boolean sendEmail(String to, String subject, String text) {
// CreateEmailOptions options = CreateEmailOptions.builder()
// .from(from) // e.g., "WheelsonRent <onboarding@resend.dev>"
// .to(to)
// .subject(subject)
// .html(text) // HTML content supported
// .build();

// try {
// CreateEmailResponse response = resend.emails().send(options);
// System.out.println("Email sent successfully, ID: " + response.getId());
// return true;
// } catch (ResendException e) {
// System.err.println("Failed to send email: " + e.getMessage());
// // optionally log or store in DB for retries
// return false;
// }
// }

// /**
// * Example notification for booking
// *
// * @param to recipient email
// * @param renterName renter's name
// * @param vehicleName booked vehicle name
// */
// public void sendBookingNotification(String to, String renterName, String
// vehicleName) {
// String subject = "Booking Confirmation for " + renterName;
// String htmlBody = "<h3>Hi " + renterName + ",</h3>" +
// "<p>Your booking for <strong>" + vehicleName + "</strong> is confirmed.</p>";

// sendEmail(to, subject, htmlBody);
// }
// }
