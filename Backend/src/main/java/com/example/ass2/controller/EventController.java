package com.example.ass2.controller;

import com.example.ass2.model.Athlete;
import com.example.ass2.model.Event;
import com.example.ass2.service.EventService;
import com.example.ass2.service.AthleteService; // Import AthleteService
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class EventController {

    @Autowired
    private EventService eventService;

    @Autowired
    private AthleteService athleteService; // Add AthleteService

    @GetMapping("/events")
    public List<Event> getEvents() {
        return eventService.findAllEvents(); // Fetches all events
    }

    @GetMapping("/athletes/{username}") // Correct the mapping here
    public ResponseEntity<Athlete> getAthleteByUsername(@PathVariable String username) {
        Athlete athlete = athleteService.findByUsername(username);
        if (athlete != null) {
            return ResponseEntity.ok(athlete);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}
