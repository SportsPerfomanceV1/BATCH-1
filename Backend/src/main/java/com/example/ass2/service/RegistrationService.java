package com.example.ass2.service;

import com.example.ass2.model.Registration;
import com.example.ass2.repository.RegistrationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class RegistrationService {

    @Autowired
    private RegistrationRepository registrationRepository;

    // Method to register an athlete
    public Registration registerAthlete(Long eventId, Long athleteId) {
        Registration registration = new Registration();
        registration.setEventId(eventId);
        registration.setAthleteId(athleteId);
        registration.setRegistrationDate(LocalDate.now()); // Set current date
        registration.setStatus("Pending"); // Set status to pending
        return registrationRepository.save(registration); // Save to database
    }

    // New method to find registrations by athlete ID
    public List<Registration> findByAthleteId(Long athleteId) {
        return registrationRepository.findByAthleteId(athleteId); // Use repository method to fetch registrations
    }
}
