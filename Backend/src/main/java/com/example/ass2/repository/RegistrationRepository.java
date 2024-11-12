package com.example.ass2.repository;

import com.example.ass2.model.Registration;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RegistrationRepository extends JpaRepository<Registration, Long> {
    // Custom query methods (if needed)
    List<Registration> findByAthleteId(Long athleteId);
}
