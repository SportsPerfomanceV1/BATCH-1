//package com.example.ass2.service;
//
//import com.example.ass2.model.Registration;
//import com.example.ass2.repository.RegistrationRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.time.LocalDate;
//import java.util.List;
//
//@Service
//public class RegistrationService {
//
//    @Autowired
//    private RegistrationRepository registrationRepository;
//
//    // Method to register an athlete
//    public Registration registerAthlete(Long eventId, Long athleteId) {
//        Registration registration = new Registration();
//        registration.setEventId(eventId);
//        registration.setAthleteId(athleteId);
//        registration.setRegistrationDate(LocalDate.now()); // Set current date
//        registration.setStatus("Pending"); // Set status to pending
//        return registrationRepository.save(registration); // Save to database
//    }
//
//    // New method to find registrations by athlete ID
//    public List<Registration> findByAthleteId(Long athleteId) {
//        return registrationRepository.findByAthleteId(athleteId); // Use repository method to fetch registrations
//    }
////}




//package com.example.ass2.service;
//
//import com.example.ass2.model.Registration;
//import com.example.ass2.repository.RegistrationRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//
//@Service
//public class RegistrationService {
//
//    @Autowired
//    private RegistrationRepository registrationRepository;
//
//    public List<Registration> getAllRegistrations() {
//        return registrationRepository.findAll();
//    }
//
//    public List<Registration> getPendingRegistrations() {
//        return registrationRepository.findByStatus("pending");
//    }
//
//    public Registration getRegistrationById(Long id) {
//        return registrationRepository.findById(id).orElseThrow(() -> new RuntimeException("Registration not found"));
//    }
//
//    public List<Registration> getRegistrationByAthleteId(Long athleteId) {
//        return registrationRepository.findByAthleteId(athleteId);
//    }
//
//    public Registration createRegistration(Registration registration) {
//        return registrationRepository.save(registration);
//    }
//
//    public Registration updateRegistration(Long id, Registration registrationDetails) {
//        Registration registration = getRegistrationById(id);
//
//        registration.setEventId(registrationDetails.getEventId());
//        registration.setAthleteId(registrationDetails.getAthleteId());
//        registration.setRegistrationDate(registrationDetails.getRegistrationDate());
//        registration.setStatus(registrationDetails.getStatus());
//
//        return registrationRepository.save(registration);
//    }
//
//    public void deleteRegistration(Long id) {
//        Registration registration = getRegistrationById(id);
//        registrationRepository.delete(registration);
//    }
//
//    public Registration approveRegistration(Long id) {
//        Registration registration = getRegistrationById(id);
//        registration.setStatus("approved");
//        return registrationRepository.save(registration);
//    }
//
//    public Registration rejectRegistration(Long id) {
//        Registration registration = getRegistrationById(id);
//        registration.setStatus("rejected");
//        return registrationRepository.save(registration);
//    }
//}


//Update: For no duplicate registration
package com.example.ass2.service;
import com.example.ass2.model.Registration;
import com.example.ass2.repository.RegistrationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RegistrationService {

    @Autowired
    private RegistrationRepository registrationRepository;

    public List<Registration> getAllRegistrations() {
        return registrationRepository.findAll();
    }

    public List<Registration> getPendingRegistrations() {
        return registrationRepository.findByStatus("Pending");
    }

    public Registration createRegistration(Registration registration) {
        // Check for duplicate registration
        Optional<Registration> existingRegistration = registrationRepository.findByAthleteIdAndEventId(
                registration.getAthleteId(), registration.getEventId());

        if (existingRegistration.isPresent()) {
            throw new RuntimeException("Athlete is already registered for this event");
        }

        return registrationRepository.save(registration);
    }

    public Registration approveRegistration(Long id) {
        Registration registration = registrationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Registration not found"));

        registration.setStatus("Approved");
        return registrationRepository.save(registration);
    }

    public Registration rejectRegistration(Long id) {
        Registration registration = registrationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Registration not found"));

        registration.setStatus("Rejected");
        return registrationRepository.save(registration);
    }

    public void deleteRegistration(Long id) {
        registrationRepository.deleteById(id);
    }

    public List<Registration> getRegistrationByAthleteId(Long athleteId) {
        return registrationRepository.findByAthleteId(athleteId);
    }
}
