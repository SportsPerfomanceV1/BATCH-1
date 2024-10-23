package com.example.ass2.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.ass2.model.Athlete;
import org.springframework.stereotype.Repository;

@Repository
public interface AthleteRepository extends JpaRepository<Athlete, Long> {
    Athlete findByUsernameAndEmailAndPassword(String username, String email, String password);
}
