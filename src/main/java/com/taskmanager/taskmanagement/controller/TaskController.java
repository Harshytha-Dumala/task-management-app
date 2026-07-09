package com.taskmanager.taskmanagement.controller;

import com.taskmanager.taskmanagement.dto.TaskDTO;
import com.taskmanager.taskmanagement.entity.Task;
import com.taskmanager.taskmanagement.entity.TaskStatus;
import com.taskmanager.taskmanagement.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @PostMapping
    public Task createTask(@RequestBody Task task) {
        return taskService.createTask(task);
    }

    @GetMapping
    public List<TaskDTO> getAllTasks() {
        return taskService.getAllTasks().stream()
                .map(taskService::convertToDTO)
                .toList();
    }

    @GetMapping("/{id}")
    public TaskDTO getTaskById(@PathVariable Long id) {
        return taskService.convertToDTO(taskService.getTaskById(id));
    }

    @GetMapping("/status/{status}")
    public List<TaskDTO> getTasksByStatus(@PathVariable TaskStatus status) {
        return taskService.getTasksByStatus(status).stream()
                .map(taskService::convertToDTO)
                .toList();
    }

    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id, @RequestBody Task task) {
        return taskService.updateTask(id, task);
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
    }
}