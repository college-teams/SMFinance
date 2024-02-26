package com.project.smfinance.controller;

import com.project.smfinance.exception.BaseException;
import com.project.smfinance.models.admin.*;
import com.project.smfinance.models.response.ApiResponse;
import com.project.smfinance.service.AdminService;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import java.util.List;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @Value("${application.frontend-url}")
    private String Application_url;

    @GetMapping("/self")
    public ResponseEntity<ApiResponse<AdminDetailResponse>> getLoggedInUserDetails() {
        return new ResponseEntity<>(adminService.getAdminSelf(), HttpStatus.OK);
    }

    @GetMapping("/")
    @PreAuthorize("@accessControlService.isAdmin()")
    public ResponseEntity<ApiResponse<List<AdminDetailResponse>>> getAllUserDetails() {
        return new ResponseEntity<>(adminService.getAdminList(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @PreAuthorize("@accessControlService.isAdmin()")
    public ResponseEntity<ApiResponse<AdminDetailResponse>> getAdminDetails(@PathVariable Long id)
            throws BaseException {
        return new ResponseEntity<>(adminService.getAdminDetailsById(id), HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody AdminRegisterRequest request)
            throws BaseException, MessagingException {
        return new ResponseEntity<>(adminService.register(request), HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AdminLoginResponse>> authenticate(
            @Valid @RequestBody AdminLoginRequest request) throws BaseException {
        return new ResponseEntity<>(adminService.authenticate(request), HttpStatus.OK);
    }

    @GetMapping("/validate")
    public RedirectView signupConfirmation(
            @RequestParam("confirmationToken") String confirmationToken) throws BaseException {
        adminService.signupConfirmation(confirmationToken);

        RedirectView redirectView = new RedirectView();
        redirectView.setUrl(Application_url + "/emailVerification");
        return redirectView;
    }

    @PostMapping(value = "/forgot-password/otp-generate")
    public ResponseEntity<?> forgotPassword(@RequestBody ForgotPasswordRequest forgotPasswordRequest)
            throws Exception {
        return new ResponseEntity<>(
                adminService.generateOtpForForgotPassword(forgotPasswordRequest), HttpStatus.OK);
    }

}
