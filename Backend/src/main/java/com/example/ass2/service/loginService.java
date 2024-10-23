package com.example.ass2.service;

import com.example.ass2.model.Athlete;
import com.example.ass2.model.Coach;
import com.example.ass2.repository.AthleteRepository;
import com.example.ass2.repository.coachRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class loginService {

    @Autowired
    private AthleteRepository athleteRepository;

    @Autowired
    private coachRepository coachRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public String loginUser(String userType, String username, String email, String password) {
        if ("athlete".equalsIgnoreCase(userType)) {
            Athlete athlete = athleteRepository.findByUsernameAndEmailAndPassword(username,email, password);
            if (athlete != null && passwordEncoder.matches(password, athlete.getPassword())) {
                return "Athlete login successful";
            }
        } else if ("coach".equalsIgnoreCase(userType)) {
            Coach coach = coachRepository.findByUsernameAndEmailAndPassword(username,email,password);
            if (coach != null && passwordEncoder.matches(password, coach.getPassword())) {
                return "Coach login successful";
            }
        }
        return "Login failed. Invalid credentials or user type.";
    }
}
