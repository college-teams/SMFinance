package com.project.smfinance.config;

import com.amazonaws.services.costandusagereport.model.AWSRegion;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AwsConfig {

  private final String AWS_REGION = AWSRegion.UsEast1.toString();

  @Bean
  public AmazonS3 amazonS3Client() {
    return AmazonS3ClientBuilder.standard().withRegion(AWS_REGION).build();
  }
}
