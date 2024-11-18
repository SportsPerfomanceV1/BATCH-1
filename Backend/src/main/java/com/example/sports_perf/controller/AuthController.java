package com.example.sports_perf.controller;

import com.example.sports_perf.dto.LoginRequest;
import com.example.sports_perf.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> authenticateUser(@RequestBody LoginRequest loginRequest) {
        String username = loginRequest.getUsername();
        String userType = loginRequest.getUserType();

        // Validate input
        if (username == null || username.isBlank() || userType == null || userType.isBlank()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Username and user type are required"));
        }

        // Generate JWT token
        String jwtToken = jwtUtil.generateToken(username, userType);

        // Response with message, token, username, userType
        Map<String, String> response = new HashMap<>();
        response.put("message", "Login successful");
        response.put("token", jwtToken);
        response.put("username", username);
        response.put("userType", userType);

        return ResponseEntity.ok(response);
    }
}
