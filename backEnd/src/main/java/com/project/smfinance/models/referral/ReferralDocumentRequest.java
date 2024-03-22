package com.project.smfinance.models.referral;

import static com.project.smfinance.codes.ErrorCodes.UNSUPPORTED_FILE_TYPE;

import com.project.smfinance.entity.Referral;
import com.project.smfinance.entity.ReferralDocument;
import com.project.smfinance.exception.BaseException;
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

  @NotNull private String documentKey;

  @NotNull private String documentContentType;

  public static ReferralDocument from(
      ReferralDocumentRequest referralDocumentRequest, Referral referral) throws BaseException {

    if (!referralDocumentRequest.getDocumentContentType().startsWith("image/")
        && !referralDocumentRequest.getDocumentContentType().equals("application/pdf")) {
      throw new BaseException(UNSUPPORTED_FILE_TYPE);
    }

    ReferralDocument referralDocument = new ReferralDocument();
    referralDocument.setReferral(referral);
    referralDocument.setDocumentPath(referralDocumentRequest.getDocumentPath());
    referralDocument.setDocumentType(referralDocumentRequest.getDocumentType());
    referralDocument.setDocumentContentType(referralDocumentRequest.getDocumentContentType());
    referralDocument.setDocumentKey(referralDocumentRequest.getDocumentKey());
    return referralDocument;
  }
}
