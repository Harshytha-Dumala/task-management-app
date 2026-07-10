package com.taskmanager.taskmanagement.service;

import com.taskmanager.taskmanagement.dto.UserDTO;
import com.taskmanager.taskmanagement.entity.User;
import com.taskmanager.taskmanagement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
    }

    public User updateUser(Long id, User updatedUser) {
        User existing = getUserById(id);
        existing.setName(updatedUser.getName());
        existing.setEmail(updatedUser.getEmail());
        return userRepository.save(existing);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public UserDTO convertToDTO(User user) {
        return new UserDTO(user.getId(), user.getName(), user.getEmail(), user.getRole(),
                user.getDepartment(), user.getEmployeeId(), user.getBio());
    }
    public UserDTO getMyProfile(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return convertToDTO(user);
    }

    public UserDTO updateMyProfile(String email, User updatedInfo) {
        User existing = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        existing.setName(updatedInfo.getName());
        existing.setDepartment(updatedInfo.getDepartment());
        existing.setBio(updatedInfo.getBio());
        existing.setEmployeeId(updatedInfo.getEmployeeId());
        return convertToDTO(userRepository.save(existing));
    }
}