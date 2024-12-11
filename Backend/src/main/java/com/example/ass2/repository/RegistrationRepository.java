package com.example.ass2.repository;

import com.example.ass2.model.Registration;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RegistrationRepository extends JpaRepository<Registration, Integer> {
    List<Registration> findByAthleteId(int athleteId);
    List<Registration> findByEventId(int eventId);
    List<Registration> findByAthleteIdAndStatus(int athleteId, String status);
    List<Registration> findByEventIdAndStatus(int eventId, String status);
}
