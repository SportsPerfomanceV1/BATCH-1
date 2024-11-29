package com.example.ass2.service;

import com.example.ass2.model.Athlete;
import com.example.ass2.model.Coach;
import com.example.ass2.repository.AthleteRepository;
import com.example.ass2.repository.CoachRepository;
import com.example.ass2.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private AthleteRepository athleteRepository;

    @Autowired
    private CoachRepository coachRepository;

    @Override
    public Athlete findAthleteByUsername(String username) {
        // Return Athlete or null if not found
        return athleteRepository.findByUsername(username);
    }

    @Override
    public Coach findCoachByUsername(String username) {
        // Return Coach or null if not found
        return coachRepository.findByUsername(username);
    }

    @Override
    public Athlete updateAthleteProfile(String username, Map<String, String> profileData) {
        Athlete athlete = athleteRepository.findByUsername(username);
        if (athlete != null) {
            if (profileData.containsKey("firstname")) athlete.setFirstname(profileData.get("firstname"));
            if (profileData.containsKey("lastname")) athlete.setLastname(profileData.get("lastname"));
            if (profileData.containsKey("email")) athlete.setEmail(profileData.get("email"));
            if (profileData.containsKey("password")) athlete.setPassword(profileData.get("password"));
            // Add other fields as necessary
            return athleteRepository.save(athlete);
        }
        return null;
    }

    @Override
    public Coach updateCoachProfile(String username, Map<String, String> profileData) {
        Coach coach = coachRepository.findByUsername(username);
        if (coach != null) {
            if (profileData.containsKey("firstname")) { coach.setFirstname(profileData.get("firstname")); }
            if (profileData.containsKey("lastname")) { coach.setLastname(profileData.get("lastname")); }
            if (profileData.containsKey("email")) { coach.setEmail(profileData.get("email")); }
            if (profileData.containsKey("password")) { coach.setPassword(profileData.get("password")); }
            return coachRepository.save(coach);
        }
        return null;
    }
}
