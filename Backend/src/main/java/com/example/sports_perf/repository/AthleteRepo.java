package com.example.sports_perf.repository;

import com.example.sports_perf.model.Athlete;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AthleteRepo extends JpaRepository<Athlete, Long> {
    Athlete findByUsernameAndEmailAndPassword(String username, String email, String password);
    Optional<Athlete> findByUsername(String username);

}