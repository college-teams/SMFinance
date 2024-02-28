package com.project.smfinance.models.admin;

import com.project.smfinance.entity.Admin;
import java.util.List;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AdminDetailResponse {
  private long id;
  private String username;
  private String email;

  public static List<AdminDetailResponse> from(List<Admin> admins) {
    return admins.stream().map(AdminDetailResponse::from).collect(Collectors.toList());
  }

  public static AdminDetailResponse from(Admin admin) {
    AdminDetailResponse adminResponse = new AdminDetailResponse();
    adminResponse.setId(admin.getId());
    adminResponse.setEmail(admin.getEmail());
    adminResponse.setUsername(admin.getUsername());

    return adminResponse;
  }
}
