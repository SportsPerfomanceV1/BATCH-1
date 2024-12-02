package com.example.ass2.service;

import com.example.ass2.model.EventResult;
import com.example.ass2.repository.EventResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventResultService {

    @Autowired
    private EventResultRepository eventResultRepository;

    public List<EventResult> getPublishedResultsByEventId(Long eventId) {
        return eventResultRepository.findByEventIdAndPublishedTrue(eventId);
    }

    public EventResult publishEventResult(EventResult eventResult) {
        eventResult.setPublished(true);
        return eventResultRepository.save(eventResult);
    }

    public List<EventResult> getResultsByAthleteId(Long athleteId){
        return eventResultRepository.findByAthleteId(athleteId);
    }

    public List<EventResult> publishEventResults(Long eventId){
        List<EventResult> results = eventResultRepository.findByEventId(eventId);
        results.forEach(result -> result.setPublished(true));
        return eventResultRepository.saveAll(results);
    }
}
