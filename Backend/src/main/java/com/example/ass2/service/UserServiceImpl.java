package com.example.ass2.service;

import com.example.ass2.model.Admin;
import com.example.ass2.model.Athlete;
import com.example.ass2.model.Coach;
import com.example.ass2.repository.AdminRepository;
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
    @Autowired
    private AdminRepository adminRepository;

    @Override
    public Athlete findAthleteByUsername(String username) {
        return athleteRepository.findByUsername(username);
    }

    @Override
    public Coach findCoachByUsername(String username) {
        return coachRepository.findByUsername(username);
    }

    @Override
    public Admin findAdminByUsername(String username){
        return adminRepository.findByUsername(username);
    }

    @Override
    public Athlete updateAthleteProfile(String username, Map<String, String> profileData) {
        Athlete athlete = athleteRepository.findByUsername(username);
        if (athlete != null) {
            athlete.setFirstname(profileData.get("firstname"));
            athlete.setLastname(profileData.get("lastname"));
            athlete.setEmail(profileData.get("email"));
            athlete.setPassword(profileData.get("password"));
            return athleteRepository.save(athlete);
        }
        return null;
    }

    @Override
    public Coach updateCoachProfile(String username, Map<String, String> profileData) {
        Coach coach = coachRepository.findByUsername(username);
        if (coach != null) {
            coach.setFirstname(profileData.get("firstname"));
            coach.setLastname(profileData.get("lastname"));
            coach.setEmail(profileData.get("email"));
            coach.setPassword(profileData.get("password"));
            return coachRepository.save(coach);
        }
        return null;
    }

    @Override
    public Admin updateAdminProfile(String username, Map<String, String> profileData) {
        Admin admin = adminRepository.findByUsername(username);
        if (admin != null) {
            admin.setFirstname(profileData.get("firstname"));
            admin.setLastname(profileData.get("lastname"));
            admin.setEmail(profileData.get("email"));
            if (profileData.containsKey("password")) { admin.setPassword(profileData.get("password")); }
            return adminRepository.save(admin);
        }
        return null;
    }
}
