package com.project.smfinance.service;

import com.project.smfinance.entity.Admin;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class AccessControlService {

  public Admin getCurrentAdmin() {
    return (Admin) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
  }
}
