package com.example.ass2.controller;

import com.example.ass2.model.EventResult;
import com.example.ass2.service.EventResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/results")
public class EventResultController {

    @Autowired
    private EventResultService eventResultService;

    @GetMapping("/{eventId}")
    public List<EventResult> getPublishedResults(@PathVariable Long eventId) {
        return eventResultService.getPublishedResultsByEventId(eventId);
    }

    @GetMapping("/athlete/{athleteId}")
    public List<EventResult> getAthleteResults(@PathVariable Long athleteId) {
        return eventResultService.getResultsByAthleteId(athleteId);
    }

    @PostMapping("/publish")
    public EventResult publishEventResult(@RequestBody EventResult eventResult) {
        return eventResultService.publishEventResult(eventResult);
    }

    @PostMapping("/{eventId}/publish")
    public List<EventResult> publishEventResults(@PathVariable Long eventId) {
        return eventResultService.publishEventResults(eventId);
    }
}
