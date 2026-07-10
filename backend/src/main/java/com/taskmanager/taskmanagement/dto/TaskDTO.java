package com.taskmanager.taskmanagement.dto;

import com.taskmanager.taskmanagement.entity.Priority;
import com.taskmanager.taskmanagement.entity.TaskStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TaskDTO {
    private Long id;
    private String title;
    private String description;
    private TaskStatus status;
    private Integer progress;
    private LocalDate dueDate;
    private Priority priority;
    private String updateNote;
    private Long projectId;
    private String projectName;
    private Long assignedUserId;
    private String assignedUserName;
}