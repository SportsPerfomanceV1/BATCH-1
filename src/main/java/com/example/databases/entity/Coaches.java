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
public class Coaches {

    @Id
    @Column
    private int coachId;
    @Column
    private int userId;
    @Column
    private String first_name;
    @Column
    private String last_name;
    @Column
    private Date birthDate;
    @Column
    private String gender;
    @Column
    private String category;
    @Column
    private String photoUrl;

}
