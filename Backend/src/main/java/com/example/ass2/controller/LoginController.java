//package com.example.ass2.controller;
//
//import com.example.ass2.model.Athlete;
//import com.example.ass2.model.Coach;
//import com.example.ass2.repository.AthleteRepository;
//import com.example.ass2.repository.CoachRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.HashMap;
//import java.util.Map;
//
//@CrossOrigin(origins = "http://localhost:3000")
//@RestController
//@RequestMapping("/api")
//public class LoginController {
//
//    @Autowired
//    private AthleteRepository athleteRepository;
//
//    @Autowired
//    private CoachRepository coachRepository;
//
//    @PostMapping("/login")
//    public ResponseEntity<Map<String, String>> loginUser(@RequestBody LoginRequest loginRequest) {
//        String userType = loginRequest.getUserType();
//        String username = loginRequest.getUsername();
//        String email = loginRequest.getEmail();
//        String password = loginRequest.getPassword();
//
//        Map<String, String> response = new HashMap<>();
//
//        if ("athlete".equalsIgnoreCase(userType)) {
//            Athlete athlete = athleteRepository.findByUsernameAndEmailAndPassword(username, email, password);
//            if (athlete != null) {
//                response.put("message", "Athlete logged in successfully");
//                response.put("redirectUrl", "/home");
//                return ResponseEntity.ok(response);
//            } else {
//                response.put("error", "Invalid athlete credentials");
//                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
//            }
//        } else if ("coach".equalsIgnoreCase(userType)) {
//            Coach coach = coachRepository.findByUsernameAndEmailAndPassword(username, email, password);
//            if (coach != null) {
//                response.put("message", "Coach logged in successfully");
//                response.put("redirectUrl", "/dashboard");
//                return ResponseEntity.ok(response);
//            } else {
//                response.put("error", "Invalid coach credentials");
//                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
//            }
//        } else {
//            response.put("error", "Invalid user type");
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
//        }
//    }
//}

package com.example.ass2.controller;

import com.example.ass2.model.Athlete;
import com.example.ass2.model.Coach;
import com.example.ass2.model.Admin;
import com.example.ass2.repository.AthleteRepository;
import com.example.ass2.repository.CoachRepository;
import com.example.ass2.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class LoginController {

    @Autowired
    private AthleteRepository athleteRepository;

    @Autowired
    private CoachRepository coachRepository;

    @Autowired
    private AdminRepository adminRepository;

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> loginUser(@RequestBody LoginRequest loginRequest) {
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();

        Map<String, String> response = new HashMap<>();

        Athlete athlete = athleteRepository.findByEmailAndPassword(email, password);
        if (athlete != null) {
            response.put("message", "Athlete logged in successfully");
            response.put("userType", "athlete");
            response.put("username", athlete.getUsername());
            response.put("firstname", athlete.getFirstname());
            response.put("redirectUrl", "/home");
            return ResponseEntity.ok(response);
        }

        Coach coach = coachRepository.findByEmailAndPassword(email, password);
        if (coach != null) {
            response.put("message", "Coach logged in successfully");
            response.put("userType", "coach");
            response.put("username", coach.getUsername());
            response.put("firstname", coach.getFirstname());
            response.put("redirectUrl", "/home");
            return ResponseEntity.ok(response);
        }

        Admin admin = adminRepository.findByEmailAndPassword(email, password);
        if (admin != null) {
            response.put("message", "Admin logged in successfully");
            response.put("userType", "admin");
            response.put("username", admin.getUsername());
            response.put("firstname", admin.getFirstname());
            response.put("redirectUrl", "/admin-dashboard");
            return ResponseEntity.ok(response);
        }

        response.put("error", "Invalid credentials");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    }
}
