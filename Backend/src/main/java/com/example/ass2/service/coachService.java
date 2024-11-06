package com.example.ass2.service;

import com.example.ass2.model.Coach;
import com.example.ass2.repository.coachRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class coachService {

    @Autowired
    private coachRepository coachRepository;

    public Coach findByUsername(String username) {
        return coachRepository.findByUsername(username);
    }
}

