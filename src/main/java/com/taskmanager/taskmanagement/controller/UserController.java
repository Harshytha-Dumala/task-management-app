package com.taskmanager.taskmanagement.controller;

import com.taskmanager.taskmanagement.dto.UserDTO;
import com.taskmanager.taskmanagement.entity.User;
import com.taskmanager.taskmanagement.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping
    public UserDTO createUser(@RequestBody User user) {
        return userService.convertToDTO(userService.createUser(user));
    }

    @GetMapping
    public List<UserDTO> getAllUsers() {
        return userService.getAllUsers()
                .stream()
                .map(userService::convertToDTO)
                .collect(java.util.stream.Collectors.toList());
    }

    @GetMapping("/{id}")
    public UserDTO getUserById(@PathVariable Long id) {
        return userService.convertToDTO(userService.getUserById(id));
    }

    @PutMapping("/{id}")
    public UserDTO updateUser(@PathVariable Long id, @RequestBody User user) {
        return userService.convertToDTO(userService.updateUser(id, user));
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }
}