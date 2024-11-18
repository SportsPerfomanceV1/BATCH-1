package com.example.sports_perf.service;

import com.example.sports_perf.model.Coach;
import com.example.sports_perf.repository.CoachRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CoachService {

    @Autowired
    private CoachRepo coachRepo;

    // Find a coach by username
    public Coach findByUsername(String username) {
        Optional<Coach> coach = coachRepo.findByUsername(username);
        return coach.orElse(null);
    }

    // Create or save a coach
    public Coach saveCoach(Coach coach) {
        return coachRepo.save(coach);
    }

    // Find coach by ID
    public Optional<Coach> findById(Long id) {
        return coachRepo.findById(id);
    }

    // Delete a coach by ID
    public void deleteById(Long id) {
        coachRepo.deleteById(id);
    }
}
