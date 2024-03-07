package com.project.smfinance.models.referral;

import com.project.smfinance.entity.Referral;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReferralRequest {

  @NotNull private String referralFirstName;

  @NotNull private String referralLastName;

  private String referralEmail;

  @NotNull private String referralPhoneNumber;

  @NotEmpty private List<ReferralDocumentRequest> referralDocuments = new ArrayList<>();

  public static Referral from(ReferralRequest referralRequest) {
    Referral referral = new Referral();
    referral.setReferralEmail(referralRequest.getReferralEmail());
    referral.setReferralFirstName(referralRequest.getReferralFirstName());
    referral.setReferralLastName(referralRequest.getReferralLastName());
    referral.setReferralPhoneNumber(referralRequest.getReferralPhoneNumber());
    return referral;
  }
}
