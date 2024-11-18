package com.example.sports_perf.repository;

import com.example.sports_perf.model.Registration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RegistrationRepo extends JpaRepository<Registration, Long> {
    List<Registration> findByAthleteId(Long athleteId);
    List<Registration> findByEventId(Long eventId);
}
