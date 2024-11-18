package com.example.sports_perf.service;

import com.example.sports_perf.model.Athlete;
import com.example.sports_perf.model.Coach;
import com.example.sports_perf.repository.AthleteRepo;
import com.example.sports_perf.repository.CoachRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private AthleteRepo athleteRepo;

    @Autowired
    private CoachRepo coachRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public Optional<Athlete> findAthleteByUsername(String username) {
        return Optional.ofNullable(athleteRepo.findByUsername(username).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Athlete not found"))); // 404 error
    }

    @Override
    public Optional<Coach> findCoachByUsername(String username) {
        return Optional.ofNullable(coachRepo.findByUsername(username).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Athlete not found"))); // 404 error
    }

    @Transactional
    @Override
    public boolean updateAthleteProfile(String username, Map<String, String> profileData) {
        if (profileData == null || profileData.isEmpty()) {
            throw new IllegalArgumentException("Profile data cannot be empty");
        }
        return athleteRepo.findByUsername(username).map(athlete -> {
            if (profileData.containsKey("firstname")) athlete.setFirstname(profileData.get("firstname"));
            if (profileData.containsKey("lastname")) athlete.setLastname(profileData.get("lastname"));
            if (profileData.containsKey("email")) athlete.setEmail(profileData.get("email"));
            if (profileData.containsKey("password")) athlete.setPassword(passwordEncoder.encode(profileData.get("password")));
            athleteRepo.save(athlete);
            return true;
        }).orElse(false);
    }

    @Transactional
    @Override
    public boolean updateCoachProfile(String username, Map<String, String> profileData) {
        if (profileData == null || profileData.isEmpty()) {
            throw new IllegalArgumentException("Profile data cannot be empty");
        }
        return coachRepo.findByUsername(username).map(athlete -> {
            if (profileData.containsKey("firstname")) athlete.setFirstname(profileData.get("firstname"));
            if (profileData.containsKey("lastname")) athlete.setLastname(profileData.get("lastname"));
            if (profileData.containsKey("email")) athlete.setEmail(profileData.get("email"));
            if (profileData.containsKey("password")) athlete.setPassword(passwordEncoder.encode(profileData.get("password")));
            coachRepo.save(athlete);
            return true;
        }).orElse(false);
    }
}
