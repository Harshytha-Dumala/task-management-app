package com.taskmanager.taskmanagement.service;

import com.taskmanager.taskmanagement.entity.Role;
import com.taskmanager.taskmanagement.entity.User;
import com.taskmanager.taskmanagement.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    private User user;

    @BeforeEach
    void setUp() {
        user = new User();
        user.setId(1L);
        user.setName("Test User");
        user.setEmail("test@test.com");
        user.setRole(Role.EMPLOYEE);
        user.setDepartment("Engineering");
        user.setEmployeeId("EMP001");
        user.setBio("Test bio");
    }

    @Test
    void getAllUsers_shouldReturnList() {
        when(userRepository.findAll()).thenReturn(List.of(user));

        List<User> result = userService.getAllUsers();

        assertEquals(1, result.size());
    }

    @Test
    void getUserById_whenExists_shouldReturnUser() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));

        User result = userService.getUserById(1L);

        assertEquals("Test User", result.getName());
    }

    @Test
    void getUserById_whenNotExists_shouldThrowException() {
        when(userRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> userService.getUserById(99L));
    }

    @Test
    void convertToDTO_shouldMapAllFieldsCorrectly() {
        var dto = userService.convertToDTO(user);

        assertEquals(user.getId(), dto.getId());
        assertEquals(user.getName(), dto.getName());
        assertEquals(user.getEmail(), dto.getEmail());
        assertEquals(user.getRole(), dto.getRole());
        assertEquals(user.getDepartment(), dto.getDepartment());
        assertEquals(user.getEmployeeId(), dto.getEmployeeId());
        assertEquals(user.getBio(), dto.getBio());
    }

    @Test
    void updateMyProfile_shouldUpdateFieldsAndSave() {
        User updatedInfo = new User();
        updatedInfo.setName("Updated Name");
        updatedInfo.setDepartment("Marketing");
        updatedInfo.setEmployeeId("EMP002");
        updatedInfo.setBio("Updated bio");

        when(userRepository.findByEmail("test@test.com")).thenReturn(Optional.of(user));
        when(userRepository.save(any(User.class))).thenAnswer(inv -> inv.getArgument(0));

        var result = userService.updateMyProfile("test@test.com", updatedInfo);

        assertEquals("Updated Name", result.getName());
        assertEquals("Marketing", result.getDepartment());
        assertEquals("EMP002", result.getEmployeeId());
        assertEquals("Updated bio", result.getBio());
    }

    @Test
    void deleteUser_shouldCallRepositoryDelete() {
        userService.deleteUser(1L);
        verify(userRepository).deleteById(1L);
    }
}