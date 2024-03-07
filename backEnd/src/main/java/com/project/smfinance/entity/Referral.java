package com.project.smfinance.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;
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

  @OneToMany(mappedBy = "referral", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<ReferralDocument> links = new ArrayList<>();
}
