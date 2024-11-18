package com.example.sports_perf.controller;

import com.example.sports_perf.model.EventResult;
import com.example.sports_perf.service.EventResultService;
import com.example.sports_perf.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/event-results")
public class EventResultController {

    @Autowired
    private EventResultService eventResultService;

    @Autowired
    private JwtUtil jwtUtil;

    // Get published results by event ID
    @GetMapping("/{eventId}/published")
    public ResponseEntity<List<EventResult>> getPublishedResults(@PathVariable Long eventId) {
        List<EventResult> results = eventResultService.getPublishedResultsByEventId(eventId);
        return results.isEmpty()
                ? ResponseEntity.noContent().build() // 204 No Content
                : ResponseEntity.ok(results);
    }

    // Publish a new event result
    @PostMapping("/publish")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<EventResult> publishEventResult(
            @RequestBody EventResult eventResult,
            @RequestHeader("Authorization") String authorizationHeader) {

        String token = extractToken(authorizationHeader);
        if (!jwtUtil.validateToken(token, "admin")) { // Assuming "admin" as a user identifier
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        EventResult savedResult = eventResultService.publishEventResult(eventResult);
        return ResponseEntity.ok(savedResult);
    }

    // Get all results for an event (published and unpublished)
    @GetMapping("/{eventId}")
    public ResponseEntity<List<EventResult>> getAllResultsByEventId(
            @PathVariable Long eventId,
            @RequestHeader("Authorization") String authorizationHeader) {

        String token = extractToken(authorizationHeader);
        if (!jwtUtil.validateToken(token, eventId.toString())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        List<EventResult> results = eventResultService.getAllResultsByEventId(eventId);
        return results.isEmpty()
                ? ResponseEntity.noContent().build() // 204 No Content
                : ResponseEntity.ok(results);
    }

    // Update the result
    @PutMapping("/{resultId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<EventResult> updateEventResult(
            @PathVariable Long resultId,
            @RequestBody EventResult updatedResult,
            @RequestHeader("Authorization") String authorizationHeader) {

        String token = extractToken(authorizationHeader);
        if (!jwtUtil.validateToken(token, "admin")) { // Assuming "admin" as a user identifier
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        EventResult result = eventResultService.updateEventResult(resultId, updatedResult);
        if (result != null) {
            return ResponseEntity.ok(result);
        }
        return ResponseEntity.notFound().build(); // 404 Not Found
    }

    // Delete an event result
    @DeleteMapping("/{resultId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteEventResult(
            @PathVariable Long resultId,
            @RequestHeader("Authorization") String authorizationHeader) {

        String token = extractToken(authorizationHeader);
        if (!jwtUtil.validateToken(token, "admin")) { // Assuming "admin" as a user identifier
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        if (eventResultService.deleteEventResult(resultId)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build(); // 404 Not Found
    }

    // Extract token from the header
    private String extractToken(String authorizationHeader) {
        return authorizationHeader.startsWith("Bearer ") ? authorizationHeader.substring(7) : authorizationHeader;
    }
}
