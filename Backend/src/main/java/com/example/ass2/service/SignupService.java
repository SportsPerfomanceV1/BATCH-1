package com.example.ass2.service;

import com.example.ass2.model.Athlete;
import com.example.ass2.model.Coach;
import com.example.ass2.model.Admin;
import com.example.ass2.repository.AthleteRepository;
import com.example.ass2.repository.CoachRepository;
import com.example.ass2.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class SignupService {

    @Autowired
    private AthleteRepository athleteRepository;

    @Autowired
    private CoachRepository coachRepository;

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public void registerUser(String userType, String firstname, String lastname, String middlename, String username, String email, String password) {
        String encodedPassword = passwordEncoder.encode(password);
        if ("athlete".equalsIgnoreCase(userType)) {
            Athlete athlete = new Athlete();
            athlete.setFirstname(firstname);
            athlete.setLastname(lastname);
            athlete.setMiddlename(middlename);
            athlete.setUsername(username);
            athlete.setEmail(email);
            athlete.setPassword(encodedPassword);
            athleteRepository.save(athlete);
        } else if ("coach".equalsIgnoreCase(userType)) {
            Coach coach = new Coach();
            coach.setFirstname(firstname);
            coach.setLastname(lastname);
            coach.setMiddlename(middlename);
            coach.setUsername(username);
            coach.setEmail(email);
            coach.setPassword(encodedPassword);
            coachRepository.save(coach);
        } else if ("admin".equalsIgnoreCase(userType)) {
            Admin admin = new Admin();
            admin.setFirstname(firstname);
            admin.setLastname(lastname);
            admin.setMiddlename(middlename);
            admin.setUsername(username);
            admin.setEmail(email);
            admin.setPassword(encodedPassword);
            adminRepository.save(admin);
        }
    }
}
