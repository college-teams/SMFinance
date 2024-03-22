package com.project.smfinance.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
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

  @Column(nullable = false)
  private String firstName;

  @Column(nullable = false)
  private String lastName;

  private String email;

  @Column(nullable = false)
  private String phoneNumber;

  @OneToMany(
      mappedBy = "referral",
      cascade = CascadeType.ALL,
      orphanRemoval = true,
      fetch = FetchType.EAGER)
  private List<ReferralDocument> documents = new ArrayList<>();
}
