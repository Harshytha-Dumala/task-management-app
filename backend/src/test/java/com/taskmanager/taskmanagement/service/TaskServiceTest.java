package com.taskmanager.taskmanagement.service;

import com.taskmanager.taskmanagement.entity.Task;
import com.taskmanager.taskmanagement.entity.TaskStatus;
import com.taskmanager.taskmanagement.entity.User;
import com.taskmanager.taskmanagement.repository.TaskRepository;
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
class TaskServiceTest {

    @Mock
    private TaskRepository taskRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private TaskService taskService;

    private Task task;
    private User user;

    @BeforeEach
    void setUp() {
        user = new User();
        user.setId(1L);
        user.setEmail("employee@test.com");

        task = new Task();
        task.setId(1L);
        task.setTitle("Test Task");
        task.setStatus(TaskStatus.TODO);
        task.setProgress(0);
        task.setAssignedUser(user);
    }

    @Test
    void createTask_shouldSaveAndReturnTask() {
        when(taskRepository.save(task)).thenReturn(task);

        Task result = taskService.createTask(task);

        assertEquals("Test Task", result.getTitle());
        verify(taskRepository).save(task);
    }

    @Test
    void getTaskById_whenExists_shouldReturnTask() {
        when(taskRepository.findById(1L)).thenReturn(Optional.of(task));

        Task result = taskService.getTaskById(1L);

        assertEquals(1L, result.getId());
    }

    @Test
    void getTaskById_whenNotExists_shouldThrowException() {
        when(taskRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> taskService.getTaskById(99L));
    }

    @Test
    void getMyTasks_shouldReturnTasksForUser() {
        when(userRepository.findByEmail("employee@test.com")).thenReturn(Optional.of(user));
        when(taskRepository.findByAssignedUserId(1L)).thenReturn(List.of(task));

        List<Task> result = taskService.getMyTasks("employee@test.com");

        assertEquals(1, result.size());
        assertEquals("Test Task", result.get(0).getTitle());
    }

    @Test
    void updateProgress_whenAssignedUserMatches_shouldUpdateSuccessfully() {
        when(taskRepository.findById(1L)).thenReturn(Optional.of(task));
        when(userRepository.findByEmail("employee@test.com")).thenReturn(Optional.of(user));
        when(taskRepository.save(any(Task.class))).thenAnswer(inv -> inv.getArgument(0));

        Task result = taskService.updateProgress(1L, 100, "Done with task", "employee@test.com");

        assertEquals(100, result.getProgress());
        assertEquals(TaskStatus.DONE, result.getStatus());
        assertEquals("Done with task", result.getUpdateNote());
    }

    @Test
    void updateProgress_whenUserNotAssigned_shouldThrowException() {
        User otherUser = new User();
        otherUser.setId(2L);
        otherUser.setEmail("other@test.com");

        when(taskRepository.findById(1L)).thenReturn(Optional.of(task));
        when(userRepository.findByEmail("other@test.com")).thenReturn(Optional.of(otherUser));

        assertThrows(RuntimeException.class, () -> taskService.updateProgress(1L, 50, "note", "other@test.com"));
    }

    @Test
    void deleteTask_shouldCallRepositoryDelete() {
        taskService.deleteTask(1L);
        verify(taskRepository).deleteById(1L);
    }
}