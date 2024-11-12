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

    @PostMapping
    public ResponseEntity<String> registerAthlete(@RequestBody Registration registrationRequest) {
        Registration registration = registrationService.registerAthlete(
                registrationRequest.getEventId(), registrationRequest.getAthleteId()
        );
        return ResponseEntity.ok("Registration successful: " + registration.getRegistrationId());
    }



    // New endpoint to fetch registrations by athlete ID
    @GetMapping
    public ResponseEntity<List<Registration>> getRegistrationsByAthleteId(@RequestParam Long athleteId) {
        List<Registration> registrations = registrationService.findByAthleteId(athleteId);
        if (registrations.isEmpty()) {
            return ResponseEntity.noContent().build(); // Return 204 No Content if no registrations found
        }
        return ResponseEntity.ok(registrations); // Return 200 OK with the list of registrations
    }
}
