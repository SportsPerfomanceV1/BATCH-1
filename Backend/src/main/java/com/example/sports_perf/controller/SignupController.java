package com.example.sports_perf.controller;

import com.example.sports_perf.dto.SignupRequest;
import com.example.sports_perf.model.Athlete;
import com.example.sports_perf.model.Coach;
import com.example.sports_perf.model.Admin;
import com.example.sports_perf.repository.AthleteRepo;
import com.example.sports_perf.repository.CoachRepo;
import com.example.sports_perf.repository.AdminRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class SignupController {

    @Autowired
    private AthleteRepo athleteRepo;

    @Autowired
    private CoachRepo coachRepo;

    @Autowired
    private AdminRepo adminRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/signup")
    public ResponseEntity<Map<String, String>> signup(@RequestBody SignupRequest signupRequest) {
        String userType = signupRequest.getUserType();

        if (!isValidUserType(userType)) {
            return ResponseEntity.badRequest().body(Map.of("error", "Invalid user type"));
        }

        String hashedPassword = passwordEncoder.encode(signupRequest.getPassword());
        saveUser(signupRequest, hashedPassword);

        return ResponseEntity.ok(Map.of("message", "Signup successful!"));
    }

    private boolean isValidUserType(String userType) {
        return List.of("athlete", "coach", "admin").contains(userType.toLowerCase());
    }

    private void saveUser(SignupRequest request, String hashedPassword) {
        switch (request.getUserType().toLowerCase()) {
            case "athlete" -> athleteRepo.save(new Athlete(
                    request.getFirstname(), request.getMiddlename(), request.getLastname(),
                    request.getUsername(), hashedPassword, request.getEmail()
            ));
            case "coach" -> coachRepo.save(new Coach(
                    request.getFirstname(), request.getMiddlename(), request.getLastname(),
                    request.getUsername(), hashedPassword, request.getEmail()
            ));
            case "admin" -> adminRepo.save(new Admin(
                    request.getFirstname(), request.getMiddlename(), request.getLastname(),
                    request.getUsername(), hashedPassword, request.getEmail()
            ));
        }
    }
}
