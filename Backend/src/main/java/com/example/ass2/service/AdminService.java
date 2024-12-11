package com.example.ass2.service;

import com.example.ass2.model.Admin;
import com.example.ass2.model.Athlete;
import com.example.ass2.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

// AdminService.java
@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    public Admin findByUsername(String username) { return adminRepository.findByUsername(username); }
    public Optional<Admin> authenticateAdmin(String username, String email, String password) {
        return adminRepository.findByUsernameAndEmailAndPassword(username, email, password);
    }
}

