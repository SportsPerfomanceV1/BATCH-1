package com.example.ass2.controller;

import com.example.ass2.model.Admin;
import com.example.ass2.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Admin loginRequest) {
        Optional<Admin> admin = adminService.authenticateAdmin(
                loginRequest.getUsername(),
                loginRequest.getEmail(),
                loginRequest.getPassword()
        );

        if (admin.isPresent()) {
            // Return a response with a dashboard URL
            return ResponseEntity.ok("/admin/dashboard");
        } else {
            // Return an unauthorized status with a message
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }
}
