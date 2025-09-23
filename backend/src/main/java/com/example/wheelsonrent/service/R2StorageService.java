package com.example.wheelsonrent.service;

// Spring annotations
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

// Java standard
import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.util.UUID;

// AWS SDK for S3 (for Cloudflare R2)
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.core.sync.RequestBody;

@Service
public class R2StorageService {

    private final S3Client s3Client;
    private final String bucket;
    private final String accountId;
    private final String publicUrl; // needed for public URL

    public R2StorageService(
            @Value("${cloudflare.r2.endpoint}") String endpoint,
            @Value("${cloudflare.r2.access-key}") String accessKey,
            @Value("${cloudflare.r2.secret-key}") String secretKey,
            @Value("${cloudflare.r2.bucket}") String bucket,
            @Value("${cloudflare.r2.account-id}") String accountId,
            @Value("${cloudflare.r2.public-url}") String publicUrl) {

        this.bucket = bucket;
        this.accountId = accountId;
        this.publicUrl = publicUrl;
        this.s3Client = S3Client.builder()
                .endpointOverride(URI.create(endpoint))
                .credentialsProvider(
                        StaticCredentialsProvider.create(
                                AwsBasicCredentials.create(accessKey, secretKey)))
                .region(Region.US_EAST_1) // required by SDK
                .build();
    }

    public String uploadFile(MultipartFile file) throws IOException {
        String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();

        s3Client.putObject(PutObjectRequest.builder()
                .bucket(bucket)
                .key(fileName)
                .contentType(file.getContentType())
                .build(),
                RequestBody.fromBytes(file.getBytes()));

        // Public URL via R2 bucket
        return String.format("https://%s/%s",
                publicUrl, fileName);
    }
}
