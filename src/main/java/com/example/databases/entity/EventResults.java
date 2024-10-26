package com.example.databases.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;



@Entity
@Data
@Table
public class EventResults {
    @Id
    @Column
    private int resultId;
    @Column
    private int eventId;
    @Column
    private int athleteId;
    @Column
    private float score;
    @Column
    private String remarks;
}
