package com.taskmanager.taskmanagement.controller;

import com.taskmanager.taskmanagement.entity.Project;
import com.taskmanager.taskmanagement.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.taskmanager.taskmanagement.dto.ProjectDTO;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @PostMapping
    public Project createProject(@RequestBody Project project) {
        return projectService.createProject(project);
    }

    @GetMapping
    public List<ProjectDTO> getAllProjects() {
        return projectService.getAllProjects().stream()
                .map(projectService::convertToDTO)
                .toList();
    }

    @GetMapping("/{id}")
    public ProjectDTO getProjectById(@PathVariable Long id) {
        return projectService.convertToDTO(projectService.getProjectById(id));
    }

    @PutMapping("/{id}")
    public Project updateProject(@PathVariable Long id, @RequestBody Project project) {
        return projectService.updateProject(id, project);
    }

    @DeleteMapping("/{id}")
    public void deleteProject(@PathVariable Long id) {
        projectService.deleteProject(id);
    }
}