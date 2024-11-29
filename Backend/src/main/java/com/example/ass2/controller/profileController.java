package com.example.ass2.controller;

import com.example.ass2.model.Athlete;
import com.example.ass2.model.Coach;
import com.example.ass2.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class profileController {

    @Autowired
    private UserService userService;

    // Get User Profile based on userType (athlete or coach)
    @GetMapping("/profile/{username}")
    public ResponseEntity<?> getUserProfile(@PathVariable String username, @RequestParam String userType) {
        try {
            Object userProfile;
            if (userType.equalsIgnoreCase("athlete")) {
                userProfile = userService.findAthleteByUsername(username);
            } else if (userType.equalsIgnoreCase("coach")) {
                userProfile = userService.findCoachByUsername(username);
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
}
