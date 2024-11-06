package com.example.ass2.repository;

import com.example.ass2.model.Athlete;
import com.example.ass2.model.Coach;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface coachRepository extends JpaRepository<Coach, Long> {
    Coach findByUsernameAndEmailAndPassword(String username, String email, String password);

    Coach findByUsername(String username);
}