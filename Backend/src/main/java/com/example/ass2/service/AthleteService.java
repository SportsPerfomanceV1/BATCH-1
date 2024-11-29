package com.example.ass2.service;

import com.example.ass2.model.Athlete;
import com.example.ass2.repository.AthleteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AthleteService {

    @Autowired
    private AthleteRepository athleteRepository;

    public Athlete findByUsername(String username) { return athleteRepository.findByUsername(username); }

}
