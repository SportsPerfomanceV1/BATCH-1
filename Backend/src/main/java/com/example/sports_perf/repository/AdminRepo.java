package com.example.sports_perf.repository;

import com.example.sports_perf.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepo extends JpaRepository<Admin, Long> {
    Admin findByUsernameAndEmailAndPassword(String username, String email, String password);
    Admin findByUsername(String username);

}
