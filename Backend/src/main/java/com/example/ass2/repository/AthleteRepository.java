package com.example.ass2.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.ass2.model.Athlete;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AthleteRepository extends JpaRepository<Athlete, Long> {
    Athlete findByUsernameAndEmailAndPassword(String username, String email, String password);
    Optional<Athlete> findByUsername(String username);

}
