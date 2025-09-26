package com.example.wheelsonrent.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class BrevoEmailService {

        private final WebClient webClient;
        private final String apiKey;
        private final String senderEmail;
        private final String senderName;

        public BrevoEmailService(
                        @Value("${brevo.api-key}") String apiKey,
                        @Value("${brevo.sender-email}") String senderEmail,
                        @Value("${brevo.sender-name}") String senderName) {
                this.apiKey = apiKey;
                this.senderEmail = senderEmail;
                this.senderName = senderName;

                this.webClient = WebClient.builder()
                                .baseUrl("https://api.brevo.com")
                                .defaultHeader("api-key", apiKey)
                                .defaultHeader("Content-Type", "application/json")
                                .build();
        }

        public Mono<Void> sendEmail(String toEmail, String toName, String subject, String htmlContent) {
                var body = new java.util.HashMap<String, Object>();
                var sender = new java.util.HashMap<String, String>();
                sender.put("email", senderEmail);
                sender.put("name", senderName);
                body.put("sender", sender);

                var recipients = java.util.List.of(
                                java.util.Map.of("email", toEmail, "name", toName));
                body.put("to", recipients);
                body.put("subject", subject);
                body.put("htmlContent", htmlContent);

                return webClient.post()
                                .uri("/v3/smtp/email")
                                .bodyValue(body)
                                .retrieve()
                                .onStatus(status -> !status.is2xxSuccessful(), resp -> resp.bodyToMono(String.class)
                                                .flatMap(msg -> Mono
                                                                .error(new RuntimeException("Brevo error: " + msg))))
                                .bodyToMono(Void.class);
        }
}
