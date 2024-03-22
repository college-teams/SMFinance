package com.project.smfinance.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CustomerDocument extends BaseEntity {

  @ManyToOne
  @JsonIgnore
  @JoinColumn(name = "customerId")
  private Customer customer;

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
