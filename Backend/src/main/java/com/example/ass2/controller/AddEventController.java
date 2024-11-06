package com.example.ass2.controller;


import com.example.ass2.model.Event;
import com.example.ass2.repository.EventRepository;
import com.example.ass2.service.AddEventService;
import com.example.ass2.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;





import com.example.ass2.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api")
public class AddEventController {

    @Autowired
    private AddEventService addEventService;

    @GetMapping
    public List<Event> getAllEvents() {
        return addEventService.getAllEvents();
    }

    @PostMapping("/events/add")
    public Event createEvent(@RequestBody Event event) {
        return addEventService.createEvent(event);
    }

    @GetMapping("/events/{id}")
    public Event getEventById(@PathVariable Long id) {
        return addEventService.getEventById(id).orElseThrow(() -> new RuntimeException("Event not found"));
    }

    @PutMapping("/events/update/{id}")
    public Event updateEvent(@PathVariable Long id, @RequestBody Event eventDetails) {
        return addEventService.updateEvent(id, eventDetails);
    }

    @DeleteMapping("/events/delete/{id}")
    public void deleteEvent(@PathVariable Long id) {
        addEventService.deleteEvent(id);
    }
}

