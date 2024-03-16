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

  @NotNull private String firstName;

  @NotNull private String lastName;

  private String email;

  @NotNull private String phoneNumber;

  @NotEmpty private List<ReferralDocumentRequest> documents = new ArrayList<>();

  public static Referral from(ReferralRequest referralRequest) {
    Referral referral = new Referral();
    referral.setEmail(referralRequest.getEmail());
    referral.setFirstName(referralRequest.getFirstName());
    referral.setLastName(referralRequest.getLastName());
    referral.setPhoneNumber(referralRequest.getPhoneNumber());
    return referral;
  }
}
