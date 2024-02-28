package com.project.smfinance.controller;

import com.project.smfinance.exception.BaseException;
import com.project.smfinance.models.admin.AdminDetailResponse;
import com.project.smfinance.models.admin.AdminLoginRequest;
import com.project.smfinance.models.admin.AdminLoginResponse;
import com.project.smfinance.models.response.ApiResponse;
import com.project.smfinance.service.AdminService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

  private final AdminService adminService;

  @GetMapping("/self")
  public ResponseEntity<ApiResponse<AdminDetailResponse>> getLoggedInUserDetails() {
    return new ResponseEntity<>(adminService.getAdminSelf(), HttpStatus.OK);
  }

  @PostMapping("/login")
  public ResponseEntity<ApiResponse<AdminLoginResponse>> authenticate(
      @Valid @RequestBody AdminLoginRequest request) throws BaseException {
    return new ResponseEntity<>(adminService.authenticate(request), HttpStatus.OK);
  }
}
