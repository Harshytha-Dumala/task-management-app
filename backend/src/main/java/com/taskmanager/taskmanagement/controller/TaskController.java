package com.taskmanager.taskmanagement.controller;

import com.taskmanager.taskmanagement.dto.TaskDTO;
import com.taskmanager.taskmanagement.entity.Task;
import com.taskmanager.taskmanagement.entity.TaskStatus;
import com.taskmanager.taskmanagement.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @PostMapping
    @PreAuthorize("hasRole('MANAGER')")
    public Task createTask(@RequestBody Task task) {
        return taskService.createTask(task);
    }

    @GetMapping
    @PreAuthorize("hasRole('MANAGER')")
    public List<TaskDTO> getAllTasks() {
        return taskService.getAllTasks().stream()
                .map(taskService::convertToDTO)
                .toList();
    }

    @GetMapping("/my-tasks")
    public List<TaskDTO> getMyTasks(Authentication authentication) {
        String email = authentication.getName();
        return taskService.getMyTasks(email).stream()
                .map(taskService::convertToDTO)
                .toList();
    }

    @GetMapping("/{id}")
    public TaskDTO getTaskById(@PathVariable Long id) {
        return taskService.convertToDTO(taskService.getTaskById(id));
    }

    @GetMapping("/status/{status}")
    @PreAuthorize("hasRole('MANAGER')")
    public List<TaskDTO> getTasksByStatus(@PathVariable TaskStatus status) {
        return taskService.getTasksByStatus(status).stream()
                .map(taskService::convertToDTO)
                .toList();
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('MANAGER')")
    public Task updateTask(@PathVariable Long id, @RequestBody Task task) {
        return taskService.updateTask(id, task);
    }

    @PutMapping("/{id}/progress")
    public TaskDTO updateProgress(@PathVariable Long id, @RequestBody Map<String, Object> body, Authentication authentication) {
        Integer progress = (Integer) body.get("progress");
        String updateNote = (String) body.get("updateNote");
        String email = authentication.getName();
        Task updated = taskService.updateProgress(id, progress, updateNote, email);
        return taskService.convertToDTO(updated);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('MANAGER')")
    public void deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
    }
}