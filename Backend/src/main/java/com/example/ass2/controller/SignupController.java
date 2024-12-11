package com.example.ass2.controller;

import com.example.ass2.model.Athlete;
import com.example.ass2.model.Coach;
import com.example.ass2.model.Admin;
import com.example.ass2.repository.AthleteRepository;
import com.example.ass2.repository.CoachRepository;
import com.example.ass2.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class SignupController {

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AthleteRepository athleteRepository;
    @Autowired
    private CoachRepository coachRepository;
    @Autowired
    private AdminRepository adminRepository;

    // Signup a user based on UserType
    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody SignupRequest signupRequest) {
        String encryptedPassword = passwordEncoder.encode(signupRequest.getPassword());
        if (signupRequest.getUserType().equalsIgnoreCase("athlete")) {
            Athlete athlete = new Athlete();
            athlete.setFirstname(signupRequest.getFirstname());
            athlete.setLastname(signupRequest.getLastname());
            athlete.setUsername(signupRequest.getUsername());
            athlete.setPassword(encryptedPassword);
            athlete.setEmail(signupRequest.getEmail());
            athleteRepository.save(athlete);

            return ResponseEntity.ok(Map.of("message", "Signup successful!").toString());

        } else if (signupRequest.getUserType().equalsIgnoreCase("coach")) {
            Coach coach = new Coach();
            coach.setFirstname(signupRequest.getFirstname());
            coach.setLastname(signupRequest.getLastname());
            coach.setUsername(signupRequest.getUsername());
            coach.setPassword(encryptedPassword);
            coach.setEmail(signupRequest.getEmail());
            coachRepository.save(coach);
            return ResponseEntity.ok(Map.of("message", "Signup successful!").toString());

        } else if (signupRequest.getUserType().equalsIgnoreCase("admin")) {
            Admin admin = new Admin();
            admin.setFirstname(signupRequest.getFirstname());
            admin.setLastname(signupRequest.getLastname());
            admin.setUsername(signupRequest.getUsername());
            admin.setPassword(encryptedPassword);
            admin.setEmail(signupRequest.getEmail());
            adminRepository.save(admin);
            return ResponseEntity.ok(Map.of("message", "Signup successful!").toString());

        } else {
            return ResponseEntity.badRequest().body("Invalid user type!");
        }
    }
}
