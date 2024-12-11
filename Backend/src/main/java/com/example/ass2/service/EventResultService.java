package com.example.ass2.service;

import com.example.ass2.model.EventResult;
import com.example.ass2.repository.EventResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventResultService {

    @Autowired
    private EventResultRepository eventResultRepository;

    public List<EventResult> getPublishedResultsByEventId(int eventId) {
        return eventResultRepository.findByEventIdAndPublishedTrue(eventId);
    }

    public List<EventResult> getResultsByAthleteId(int athleteId){
        return eventResultRepository.findByAthleteId(athleteId);
    }

    public List<EventResult> saveResults(List<EventResult> eventResult) {
        return eventResultRepository.saveAll(eventResult);
    }
}
