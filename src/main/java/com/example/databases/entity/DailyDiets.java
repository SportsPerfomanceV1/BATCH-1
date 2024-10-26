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
public class DailyDiets {

    @Id
    @Column
    private int id;
    @Column
    private int athleteId;
    @Column
    private Date date;
    @Column
    private int calories;
    @Column
    private float currentWeight;
    @Column
    private int weightPlanId;




}
