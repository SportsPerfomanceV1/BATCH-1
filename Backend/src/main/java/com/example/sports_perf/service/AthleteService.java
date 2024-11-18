package com.example.sports_perf.service;

import com.example.sports_perf.model.Athlete;
import com.example.sports_perf.repository.AthleteRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AthleteService {

    @Autowired
    private AthleteRepo athleteRepo;

    // Find an athlete by username
    public Athlete findByUsername(String username) {
        Optional<Athlete> athlete = athleteRepo.findByUsername(username);
        return athlete.orElse(null);
    }

    // Create or save an athlete
    public Athlete saveAthlete(Athlete athlete) {
        return athleteRepo.save(athlete);
    }

    // Find athlete by ID
    public Optional<Athlete> findById(Long id) {
        return athleteRepo.findById(id);
    }

    // Delete an athlete by ID
    public void deleteById(Long id) {
        athleteRepo.deleteById(id);
    }
}
