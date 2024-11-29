package com.example.ass2.repository;

import com.example.ass2.model.Athlete;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AthleteRepository extends JpaRepository<Athlete, Long> {
    Athlete findByUsernameAndEmailAndPassword(String username, String email, String password);
    Athlete findByUsername(String username);  // This is useful for finding by username alone

    Athlete findByEmailAndPassword(String email, String password);
}
