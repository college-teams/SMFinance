package com.project.smfinance.models.referral;

import com.project.smfinance.entity.Referral;
import com.project.smfinance.entity.ReferralDocument;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReferralDocumentRequest {

  @NotNull private ReferralDocument.DocumentType documentType;

  @NotNull private String documentPath;

  public static ReferralDocument from(
      ReferralDocumentRequest referralDocumentRequest, Referral referral) {
    ReferralDocument referralDocument = new ReferralDocument();
    referralDocument.setReferral(referral);
    referralDocument.setDocumentPath(referralDocumentRequest.getDocumentPath());
    referralDocument.setDocumentType(referralDocumentRequest.getDocumentType());
    return referralDocument;
  }
}
