package com.example.databases.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

import java.util.Date;

@Entity
@Data
@Table
public class Events {

    @Id
    @Column
    private int eventId;
    @Column
    private String eventTitle;
    @Column
    private String meetName;
    @Column
    private String category;
    @Column
    private Date eventDate;
    @Column
    private String location;

}
