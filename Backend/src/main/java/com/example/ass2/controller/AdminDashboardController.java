package com.example.ass2.controller;

import com.example.ass2.repository.AthleteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class AdminDashboardController {

    @Autowired
    private AthleteRepository athleteRepository;

    @GetMapping("/admin/dashboard/athletes-count")
    public Map<String, Long> getAthleteCount() {
        long count = athleteRepository.count();
        return Map.of("athleteCount", count);
    }
}
