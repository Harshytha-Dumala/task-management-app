package com.taskmanager.taskmanagement.service;

import com.taskmanager.taskmanagement.config.JwtUtil;
import com.taskmanager.taskmanagement.dto.RegisterRequest;
import com.taskmanager.taskmanagement.entity.Role;
import com.taskmanager.taskmanagement.entity.User;
import com.taskmanager.taskmanagement.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtUtil jwtUtil;

    @InjectMocks
    private AuthService authService;

    private User user;

    @BeforeEach
    void setUp() {
        user = new User();
        user.setId(1L);
        user.setName("Test User");
        user.setEmail("test@test.com");
        user.setPassword("encodedPassword");
        user.setRole(Role.EMPLOYEE);
    }

    @Test
    void register_shouldEncodePasswordAndSaveUser() {
        RegisterRequest request = new RegisterRequest();
        request.setName("Test User");
        request.setEmail("test@test.com");
        request.setPassword("plainPassword");
        request.setRole(Role.EMPLOYEE);

        when(passwordEncoder.encode("plainPassword")).thenReturn("encodedPassword");
        when(userRepository.save(any(User.class))).thenAnswer(inv -> inv.getArgument(0));

        User result = authService.register(request);

        assertEquals("encodedPassword", result.getPassword());
        assertEquals("test@test.com", result.getEmail());
        assertEquals(Role.EMPLOYEE, result.getRole());
        verify(userRepository).save(any(User.class));
    }

    @Test
    void login_withValidCredentials_shouldReturnToken() {
        when(userRepository.findByEmail("test@test.com")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("plainPassword", "encodedPassword")).thenReturn(true);
        when(jwtUtil.generateToken("test@test.com", "EMPLOYEE")).thenReturn("mocked-jwt-token");

        String token = authService.login("test@test.com", "plainPassword");

        assertEquals("mocked-jwt-token", token);
    }

    @Test
    void login_withInvalidPassword_shouldThrowException() {
        when(userRepository.findByEmail("test@test.com")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("wrongPassword", "encodedPassword")).thenReturn(false);

        assertThrows(RuntimeException.class, () -> authService.login("test@test.com", "wrongPassword"));
    }

    @Test
    void login_withNonExistentUser_shouldThrowException() {
        when(userRepository.findByEmail("notfound@test.com")).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> authService.login("notfound@test.com", "any"));
    }

    @Test
    void getUserInfo_shouldReturnCorrectDetails() {
        when(userRepository.findByEmail("test@test.com")).thenReturn(Optional.of(user));

        var info = authService.getUserInfo("test@test.com");

        assertEquals("EMPLOYEE", info.get("role"));
        assertEquals("Test User", info.get("name"));
        assertEquals("test@test.com", info.get("email"));
    }
}