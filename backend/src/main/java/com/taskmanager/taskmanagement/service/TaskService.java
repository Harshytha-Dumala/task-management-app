package com.taskmanager.taskmanagement.service;

import com.taskmanager.taskmanagement.dto.TaskDTO;
import com.taskmanager.taskmanagement.entity.Task;
import com.taskmanager.taskmanagement.entity.TaskStatus;
import com.taskmanager.taskmanagement.entity.User;
import com.taskmanager.taskmanagement.repository.TaskRepository;
import com.taskmanager.taskmanagement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserRepository userRepository;

    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Task getTaskById(Long id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + id));
    }

    public List<Task> getTasksByStatus(TaskStatus status) {
        return taskRepository.findByStatus(status);
    }

    public List<Task> getMyTasks(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return taskRepository.findByAssignedUserId(user.getId());
    }

    public Task updateTask(Long id, Task updatedTask) {
        Task existing = getTaskById(id);
        existing.setTitle(updatedTask.getTitle());
        existing.setDescription(updatedTask.getDescription());
        existing.setStatus(updatedTask.getStatus());
        existing.setPriority(updatedTask.getPriority());
        existing.setDueDate(updatedTask.getDueDate());
        return taskRepository.save(existing);
    }

    public Task updateProgress(Long id, Integer progress, String updateNote, String email) {
        Task existing = getTaskById(id);
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (existing.getAssignedUser() == null || !existing.getAssignedUser().getId().equals(user.getId())) {
            throw new RuntimeException("You are not assigned to this task");
        }

        existing.setProgress(progress);
        existing.setUpdateNote(updateNote);
        if (progress != null && progress == 100) {
            existing.setStatus(TaskStatus.DONE);
        } else if (progress != null && progress > 0) {
            existing.setStatus(TaskStatus.IN_PROGRESS);
        }
        return taskRepository.save(existing);
    }

    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

    public TaskDTO convertToDTO(Task task) {
        return new TaskDTO(
                task.getId(),
                task.getTitle(),
                task.getDescription(),
                task.getStatus(),
                task.getProgress(),
                task.getDueDate(),
                task.getPriority(),
                task.getUpdateNote(),
                task.getProject() != null ? task.getProject().getId() : null,
                task.getProject() != null ? task.getProject().getName() : null,
                task.getAssignedUser() != null ? task.getAssignedUser().getId() : null,
                task.getAssignedUser() != null ? task.getAssignedUser().getName() : null
        );
    }
}