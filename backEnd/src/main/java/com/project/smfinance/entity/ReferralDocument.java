package com.project.smfinance.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.time.LocalDateTime;
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
  @JoinColumn(name = "referralId")
  private Referral referral;

  @Enumerated(EnumType.STRING)
  private DocumentType documentType;

  private String documentPath;

  private LocalDateTime uploadDate;

  public enum DocumentType {
    AADHAR,
    PAN,
    RATION_CARD
  }
}
