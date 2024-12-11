package com.example.ass2.controller;

import com.example.ass2.model.EventResult;
import com.example.ass2.service.EventResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/results")
public class EventResultController {

    @Autowired
    private EventResultService eventResultService;

    // Get results of a event which are published by Id
    @GetMapping("/{eventId}")
    public List<EventResult> getPublishedResults(@PathVariable int eventId) {
        return eventResultService.getPublishedResultsByEventId(eventId);
    }

    // Get results of a athlete by Id
    @GetMapping("/athlete/{athleteId}")
    public List<EventResult> getAthleteResults(@PathVariable int athleteId) {
        return eventResultService.getResultsByAthleteId(athleteId);
    }

    // Save event results
    @PostMapping("/save")
    public List<EventResult> saveResults(@RequestBody List<EventResult> eventResult) {
        return eventResultService.saveResults(eventResult);
    }
}
