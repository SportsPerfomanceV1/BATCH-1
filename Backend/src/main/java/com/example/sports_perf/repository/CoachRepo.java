package com.example.sports_perf.repository;

import com.example.sports_perf.model.Coach;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CoachRepo extends JpaRepository<Coach, Long> {
    Coach findByUsernameAndEmailAndPassword(String username, String email, String password);
    Optional<Coach> findByUsername(String username);

}
