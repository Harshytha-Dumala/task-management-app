package com.taskmanager.taskmanagement.dto;

import com.taskmanager.taskmanagement.entity.Role;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private Long id;
    private String name;
    private String email;
    private Role role;
    private String department;
    private String employeeId;
    private String bio;
}