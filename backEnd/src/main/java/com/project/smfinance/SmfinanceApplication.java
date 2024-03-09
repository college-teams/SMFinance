package com.project.smfinance;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class SmfinanceApplication {

  public static void main(String[] args) {
    SpringApplication.run(SmfinanceApplication.class, args);
  }
}
