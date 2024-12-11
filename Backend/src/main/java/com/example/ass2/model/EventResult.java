package com.example.ass2.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class EventResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int eventId;
    private int athleteId;
    private String result;
    private boolean published;

}
