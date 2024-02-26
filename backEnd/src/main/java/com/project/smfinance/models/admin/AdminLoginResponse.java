package com.project.smfinance.models.admin;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AdminLoginResponse {

    private String token;

    public static AdminLoginResponse from(String token) {
        AdminLoginResponse adminLoginResponse = new AdminLoginResponse();
        adminLoginResponse.setToken(token);

        return adminLoginResponse;
    }
}
