package com.example.databases.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

import java.util.Date;

@Entity
@Data
@Table
public class AssistanceRequests {
    @Id
    @Column
    private int assistanceRequiredId;
    @Column
    private int athleteId;
    @Column
    private int coachId;
    @Column
    private String status;
    @Column
    private String remarks;
    @Column
    private Date requestDate;

}
