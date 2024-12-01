package com.example.ass2.controller;

import com.example.ass2.model.Athlete;
import com.example.ass2.model.Coach;
import com.example.ass2.model.Event;
import com.example.ass2.service.CoachService;
import com.example.ass2.service.EventService;
import com.example.ass2.service.AthleteService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

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

    //Get all events details
    @GetMapping("/events")
    public List<Event> getEvents() {
        return eventService.getAllEvents();
    }

    // Get event details by eventId
    @GetMapping("/events/{id}")
    public Event getEventById(@PathVariable Long id) {
        return eventService.getEventById(id).orElseThrow(() -> new RuntimeException("Event not found"));
    }

    @PostMapping("/events/create")
    public ResponseEntity<Event> createEvent(@RequestParam("file") MultipartFile file,
                                             @RequestParam("eventDetails") String eventDetailsJson) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            Event event = mapper.readValue(eventDetailsJson, Event.class);

            Event savedEvent = eventService.saveEvent(event);
            String uploadDir = "C:/Users/vishw/Documents/Infosys Internship Project/Sports Performance Application/Frontend/public/event_pics";

            String fileName = savedEvent.getId() + ".webp";
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            Path filePath = uploadPath.resolve(fileName);
            Files.copy(file.getInputStream(), filePath);

            String imageUrl = "/public/event_pics/" + fileName;
            savedEvent.setImageUrl(imageUrl);

            Event updatedEvent = eventService.updateEvent(savedEvent.getId(), savedEvent);
            return ResponseEntity.ok(updatedEvent);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    //Get events of coach by username
    @GetMapping("/athletes/{username}")
    public ResponseEntity<Athlete> getAthleteByUsername(@PathVariable String username) {
        Athlete athlete = athleteService.findByUsername(username);
        if (athlete != null) {
            return ResponseEntity.ok(athlete);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    //Get events of coach by username
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

    // Update event details by eventId
    @PutMapping("/events/update/{id}")
    public Event updateEvent(@PathVariable Long id, @RequestBody Event eventDetails) {
        return eventService.updateEvent(id, eventDetails);
    }

    // Delete event details by eventId
    @DeleteMapping("/events/delete/{id}")
    public void deleteEvent(@PathVariable Long id) {
        eventService.deleteEvent(id);
    }
}
