package com.example.ass2.service;

import com.example.ass2.model.Athlete;
import com.example.ass2.model.Coach;
import com.example.ass2.repository.AthleteRepository;
import com.example.ass2.repository.CoachRepository;
import com.example.ass2.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private AthleteRepository athleteRepository;

    @Autowired
    private CoachRepository coachRepository;

    @Override
    public Athlete findAthleteByUsername(String username) {
        // Return Athlete or null if not found
        return athleteRepository.findByUsername(username).orElse(null);
    }

    @Override
    public Coach findCoachByUsername(String username) {
        // Return Coach or null if not found
        return coachRepository.findByUsername(username);
    }

    @Override
    public boolean updateAthleteProfile(String username, Map<String, String> profileData) {
        // Find Athlete by username
        Athlete athlete = athleteRepository.findByUsername(username).orElse(null);
        if (athlete != null) {
            athlete.setFirstname(profileData.get("firstname"));
            athlete.setLastname(profileData.get("lastname"));
            athlete.setEmail(profileData.get("email"));
            athlete.setPassword(profileData.get("password"));
            athleteRepository.save(athlete);
            return true;
        }
        return false;
    }

    @Override
    public boolean updateCoachProfile(String username, Map<String, String> profileData) {
        // Find Coach by username directly (no Optional)
        Coach coach = coachRepository.findByUsername(username);
        if (coach != null) {
            coach.setFirstname(profileData.get("firstname"));
            coach.setLastname(profileData.get("lastname"));
            coach.setEmail(profileData.get("email"));
            coach.setPassword(profileData.get("password"));
            coachRepository.save(coach);
            return true;
        }
        return false;
    }
}
