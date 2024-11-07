package com.example.ass2.repository;

import com.example.ass2.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {
    Admin findByUsernameAndEmailAndPassword(String username, String email, String password);
}
