package com.example.sports_perf.service;

import com.example.sports_perf.model.Event;
import com.example.sports_perf.repository.EventRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventService {

    @Autowired
    private EventRepo eventRepo;

    public List<Event> findAllEvents() {
        return eventRepo.findAll();
    }

    public Optional<Event> getEventById(Long id) {
        return eventRepo.findById(id);
    }

    public Event createEvent(Event event) {
        return eventRepo.save(event);
    }

    public Optional<Event> updateEvent(Long id, Event eventDetails) {
        return eventRepo.findById(id).map(event -> {
            event.setTitle(eventDetails.getTitle());
            event.setDate(eventDetails.getDate());
            event.setTime(eventDetails.getTime());
            event.setFee(eventDetails.getFee());
            event.setOrganizer(eventDetails.getOrganizer());
            event.setLocation(eventDetails.getLocation());
            event.setImage_url(eventDetails.getImage_url());
            return eventRepo.save(event);
        });
    }

    public boolean deleteEvent(Long id) {
        if (eventRepo.existsById(id)) {
            eventRepo.deleteById(id);
            return true;
        }
        return false;
    }
}
