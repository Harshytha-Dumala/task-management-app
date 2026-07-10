package com.taskmanager.taskmanagement.repository;

import com.taskmanager.taskmanagement.entity.Task;
import com.taskmanager.taskmanagement.entity.TaskStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByStatus(TaskStatus status);
    List<Task> findByAssignedUserId(Long userId);
}