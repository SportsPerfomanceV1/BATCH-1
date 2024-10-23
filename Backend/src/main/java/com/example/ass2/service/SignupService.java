package com.example.ass2.service;

import com.example.ass2.model.Athlete;
import com.example.ass2.model.Coach;
import com.example.ass2.repository.AthleteRepository;
import com.example.ass2.repository.coachRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SignupService {
    @Autowired
    private AthleteRepository athleteRepository;

    @Autowired
    private coachRepository coachRepository;

    public void registerUser(String userType, String firstname, String lastname, String middlename, String username, String email, String password) {
        if ("athlete".equalsIgnoreCase(userType)) {
            Athlete athlete = new Athlete();
            athlete.setFirstname(firstname);
            athlete.setLastname(lastname);
            athlete.setMiddlename(middlename);
            athlete.setUsername(username);
            athlete.setEmail(email);
            athlete.setPassword(password);
            athleteRepository.save(athlete);
        } else if ("coach".equalsIgnoreCase(userType)) {
            Coach coach = new Coach();
            coach.setFirstname(firstname);
            coach.setLastname(lastname);
            coach.setMiddlename(middlename);
            coach.setUsername(username);
            coach.setEmail(email);
            coach.setPassword(password);
            coachRepository.save(coach);
        }
    }
}
