package com.example.sports_perf.repository;

import com.example.sports_perf.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EventRepo extends JpaRepository<Event, Long> {

    // Find all events
    List<Event> findAll();

    // Find an event by its ID
    Optional<Event> findById(Long id);

    // Delete an event by its ID
    void deleteById(Long id);

    // Find events by title (example for additional filtering)
    List<Event> findByTitleContaining(String keyword);
}
