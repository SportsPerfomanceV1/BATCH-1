package com.example.databases.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;


@Entity
@Data
@Table
public class WeightPlans {

    @Id
    @Column
    private int id;
    @Column
    private int athleteId;
    @Column
    private float startWeight;
    @Column
    private float targetWeight;
    @Column
    private String preference;
    @Column
    private int dailyCalorieGoal;

}
