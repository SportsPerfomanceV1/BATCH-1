package com.example.ass2.controller;

import com.example.ass2.model.Athlete;
import com.example.ass2.model.Coach;
import com.example.ass2.model.Event;
import com.example.ass2.service.CoachService;
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
    private AthleteService athleteService;

    @Autowired
    private CoachService coachService;

    @GetMapping("/events")
    public List<Event> getEvents() {
        return eventService.findAllEvents();
    }

    @GetMapping("/athletes/{username}")
    public ResponseEntity<Athlete> getAthleteByUsername(@PathVariable String username) {
        Athlete athlete = athleteService.findByUsername(username);
        if (athlete != null) {
            return ResponseEntity.ok(athlete);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @GetMapping("/coach/{username}")
    public ResponseEntity<Coach> getCoachByUsername(@PathVariable String username){
        Coach coach = coachService.findByUsername(username);
        if (coach != null){
            return ResponseEntity.ok(coach);
        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}
