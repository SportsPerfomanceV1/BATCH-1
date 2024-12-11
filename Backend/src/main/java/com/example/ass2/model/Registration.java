package com.example.ass2.model;

import java.time.LocalDate;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "registrations")
public class Registration {

    // Getters and Setters
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int registrationId;
    private int eventId;
    private int athleteId;
    private LocalDate registrationDate;
    private String status;

    public Registration() { this.status = "pending"; } // Set default status to pending

}
