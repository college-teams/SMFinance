package com.project.smfinance.models.admin;

import com.project.smfinance.annotations.Email;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AdminLoginRequest {

  @NotNull @Email() private String email;

  @NotNull private String password;
}
