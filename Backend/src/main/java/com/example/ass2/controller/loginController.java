package com.example.ass2.controller;

import com.example.ass2.controller.loginRequest;
import com.example.ass2.model.Athlete;
import com.example.ass2.model.Coach;
import com.example.ass2.repository.AthleteRepository;
import com.example.ass2.repository.coachRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity; // <-- Import this
import org.springframework.web.bind.annotation.*;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class loginController {

    @Autowired
    private AthleteRepository athleteRepository;

    @Autowired
    private coachRepository coachRepository;

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody loginRequest loginRequest) {
        String userType = loginRequest.getUserType();
        String username = loginRequest.getUsername();
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();

        if ("athlete".equalsIgnoreCase(userType)) {
            Athlete athlete = athleteRepository.findByUsernameAndEmailAndPassword(username, email, password);
            if (athlete != null) {
                return ResponseEntity.ok("Athlete logged in successfully /home");
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid athlete credentials");
            }
        } else if ("coach".equalsIgnoreCase(userType)) {
            Coach coach = coachRepository.findByUsernameAndEmailAndPassword(username, email, password);
            if (coach != null) {
                return ResponseEntity.ok("Coach logged in successfully /dashboard");
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid coach credentials");
            }
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid user type");
        }
    }
}
