package com.example.ass2.service;

import com.example.ass2.model.Athlete;
import com.example.ass2.model.Coach;

import java.util.Map;

public interface UserService {
    Athlete findAthleteByUsername(String username);
    Coach findCoachByUsername(String username);
    boolean updateAthleteProfile(String username, Map<String, String> profileData);
    boolean updateCoachProfile(String username, Map<String, String> profileData);
}
