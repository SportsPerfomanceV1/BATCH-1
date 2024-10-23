package com.example.ass2.controller;

import com.example.ass2.model.Athlete;
import com.example.ass2.model.Coach;
import com.example.ass2.repository.AthleteRepository;
import com.example.ass2.repository.coachRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class signupController {

    @Autowired
    private AthleteRepository athleteRepository;

    @Autowired
    private coachRepository coachRepository;

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody SignupRequest signupRequest) {
        if (signupRequest.getUserType().equalsIgnoreCase("athlete")) {
            Athlete athlete = new Athlete();
            athlete.setFirstname(signupRequest.getFirstname());
            athlete.setLastname(signupRequest.getLastname());
            athlete.setMiddlename(signupRequest.getMiddlename());
            athlete.setUsername(signupRequest.getUsername());
            athlete.setPassword(signupRequest.getPassword());
            athlete.setEmail(signupRequest.getEmail());
            athleteRepository.save(athlete);

            return ResponseEntity.ok(Map.of("message", "Signup successful!").toString());

        } else if (signupRequest.getUserType().equalsIgnoreCase("coach")) {
            Coach coach = new Coach();
            coach.setFirstname(signupRequest.getFirstname());
            coach.setLastname(signupRequest.getLastname());
            coach.setMiddlename(signupRequest.getMiddlename());
            coach.setUsername(signupRequest.getUsername());
            coach.setPassword(signupRequest.getPassword());
            coach.setEmail(signupRequest.getEmail());
            coachRepository.save(coach);
            return ResponseEntity.ok(Map.of("message", "Signup successful!").toString());

        } else {
            return ResponseEntity.badRequest().body("Invalid user type!");
        }

    }

}



