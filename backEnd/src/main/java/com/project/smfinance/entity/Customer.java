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
  private String customerName;

  @Column(nullable = false)
  private String customerPhoneNumber;

  @Column(nullable = true)
  private String customerAltNumber;

  @Column(nullable = false, columnDefinition = "LONGTEXT")
  @Lob
  private String customerAddress;

  @Column(nullable = false)
  private String aadhaarNumber;

  @Column(nullable = false)
  private String panNumber;

  @Column(nullable = false)
  private String rationNumber;

  @Column(nullable = true)
  private String customerEmail;

  @Column(nullable = false)
  private String customerOccupation;
}
