package com.project.smfinance.config;

import com.amazonaws.auth.profile.ProfileCredentialsProvider;
import com.amazonaws.services.costandusagereport.model.AWSRegion;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Configuration
public class AwsConfig {

  private final String AWS_REGION = AWSRegion.UsEast1.toString();

  @Bean
  @Profile("prod")
  public AmazonS3 amazonS3Client() {
    return AmazonS3ClientBuilder.standard().withRegion(AWS_REGION).build();
  }

  @Bean
  @Profile("local")
  public AmazonS3 amazonS3ClientLocal() {
    return AmazonS3ClientBuilder.standard()
        .withRegion(AWS_REGION)
        .withCredentials(new ProfileCredentialsProvider("smf"))
        .build();
  }
}
