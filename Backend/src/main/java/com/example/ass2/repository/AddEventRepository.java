package com.example.ass2.repository;

import com.example.ass2.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;





//package com.example.eventmanagement.repository;

//import com.example.eventmanagement.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AddEventRepository extends JpaRepository<Event, Long> {
}
