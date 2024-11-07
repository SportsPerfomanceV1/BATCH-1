//package com.example.ass2.controller;
//
//import com.example.ass2.model.Registration;
//import com.example.ass2.service.RegistrationService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/registrations")
//public class RegistrationController {
//
//    @Autowired
//    private RegistrationService registrationService;
//
//    @PostMapping
//    public ResponseEntity<String> registerAthlete(@RequestParam Long eventId, @RequestParam Long athleteId) {
//        Registration registration = registrationService.registerAthlete(eventId, athleteId);
//        return ResponseEntity.ok("Registration successful: " + registration.getRegistrationId());
//    }
//
//    // New endpoint to fetch registrations by athlete ID
//    @GetMapping
//    public ResponseEntity<List<Registration>> getRegistrationsByAthleteId(@RequestParam Long athleteId) {
//        List<Registration> registrations = registrationService.findByAthleteId(athleteId);
//        if (registrations.isEmpty()) {
//            return ResponseEntity.noContent().build(); // Return 204 No Content if no registrations found
//        }
//        return ResponseEntity.ok(registrations); // Return 200 OK with the list of registrations
//    }
//}
package com.example.ass2.controller;

import com.example.ass2.model.Registration;
import com.example.ass2.service.RegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/registrations")
public class RegistrationController {

    @Autowired
    private RegistrationService registrationService;

    @GetMapping
    public List<Registration> getAllRegistrations() {
        return registrationService.getAllRegistrations();
    }

    @GetMapping("/pending")
    public List<Registration> getPendingRegistrations() {
        return registrationService.getPendingRegistrations();
    }

    @PostMapping
    public Registration createRegistration(@RequestBody Registration registration) {
        return registrationService.createRegistration(registration);
    }

    @PutMapping("/{id}/approve")
    public Registration approveRegistration(@PathVariable Long id) {
        return registrationService.approveRegistration(id);
    }

    @PutMapping("/{id}/reject")
    public Registration rejectRegistration(@PathVariable Long id) {
        return registrationService.rejectRegistration(id);
    }

    @DeleteMapping("/{id}")
    public void deleteRegistration(@PathVariable Long id) {
        registrationService.deleteRegistration(id);
    }

    @GetMapping("/athlete/{athleteId}")
    public List<Registration> getRegistrationByAthleteId(@PathVariable Long athleteId) {
        return registrationService.getRegistrationByAthleteId(athleteId);
    }
}


