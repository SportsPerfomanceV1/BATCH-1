package com.example.ass2.controller;

import com.example.ass2.model.Registration;
import com.example.ass2.service.RegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/registrations")
public class RegistrationController {

    @Autowired
    private RegistrationService registrationService;

    // Register to event by Athlete
    @PostMapping
    public ResponseEntity<String> registerAthlete(@RequestBody Registration registrationRequest) {
        Registration registration = registrationService.registerAthlete(
                registrationRequest.getEventId(),
                registrationRequest.getAthleteId(),
                registrationRequest.getEventName(),
                registrationRequest.getAthleteName()
        );
        return ResponseEntity.ok("Registration successful: " + registration.getRegistrationId());
    }

    // Fetch all Registrations of Athlete by Id
    @GetMapping
    public ResponseEntity<List<Registration>> getRegistrationsByAthleteId(
            @RequestParam int athleteId,
            @RequestParam (required=false) String status
    ) {
        List<Registration> registrations;
        if (status != null && !status.isEmpty()) {
            registrations = registrationService.findByAthleteIdAndStatus(athleteId, status);
        } else {
            registrations = registrationService.findByAthleteId(athleteId);
        }
        if (registrations.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(registrations);
    }

    // Fetch all Registrations of Event by Id
    @GetMapping("/event/{eventId}")
    public ResponseEntity<List<Registration>> getRegistrationsByEventId(
            @PathVariable int eventId,
            @RequestParam (required=false) String status
    ) {
        List<Registration> registrations;
        if (status != null && !status.isEmpty()) {
            registrations = registrationService.findByEventIdAndStatus(eventId, status);
        } else {
            registrations = registrationService.findByEventId(eventId);
        }
        if (registrations.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(registrations);
    }

    // Update Registration status
    @PatchMapping("/{registrationId}/status")
    public ResponseEntity<String> updateRegistrationStatus(
            @PathVariable int registrationId,
            @RequestParam String status) {
        try {
            Registration updatedRegistration = registrationService.updateRegistrationStatus(registrationId, status);
            return ResponseEntity.ok("Registration status updated successfully: " + updatedRegistration.getStatus());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to update registration status: " + e.getMessage());
        }
    }
}
