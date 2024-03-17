package com.project.smfinance.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ReferralDocument extends BaseEntity {

  @ManyToOne
  @JsonIgnore
  @JoinColumn(name = "referralId")
  private Referral referral;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private DocumentType documentType;

  @Column(nullable = false)
  private String documentPath;

  @Column(nullable = false)
  private String documentKey;

  @Column(nullable = false)
  private String documentContentType;

  public enum DocumentType {
    AADHAR,
    PAN,
    RATION_CARD
  }
}
