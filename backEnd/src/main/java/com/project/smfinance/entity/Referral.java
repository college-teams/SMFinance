package com.project.smfinance.entity;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Referral extends BaseEntity {

  private String referralFirstName;

  private String referralLastName;

  private String referralEmail;

  private String referralPhoneNumber;
}
