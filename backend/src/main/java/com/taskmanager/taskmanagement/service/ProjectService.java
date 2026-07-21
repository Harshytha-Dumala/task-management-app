package com.taskmanager.taskmanagement.service;

import com.taskmanager.taskmanagement.entity.Project;
import com.taskmanager.taskmanagement.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.taskmanager.taskmanagement.dto.ProjectDTO;

import java.util.List;

@Service
public class ProjectService {
    @Autowired
    private com.taskmanager.taskmanagement.repository.TaskRepository taskRepository;
    @Autowired
    private ProjectRepository projectRepository;

    public Project createProject(Project project) {
        return projectRepository.save(project);
    }

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public Project getProjectById(Long id) {
        return projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found with id: " + id));
    }
    public Project updateProject(Long id, Project updatedProject) {
        Project existing = getProjectById(id);
        existing.setName(updatedProject.getName());
        existing.setDescription(updatedProject.getDescription());
        return projectRepository.save(existing);
    }

    public void deleteProject(Long id) {
        projectRepository.deleteById(id);
    }
    public ProjectDTO convertToDTO(Project project) {
        List<com.taskmanager.taskmanagement.entity.Task> tasks = taskRepository.findAll().stream()
                .filter(t -> t.getProject() != null && t.getProject().getId().equals(project.getId()))
                .toList();

        double avgProgress = 0;
        if (!tasks.isEmpty()) {
            avgProgress = tasks.stream()
                    .mapToInt(t -> t.getProgress() != null ? t.getProgress() : 0)
                    .average()
                    .orElse(0);
        }

        return new ProjectDTO(project.getId(), project.getName(), project.getDescription(), avgProgress);
    }
}