package com.example.sports_perf.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class EventResult {
    // Getters and Setters
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long eventId;

    @Column(nullable = false)
    private Long athleteId;

    @Column(length = 500)
    private String result; // Description of the athlete's performance or score

    @Column(nullable = false)
    private boolean published; // Indicates if the result is published or not

    public EventResult() {
        this.published = false; // Default value for unpublished results
    }
}
