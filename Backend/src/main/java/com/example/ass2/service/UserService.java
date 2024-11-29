package com.example.ass2.service;

import com.example.ass2.model.Athlete;
import com.example.ass2.model.Coach;

import java.util.Map;

public interface UserService {
    Athlete findAthleteByUsername(String username);
    Coach findCoachByUsername(String username);
    Athlete updateAthleteProfile(String username, Map<String, String> profileData);
    Coach updateCoachProfile(String username, Map<String, String> profileData);
}
