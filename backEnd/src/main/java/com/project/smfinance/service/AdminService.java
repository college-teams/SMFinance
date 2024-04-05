package com.project.smfinance.service;

import static com.project.smfinance.codes.ErrorCodes.ADMIN_NOT_EXISTS;
import static com.project.smfinance.codes.SuccessCodes.ADMIN_LOGIN_SUCCESS;
import static com.project.smfinance.codes.SuccessCodes.CURRENT_ADMIN_DETAILS_FETCHED;

import com.project.smfinance.config.JwtService;
import com.project.smfinance.entity.Admin;
import com.project.smfinance.exception.BaseException;
import com.project.smfinance.models.admin.AdminDetailResponse;
import com.project.smfinance.models.admin.AdminLoginRequest;
import com.project.smfinance.models.admin.AdminLoginResponse;
import com.project.smfinance.models.response.AbstractResponse;
import com.project.smfinance.models.response.ApiResponse;
import com.project.smfinance.repository.AdminRepository;
import jakarta.annotation.PostConstruct;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminService {

  private final AdminRepository adminRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;
  private final AuthenticationManager authenticationManager;

  @PostConstruct
  public void adminSetup() {
    Optional<Admin> searchByEmail = adminRepository.findByEmail("Kongukumar2265@gmail.com");
    if (searchByEmail.isEmpty()) {
      Admin admin = new Admin();
      admin.setName("Kumar");
      admin.setEmail("kongukumar2265@gmail.com");
      admin.setPassword(passwordEncoder.encode("Kumar@0222"));
      adminRepository.save(admin);
    }
  }

  public ApiResponse<AdminDetailResponse> getAdminSelf() {
    Admin currentUser = getCurrentAdmin();
    return new ApiResponse<>(
        CURRENT_ADMIN_DETAILS_FETCHED,
        AbstractResponse.StatusType.SUCCESS,
        AdminDetailResponse.from(currentUser));
  }

  public ApiResponse<AdminLoginResponse> authenticate(AdminLoginRequest request)
      throws BaseException {
    authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
    var admin = adminRepository.findByEmail(request.getEmail());

    if (admin.isEmpty()) {
      throw new BaseException(ADMIN_NOT_EXISTS);
    }

    var jwtToken = jwtService.generateToken(admin.get());
    return new ApiResponse<>(
        ADMIN_LOGIN_SUCCESS,
        AbstractResponse.StatusType.SUCCESS,
        AdminLoginResponse.from(jwtToken));
  }

  private Admin getCurrentAdmin() {
    return (Admin) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
  }
}
