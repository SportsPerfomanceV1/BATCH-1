package com.example.ass2.controller;

import com.example.ass2.model.Athlete;
import com.example.ass2.model.Coach;
import com.example.ass2.model.Admin;
import com.example.ass2.repository.AthleteRepository;
import com.example.ass2.repository.CoachRepository;
import com.example.ass2.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class LoginController {

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AthleteRepository athleteRepository;
    @Autowired
    private CoachRepository coachRepository;
    @Autowired
    private AdminRepository adminRepository;

    // Login user by userType
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> loginUser(@RequestBody LoginRequest loginRequest) {
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();

        Map<String, String> response = new HashMap<>();

        Athlete athlete = athleteRepository.findByEmail(email);
        if (athlete != null && passwordEncoder.matches(password, athlete.getPassword())) {
            response.put("message", "Athlete logged in successfully");
            response.put("userType", "athlete");
            response.put("username", athlete.getUsername());
            response.put("firstname", athlete.getFirstname());
            response.put("redirectUrl", "/home");
            return ResponseEntity.ok(response);
        }

        Coach coach = coachRepository.findByEmail(email);
        if (coach != null && passwordEncoder.matches(password, coach.getPassword())) {
            response.put("message", "Coach logged in successfully");
            response.put("userType", "coach");
            response.put("username", coach.getUsername());
            response.put("firstname", coach.getFirstname());
            response.put("redirectUrl", "/home");
            return ResponseEntity.ok(response);
        }

        Admin admin = adminRepository.findByEmail(email);
        if (admin != null && passwordEncoder.matches(password, admin.getPassword())) {
            response.put("message", "Admin logged in successfully");
            response.put("userType", "admin");
            response.put("username", admin.getUsername());
            response.put("firstname", admin.getFirstname());
            response.put("redirectUrl", "/admin-dashboard");
            return ResponseEntity.ok(response);
        }

        response.put("error", "Invalid credentials");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    }
}
