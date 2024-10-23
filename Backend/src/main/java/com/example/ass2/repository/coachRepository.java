package com.example.ass2.repository;

import com.example.ass2.model.Coach;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface coachRepository extends JpaRepository<Coach, Long> {
    Coach findByUsernameAndEmailAndPassword(String username, String email, String password);
}