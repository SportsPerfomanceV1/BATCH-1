package com.example.sports_perf.model;

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

    @Column(name = "registration_date", nullable = false)
    private LocalDate registrationDate;

    @Column(name = "status", nullable = false, length = 10)
    private String status; // Status of registration: "pending", "approved", "rejected"

    // Default constructor
    public Registration() {
        this.registrationDate = LocalDate.now(); // Default registration date to current date
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
