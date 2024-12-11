package com.example.ass2.controller;

import com.example.ass2.model.Event;
import com.example.ass2.service.EventService;
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

    //Get all events details
    @GetMapping("/events")
    public List<Event> getEvents() {
        return eventService.getAllEvents();
    }

    // Get event details by eventId
    @GetMapping("/events/{id}")
    public Event getEventById(@PathVariable int id) {
        return eventService.getEventById(id).orElseThrow(() -> new RuntimeException("Event not found"));
    }

    // Create events with image as file & details in json format
    @PostMapping("/events/create")
    public ResponseEntity<Event> createEvent(@RequestParam("file") MultipartFile file,
                                             @RequestParam("eventDetails") String eventDetailsJson) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            Event event = mapper.readValue(eventDetailsJson, Event.class);

            Event savedEvent = eventService.saveEvent(event);
            String uploadDir = "C:/Users/vishw/Projects/Infosys Internship Project/Sports Performance Application/Frontend/public/event_pics";

            String fileName = savedEvent.getId() + ".webp";
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            Path filePath = uploadPath.resolve(fileName);
            Files.copy(file.getInputStream(), filePath);

            String imageUrl = "/public/event_pics/" + fileName;
            savedEvent.setImage_url(imageUrl);

            Event updatedEvent = eventService.updateEvent(savedEvent.getId(), savedEvent);
            return ResponseEntity.ok(updatedEvent);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Update event details by eventId
    @PutMapping("/events/update/{id}")
    public Event updateEvent(@PathVariable int id, @RequestBody Event eventDetails) {
        return eventService.updateEvent(id, eventDetails);
    }

    // Delete event details by eventId
    @DeleteMapping("/events/delete/{id}")
    public void deleteEvent(@PathVariable int id) {
        eventService.deleteEvent(id);
    }
}
