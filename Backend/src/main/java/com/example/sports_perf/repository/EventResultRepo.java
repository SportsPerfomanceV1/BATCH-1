package com.example.sports_perf.repository;

import com.example.sports_perf.model.EventResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventResultRepo extends JpaRepository<EventResult, Long> {

    List<EventResult> findByEventIdAndPublished(Long eventId, boolean published);

    List<EventResult> findByEventId(Long eventId);
}
