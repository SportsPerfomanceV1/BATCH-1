package com.example.ass2.controller;

import com.example.ass2.model.Athlete;
import com.example.ass2.model.Coach;
import com.example.ass2.repository.AthleteRepository;
import com.example.ass2.repository.coachRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class loginController {

    @Autowired
    private AthleteRepository athleteRepository;

    @Autowired
    private coachRepository coachRepository;

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> loginUser(@RequestBody loginRequest loginRequest) {
        String userType = loginRequest.getUserType();
        String username = loginRequest.getUsername();
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();

        Map<String, String> response = new HashMap<>();

        if ("athlete".equalsIgnoreCase(userType)) {
            Athlete athlete = athleteRepository.findByUsernameAndEmailAndPassword(username, email, password);
            if (athlete != null) {
                response.put("message", "Athlete logged in successfully");
                response.put("redirectUrl", "/home");
                return ResponseEntity.ok(response);
            } else {
                response.put("error", "Invalid athlete credentials");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }
        } else if ("coach".equalsIgnoreCase(userType)) {
            Coach coach = coachRepository.findByUsernameAndEmailAndPassword(username, email, password);
            if (coach != null) {
                response.put("message", "Coach logged in successfully");
                response.put("redirectUrl", "/dashboard");
                return ResponseEntity.ok(response);
            } else {
                response.put("error", "Invalid coach credentials");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }
        } else {
            response.put("error", "Invalid user type");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
}
