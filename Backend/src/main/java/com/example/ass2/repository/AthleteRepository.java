package com.example.ass2.repository;

import com.example.ass2.model.Athlete;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AthleteRepository extends JpaRepository<Athlete, Integer> {
    Athlete findByUsernameAndEmailAndPassword(String username, String email, String password);
    Athlete findByUsername(String username);
    Athlete findByEmail(String email);
}
