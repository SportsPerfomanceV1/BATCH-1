package com.example.databases.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Id;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;

import java.util.Date;

@Entity
@Data
@Table
public class Achievements {

    @Id
    @Column
    private int achievementId;
    @Column
    private int coachId;
    @Column
    private String title;
    @Column
    private String description;
    @Column
    private Date achievementDate;


}
