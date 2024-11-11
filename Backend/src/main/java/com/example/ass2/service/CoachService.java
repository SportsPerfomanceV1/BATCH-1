package com.example.ass2.service;

import com.example.ass2.model.Coach;
import com.example.ass2.repository.CoachRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CoachService {

    @Autowired
    private CoachRepository coachRepository;

    public Coach findByUsername(String username) {
        return coachRepository.findByUsername(username);
    }
}

