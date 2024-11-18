package com.example.sports_perf.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class LoginRequest {
    private String username;
    private String email;
    private String password;
    private String userType;
}
