package com.example.sports_perf.controller;

import com.example.sports_perf.dto.LoginRequest;
import com.example.sports_perf.model.Athlete;
import com.example.sports_perf.model.Coach;
import com.example.sports_perf.model.Admin;
import com.example.sports_perf.repository.AthleteRepo;
import com.example.sports_perf.repository.CoachRepo;
import com.example.sports_perf.repository.AdminRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class LoginController {

    @Autowired
    private AthleteRepo athleteRepo;

    @Autowired
    private CoachRepo coachRepo;

    @Autowired
    private AdminRepo adminRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> loginUser(@RequestBody LoginRequest loginRequest) {
        String userType = loginRequest.getUserType();
        String username = loginRequest.getUsername();
        String password = loginRequest.getPassword();

        Object user = null;

        // Validate user based on type
        if ("athlete".equalsIgnoreCase(userType)) {
            user = athleteRepo.findByUsername(username);
        } else if ("coach".equalsIgnoreCase(userType)) {
            user = coachRepo.findByUsername(username);
        } else if ("admin".equalsIgnoreCase(userType)) {
            user = adminRepo.findByUsername(username);
        }

        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Invalid username or user type"));
        }

        // Validate password
        if (user instanceof Athlete athlete && passwordEncoder.matches(password, athlete.getPassword()) ||
                user instanceof Coach coach && passwordEncoder.matches(password, coach.getPassword()) ||
                user instanceof Admin admin && passwordEncoder.matches(password, admin.getPassword())) {

            // Define redirect URLs dynamically
            String redirectUrl = switch (userType.toLowerCase()) {
                case "athlete" -> "/home";
                case "coach" -> "/dashboard";
                case "admin" -> "/admin";
                default -> "/";
            };

            return ResponseEntity.ok(Map.of(
                    "message", "Login successful",
                    "redirectUrl", redirectUrl
            ));
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("error", "Invalid credentials"));
    }
}
