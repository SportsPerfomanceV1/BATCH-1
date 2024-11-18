package com.example.sports_perf.service;

import com.example.sports_perf.model.EventResult;
import com.example.sports_perf.repository.EventResultRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventResultService {

    @Autowired
    private EventResultRepo eventResultRepo;

    // Fetch published results for an event
    public List<EventResult> getPublishedResultsByEventId(Long eventId) {
        return eventResultRepo.findByEventIdAndPublished(eventId, true);
    }

    // Fetch all results for an event (both published and unpublished)
    public List<EventResult> getAllResultsByEventId(Long eventId) {
        return eventResultRepo.findByEventId(eventId);
    }

    // Publish a new event result
    public EventResult publishEventResult(EventResult eventResult) {
        eventResult.setPublished(true); // Mark as published
        return eventResultRepo.save(eventResult);
    }

    // Update an existing event result
    public EventResult updateEventResult(Long resultId, EventResult updatedResult) {
        Optional<EventResult> optionalResult = eventResultRepo.findById(resultId);
        if (optionalResult.isPresent()) {
            EventResult existingResult = optionalResult.get();
            existingResult.setEventId(updatedResult.getEventId());
            existingResult.setAthleteId(updatedResult.getAthleteId());
            existingResult.setResult(updatedResult.getResult());
            existingResult.setPublished(updatedResult.isPublished());
            return eventResultRepo.save(existingResult);
        }
        return null; // Result not found
    }

    // Delete an event result
    public boolean deleteEventResult(Long resultId) {
        if (eventResultRepo.existsById(resultId)) {
            eventResultRepo.deleteById(resultId);
            return true;
        }
        return false;
    }
}
