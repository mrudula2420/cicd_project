package com.example.demo.service;

import com.example.demo.dto.AdminAuthResponse;
import com.example.demo.dto.AdminLoginRequest;
import com.example.demo.model.Admin;
import com.example.demo.repository.AdminRepository;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class AdminAuthService {
    private final AdminRepository adminRepository;

    public AdminAuthService(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    public AdminAuthResponse login(AdminLoginRequest request) {
        Admin admin = adminRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new IllegalArgumentException("Invalid admin credentials"));
        if (!admin.getPassword().equals(request.getPassword())) {
            throw new IllegalArgumentException("Invalid admin credentials");
        }
        String token = UUID.randomUUID().toString();
        return new AdminAuthResponse(admin.getId(), admin.getUsername(), token);
    }
}