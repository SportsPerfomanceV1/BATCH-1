package com.example.ass2.service;

import com.example.ass2.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;




//package com.example.ass2.service;

import com.example.ass2.model.Event;
import com.example.ass2.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AddEventService {

    @Autowired
    private EventRepository eventRepository;

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public Optional<Event> getEventById(Long id) {
        return eventRepository.findById(id);
    }

    public Event createEvent(Event event) {
        return eventRepository.save(event);
    }

    public Event updateEvent(Long id, Event eventDetails) {
        Event event = eventRepository.findById(id).orElseThrow(() -> new RuntimeException("Event not found"));

        event.setEventId(eventDetails.getEventId());
        event.setImage_url(eventDetails.getImage_url());
        event.setDate(eventDetails.getDate());
        event.setTime(eventDetails.getTime());
        event.setFee(eventDetails.getFee());
        event.setOrganizer(eventDetails.getOrganizer());
        event.setLocation(eventDetails.getLocation());
        event.setTitle(eventDetails.getTitle());

        return eventRepository.save(event);
    }

    public void deleteEvent(Long id) {
        Event event = eventRepository.findById(id).orElseThrow(() -> new RuntimeException("Event not found"));
        eventRepository.delete(event);
    }
}
