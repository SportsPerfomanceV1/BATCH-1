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
    private Long registrationId;

    @Column(name = "event_id", nullable = false)
    private Long eventId;

    @Column(name = "athlete_id", nullable = false)
    private Long athleteId;

    @Column(name = "registration_date")
    private LocalDate registrationDate;

    @Column(name = "status", nullable = false)
    private String status;

    // Default constructor
    public Registration() {
        this.status = "pending"; // Set default status to pending
    }

    @Override
    public String toString() {
        return "Registration{" +
                "registrationId=" + registrationId +
                ", eventId=" + eventId +
                ", athleteId=" + athleteId +
                ", registrationDate=" + registrationDate +
                ", status='" + status + '\'' +
                '}';
    }
}
