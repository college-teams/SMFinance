package com.project.smfinance.service;

import com.project.smfinance.entity.Admin;
import com.project.smfinance.util.Role;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class AccessControlService {

    public boolean isAdmin() {
        Admin admin = getCurrentAdmin();
        return Role.ADMIN.equals(admin.getRole());
    }

    public Admin getCurrentAdmin() {
        return (Admin) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }


}
