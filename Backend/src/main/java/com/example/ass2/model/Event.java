package com.example.ass2.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long eventId;
    private String image_url;
    private String date;
    private String time;
    private Double fee;
    private String organizer;
    private String location;
    private String title;

    public void setImageUrl(String imageUrl) {
        this.image_url = imageUrl;
    }

}
