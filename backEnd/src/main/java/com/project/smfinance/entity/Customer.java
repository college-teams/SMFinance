package com.project.smfinance.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Customer extends BaseEntity {

  @Column(nullable = false)
  private String name;

  @Column(nullable = false)
  private String phoneNumber;

  @Column(nullable = true)
  private String altPhoneNumber;

  @Column(nullable = false, columnDefinition = "LONGTEXT")
  @Lob
  private String address;

  @Column(nullable = false)
  private String aadhaarNumber;

  @Column(nullable = false)
  private String panNumber;

  @Column(nullable = false)
  private String rationNumber;

  @Column(nullable = true)
  private String email;

  @Column(nullable = false)
  private String occupation;
}
