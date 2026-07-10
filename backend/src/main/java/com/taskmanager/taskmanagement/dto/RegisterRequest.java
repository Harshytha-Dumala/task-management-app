package com.taskmanager.taskmanagement.dto;

import com.taskmanager.taskmanagement.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {
    private String name;
    private String email;
    private String password;
    private Role role;
    private String department;
    private String employeeId;
    private String bio;
}