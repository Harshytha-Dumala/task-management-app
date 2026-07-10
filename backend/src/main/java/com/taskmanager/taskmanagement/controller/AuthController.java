package com.taskmanager.taskmanagement.controller;

import com.taskmanager.taskmanagement.dto.RegisterRequest;
import com.taskmanager.taskmanagement.entity.User;
import com.taskmanager.taskmanagement.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public User register(@RequestBody RegisterRequest request) {
        return authService.register(request);
    }

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String password = request.get("password");
        String token = authService.login(email, password);
        Map<String, String> userInfo = authService.getUserInfo(email);
        Map<String, String> response = new java.util.HashMap<>();
        response.put("token", token);
        response.put("role", userInfo.get("role"));
        response.put("name", userInfo.get("name"));
        response.put("email", userInfo.get("email"));
        return response;
    }
}