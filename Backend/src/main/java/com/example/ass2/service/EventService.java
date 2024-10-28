package com.example.ass2.service;

import com.example.ass2.model.Event;
import com.example.ass2.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service // This marks the class as a service component
public class EventService {

    @Autowired // This injects the EventRepository bean
    private EventRepository eventRepository;

    public List<Event> findAllEvents() {
        return eventRepository.findAll(); // Fetch all events from the database
    }
}
