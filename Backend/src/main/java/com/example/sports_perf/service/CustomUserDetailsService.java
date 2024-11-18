package com.example.sports_perf.service;

import com.example.sports_perf.dto.SignupRequest;
import com.example.sports_perf.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final Map<String, String> userStore = new HashMap<>(); // Temporary in-memory store

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        if (!userStore.containsKey(username)) {
            throw new UsernameNotFoundException("User not found");
        }
        return new User(username, userStore.get(username), new ArrayList<>());
    }

    public void saveUser(SignupRequest signupRequest) {
        validateSignupRequest(signupRequest);
        String hashedPassword = passwordEncoder.encode(signupRequest.getPassword());
        userStore.put(signupRequest.getUsername(), hashedPassword);
    }

    public String authenticateAndGenerateToken(SignupRequest authRequest) {
        UserDetails userDetails = loadUserByUsername(authRequest.getUsername());
        validateCredentials(authRequest, userDetails);
        return jwtUtil.generateToken(authRequest.getUsername(), authRequest.getUserType());
    }

    private void validateSignupRequest(SignupRequest signupRequest) {
        if (signupRequest.getUsername() == null || signupRequest.getUsername().isEmpty()) {
            throw new IllegalArgumentException("Username cannot be empty");
        }
        if (signupRequest.getPassword() == null || signupRequest.getPassword().length() < 6) {
            throw new IllegalArgumentException("Password must be at least 6 characters long");
        }
    }

    private void validateCredentials(SignupRequest authRequest, UserDetails userDetails) {
        if (!passwordEncoder.matches(authRequest.getPassword(), userDetails.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }
    }
}
