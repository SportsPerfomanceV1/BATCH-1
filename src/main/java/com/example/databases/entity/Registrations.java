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
public class Registrations {

    @Id
    @Column
    private int registrationId;
    @Column
    private int eventId;
    @Column
    private int athleteId;
    @Column
    private Date registrationDate;
    @Column
    private String status;

}
