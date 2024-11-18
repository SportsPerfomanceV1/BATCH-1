package com.example.sports_perf.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
public class Admin {
    // Getters and Setters
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstname;
    private String lastname;
    private String middlename; // optional
    private String username;
    private String password;
    private String email;

    public Admin(String firstname, String middlename, String lastname, String username, String hashedPassword, String email) {
    }
}
