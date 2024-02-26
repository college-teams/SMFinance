package com.project.smfinance.service;

import com.project.smfinance.config.JwtService;
import com.project.smfinance.entity.Admin;
import com.project.smfinance.exception.BaseException;
import com.project.smfinance.models.admin.*;
import com.project.smfinance.models.response.AbstractResponse;
import com.project.smfinance.models.response.ApiResponse;
import com.project.smfinance.repository.AdminRepository;
import com.project.smfinance.util.Role;
import jakarta.annotation.PostConstruct;
import jakarta.mail.MessagingException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import static com.project.smfinance.codes.ErrorCodes.*;
import static com.project.smfinance.codes.SuccessCodes.*;


import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.UUID;
import org.thymeleaf.context.Context;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final EmailService emailService;
    private final AccessControlService accessControlService;

    @Value("${application.backend-url}")
    private String Application_url;

    @PostConstruct
    public void adminSetup() {
        Optional<Admin> searchByEmail = adminRepository.findByEmail("rahul09@gmail.com");
        if (searchByEmail.isEmpty()) {
            Admin admin = new Admin();
            admin.setFirstName("Rahul");
            admin.setEmail("rahul09@gmail.com");
            admin.setLastName("saash");
            admin.setPhoneNumber("7502919281");
            admin.setRole(Role.ADMIN);
            admin.setAccountVerified(true);
            admin.setPassword(passwordEncoder.encode("Crnational6@"));
            adminRepository.save(admin);
        }
    }

    public ApiResponse<AdminDetailResponse> getAdminSelf() {
        Admin currentUser = accessControlService.getCurrentAdmin();
        return new ApiResponse<>(
                CURRENT_ADMIN_DETAILS_FETCHED,
                AbstractResponse.StatusType.SUCCESS,
                AdminDetailResponse.from(currentUser));
    }

    public ApiResponse<List<AdminDetailResponse>> getAdminList() {
        return new ApiResponse<>(
                All_ADMIN_DETAILS_FETCHED,
                AbstractResponse.StatusType.SUCCESS,
                AdminDetailResponse.from(adminRepository.findAll()));
    }

    public ApiResponse<AdminDetailResponse> getAdminDetailsById(long userId) throws BaseException {
        Admin admin = getAdminById(userId);
        return new ApiResponse<>(
                All_ADMIN_DETAILS_FETCHED,
                AbstractResponse.StatusType.SUCCESS,
                AdminDetailResponse.from(admin));
    }

    @Transactional
    public ApiResponse<?> register(AdminRegisterRequest request)
            throws BaseException, MessagingException {
        Optional<Admin> adminByEmail = adminRepository.findByEmail(request.getEmail());

        var verificationCode = generateVerificationCode();

        if (adminByEmail.isPresent()) {
            if (adminByEmail.get().isAccountVerified()) {
                throw new BaseException(ADMIN_ALREADY_EXISTS);
            } else {
                adminByEmail.get().setConfirmationToken(verificationCode);
                adminRepository.save(adminByEmail.get());
                sendVerificationEmail(adminByEmail.get());
                throw new BaseException(ACCOUNT_ALREADY_EXISTS);
            }
        }

        request.setPassword(passwordEncoder.encode(request.getPassword()));
        var admin = AdminRegisterRequest.from(request);
        admin.setConfirmationToken(verificationCode);
        adminRepository.save(admin);

        //    send email
        sendVerificationEmail(admin);

        return new ApiResponse<>(ADMIN_REGISTER_SUCCESS, AbstractResponse.StatusType.SUCCESS);
    }

    public ApiResponse<AdminLoginResponse> authenticate(AdminLoginRequest request)
            throws BaseException {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        var user = adminRepository.findByEmail(request.getEmail()).get();

        if (!user.isAccountVerified()) {
            throw new BaseException(ACCOUNT_NOT_VERIFIED);
        }

        var jwtToken = jwtService.generateToken(user);
        return new ApiResponse<>(
                ADMIN_LOGIN_SUCCESS, AbstractResponse.StatusType.SUCCESS, AdminLoginResponse.from(jwtToken));
    }

    public void signupConfirmation(String confirmationToken) throws BaseException {
        Optional<Admin> adminByConfirmationToken =
                adminRepository.findByConfirmationToken(confirmationToken);
        if (adminByConfirmationToken.isPresent()) {
            if (adminByConfirmationToken.get().isAccountVerified()) {
                throw new RuntimeException("Admin already verified");
            }
            adminByConfirmationToken.get().setAccountVerified(true);
            adminRepository.save(adminByConfirmationToken.get());
        } else {
            throw new BaseException(EMAIL_VERIFICATION_FAILED);
        }
    }

    public ApiResponse<?> generateOtpForForgotPassword(ForgotPasswordRequest forgotPasswordRequest)
            throws Exception {
        String email = forgotPasswordRequest.getEmail();
        Optional<Admin> adminByEmail = adminRepository.findByEmail(email);
        if (adminByEmail.isEmpty()) {
            throw new BaseException(ADMIN_NOT_EXISTS);
        }
        if (!adminByEmail.get().isAccountVerified()) {
            throw new BaseException(ACCOUNT_NOT_VERIFIED);
        }

        var admin = adminByEmail.get();
        String otp = generateOtp();
        admin.setOtp(otp);
        admin.setOtpValidityTimestamp(System.currentTimeMillis());
        adminRepository.save(admin);

        sendForgotPasswordEmail(admin);

        return new ApiResponse<>(FORGOT_PASSWORD_REQUEST_SENDS, AbstractResponse.StatusType.SUCCESS);
    }

    private String generateVerificationCode() {
        return UUID.randomUUID().toString();
    }

    private void sendVerificationEmail(Admin admin) throws MessagingException {
        String to = admin.getEmail();
        String subject = "Account verification";

        Context context = new Context();
        context.setVariable("Name", "Hello, " + admin.getFirstName() + " " + admin.getLastName());
        context.setVariable(
                "link",
                Application_url
                        + "/api/v1/admin/validate?confirmationToken="
                        + admin.getConfirmationToken());

        emailService.sendEmail(to, subject, "accountVerification", context);
    }

    public String generateOtp() {
        Random r = new Random(System.currentTimeMillis());
        return Integer.toString(10000 + r.nextInt(20000));
    }

    public void sendForgotPasswordEmail(Admin admin) throws Exception {

        String to = admin.getEmail();
        String subject = "Otp for Forgot password";

        Context context = new Context();
        context.setVariable("Name", "Hello, " + admin.getFirstName() + " " + admin.getLastName());
        context.setVariable("otp", admin.getOtp());

        emailService.sendEmail(to, subject, "forgotPasswordRequest", context);
    }

    public Admin getAdminById(Long id) throws BaseException {
        Optional<Admin> admin = adminRepository.findById(id);

        if (admin.isEmpty()) {
            throw new BaseException(ADMIN_NOT_EXISTS);
        }
        return admin.get();
    }


}
