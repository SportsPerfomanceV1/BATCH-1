package com.example.ass2.controller;

import com.example.ass2.model.Admin;
import com.example.ass2.model.Athlete;
import com.example.ass2.model.Coach;
import com.example.ass2.service.AdminService;
import com.example.ass2.service.AthleteService;
import com.example.ass2.service.CoachService;
import com.example.ass2.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class ProfileController {

    @Autowired
    private UserService userService;
    @Autowired
    private AdminService adminService;
    @Autowired
    private AthleteService athleteService;
    @Autowired
    private CoachService coachService;

    // Get User Profile data based on userType (athlete or coach)
    @GetMapping("/profile/{username}")
    public ResponseEntity<?> getUserProfile(@PathVariable String username, @RequestParam String userType) {
        try {
            Object userProfile;
            if (userType.equalsIgnoreCase("athlete")) {
                userProfile = userService.findAthleteByUsername(username);
            } else if (userType.equalsIgnoreCase("coach")) {
                userProfile = userService.findCoachByUsername(username);
            } else if (userType.equalsIgnoreCase("admin")) {
                userProfile = userService.findAdminByUsername(username);
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid user type");
            }

            // Check if user profile exists
            if (userProfile != null) {
                return ResponseEntity.ok(userProfile);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching profile details");
        }
    }

    // Update user data based on usertype
    @PatchMapping("/profile/update/{username}")
    public ResponseEntity<?> updateUserProfile(
            @PathVariable String username,
            @RequestParam String userType,
            @RequestBody Map<String, String> profileData) {
        try {
            Object updatedProfile;
            if (userType.equalsIgnoreCase("athlete")) {
                updatedProfile = userService.updateAthleteProfile(username, profileData);
            } else if (userType.equalsIgnoreCase("coach")) {
                updatedProfile = userService.updateCoachProfile(username, profileData);
            } else if (userType.equalsIgnoreCase("admin")) {
                updatedProfile = userService.updateAdminProfile(username, profileData);
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid user type");
            }

            if (updatedProfile != null) {
                return ResponseEntity.ok(updatedProfile);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating profile details");
        }
    }

    //Get athlete details by username
    @GetMapping("/athletes/{username}")
    public ResponseEntity<Athlete> getAthleteByUsername(@PathVariable String username) {
        Athlete athlete = athleteService.findByUsername(username);
        if (athlete != null) {
            return ResponseEntity.ok(athlete);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    //Get coach details by username
    @GetMapping("/coach/{username}")
    public ResponseEntity<Coach> getCoachByUsername(@PathVariable String username){
        Coach coach = coachService.findByUsername(username);
        if (coach != null){
            return ResponseEntity.ok(coach);
        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    //Get admin details by username
    @GetMapping("/admin/{username}")
    public ResponseEntity<Admin> getAdminByUsername(@PathVariable String username){
        Admin admin = adminService.findByUsername(username);
        if (admin != null){
            return ResponseEntity.ok(admin);
        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}
