package com.example.ass2.service;

import com.example.ass2.model.Athlete;
import com.example.ass2.repository.AthleteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AthleteService {

    @Autowired
    private AthleteRepository athleteRepository;

    // Method to find an athlete by their username
    public Athlete findByUsername(String username) {
        Optional<Athlete> athlete = athleteRepository.findByUsername(username);
        return athlete.orElse(null); // Return athlete if found, else null
    }

    // Add more service methods as needed
}
