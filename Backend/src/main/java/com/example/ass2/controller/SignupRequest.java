package com.example.ass2.controller;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class SignupRequest {
    // Getters and Setters
    private String firstname;
    private String lastname;
    private String username;
    private String password;
    private String email;
    private String userType;

}
