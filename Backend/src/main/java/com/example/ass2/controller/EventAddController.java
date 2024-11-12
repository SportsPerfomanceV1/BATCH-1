package com.example.ass2.controller;

import com.example.ass2.model.Event;
import com.example.ass2.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;

@RestController
@RequestMapping("/admin/events")
public class EventAddController {
    @Autowired
    private EventRepository eventRepository;

    @PostMapping
    public ResponseEntity<String> addEvent(
            @RequestParam("event_id") String eventId,
            @RequestParam("date") String date,
            @RequestParam("fee") double fee,
            @RequestParam("location") String location,
            @RequestParam("time") String time,
            @RequestParam("title") String title,
            @RequestParam("organizer") String organizer,
            @RequestParam("file") MultipartFile file) {

        try {
            // Save file to local storage
            String uploadDir = "uploads/";
            File directory = new File(uploadDir);
            if (!directory.exists()) {
                directory.mkdir();
            }
            String filePath = uploadDir + file.getOriginalFilename();
            file.transferTo(new File(filePath));

            // Save event data to database
            Event event = new Event();
            event.setEventId(Long.valueOf(eventId));
            event.setDate(date);
            event.setFee(fee);
            event.setLocation(location);
            event.setTime(time);
            event.setTitle(title);
            event.setOrganizer(organizer);
            event.setImageUrl(filePath);
            eventRepository.save(event);

            return new ResponseEntity<>("Event added successfully!", HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Error adding event.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
