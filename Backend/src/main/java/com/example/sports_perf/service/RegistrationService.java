package com.example.sports_perf.service;

import com.example.sports_perf.model.Registration;
import com.example.sports_perf.repository.RegistrationRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RegistrationService {

    @Autowired
    private RegistrationRepo registrationRepo;

    // Register an athlete for an event
    public Registration registerAthlete(Long eventId, Long athleteId) {
        Registration registration = new Registration();
        registration.setEventId(eventId);
        registration.setAthleteId(athleteId);
        return registrationRepo.save(registration);
    }

    // Find registrations by athlete ID
    public List<Registration> findByAthleteId(Long athleteId) {
        return registrationRepo.findByAthleteId(athleteId);
    }

    // Find registrations by event ID
    public List<Registration> findByEventId(Long eventId) {
        return registrationRepo.findByEventId(eventId);
    }

    // Update registration status
    public void updateRegistrationStatus(Long registrationId, String status) {
        Optional<Registration> registrationOptional = registrationRepo.findById(registrationId);
        if (registrationOptional.isPresent()) {
            Registration registration = registrationOptional.get();
            registration.setStatus(status);
            registrationRepo.save(registration);
        } else {
            throw new IllegalArgumentException("Registration not found with ID: " + registrationId);
        }
    }

    // Delete a registration
    public boolean deleteRegistration(Long registrationId) {
        if (registrationRepo.existsById(registrationId)) {
            registrationRepo.deleteById(registrationId);
            return true;
        }
        return false;
    }
}
