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
    public Registration registerAthlete(int eventId, int athleteId, String eventName, String athleteName) {
        Registration registration = new Registration();
        registration.setEventId(eventId);
        registration.setEventName(eventName);
        registration.setAthleteId(athleteId);
        registration.setAthleteName(athleteName);
        registration.setRegistrationDate(LocalDate.now());
        registration.setStatus("Pending");
        return registrationRepository.save(registration);
    }

    public List<Registration> findByAthleteId(int athleteId) { return registrationRepository.findByAthleteId(athleteId); }

    public List<Registration> findByAthleteIdAndStatus(int athleteId, String status) {
        return registrationRepository.findByAthleteIdAndStatus(athleteId, status);
    }

    public List<Registration> findByEventId(int eventId) {
        return registrationRepository.findByEventId(eventId);
    }

    public List<Registration> findByEventIdAndStatus(int eventId, String status) {
        return registrationRepository.findByEventIdAndStatus(eventId, status);
    }

    public Registration updateRegistrationStatus(int registrationId, String status) {
        Registration registration = registrationRepository.findById(registrationId)
                .orElseThrow(() -> new RuntimeException("Registration not found"));
        registration.setStatus(status);
        return registrationRepository.save(registration);
    }
}
