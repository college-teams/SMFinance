package com.project.smfinance.models.admin;

import com.project.smfinance.entity.Admin;
import com.project.smfinance.util.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AdminDetailResponse {
    private long id;
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private Role role;


    public static List<AdminDetailResponse> from(List<Admin> admins) {
        return admins.stream().map(AdminDetailResponse::from).collect(Collectors.toList());
    }

    public static AdminDetailResponse from(Admin admin) {
        AdminDetailResponse adminResponse = new AdminDetailResponse();
        adminResponse.setId(admin.getCustomerId());
        adminResponse.setEmail(admin.getEmail());
        adminResponse.setFirstName(admin.getFirstName());
        adminResponse.setLastName(admin.getLastName());
        adminResponse.setRole(admin.getRole());
        adminResponse.setPhoneNumber(admin.getPhoneNumber());

        return adminResponse;
    }
}
