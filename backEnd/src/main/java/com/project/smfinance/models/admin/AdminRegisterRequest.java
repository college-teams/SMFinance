package com.project.smfinance.models.admin;

import com.project.smfinance.annotations.Email;
import com.project.smfinance.entity.Admin;
import com.project.smfinance.util.Role;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AdminRegisterRequest {

    @NotNull private String firstName;
    @NotNull private String lastName;

    @NotNull @Email() private String email;

    @NotNull private String password;

    @NotNull
    @Pattern(regexp = "\\+?\\d[\\d -]{8,12}\\d", message = "Invalid phone number format")
    private String phoneNumber;

    @NotNull private Role role;

    public static Admin from(AdminRegisterRequest userRegisterRequest) {
        Admin admin = new Admin();
        admin.setEmail(userRegisterRequest.getEmail());
        admin.setFirstName(userRegisterRequest.getFirstName());
        admin.setLastName(userRegisterRequest.getLastName());
        admin.setPassword(userRegisterRequest.getPassword());
        admin.setRole(userRegisterRequest.getRole());
        admin.setPhoneNumber(userRegisterRequest.getPhoneNumber());

        return admin;
    }
}