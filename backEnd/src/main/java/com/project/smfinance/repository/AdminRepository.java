package com.project.smfinance.repository;

import com.project.smfinance.entity.Admin;

import java.util.Optional;

public interface AdminRepository extends AbstractRepository<Admin>{
    Optional<Admin> findByEmail(String email);

    Optional<Admin> findByConfirmationToken(String confirmationToken);
}
