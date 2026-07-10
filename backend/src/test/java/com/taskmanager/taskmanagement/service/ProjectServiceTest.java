package com.taskmanager.taskmanagement.service;

import com.taskmanager.taskmanagement.entity.Project;
import com.taskmanager.taskmanagement.repository.ProjectRepository;
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
class ProjectServiceTest {

    @Mock
    private ProjectRepository projectRepository;

    @InjectMocks
    private ProjectService projectService;

    private Project project;

    @BeforeEach
    void setUp() {
        project = new Project();
        project.setId(1L);
        project.setName("Test Project");
        project.setDescription("Test Description");
    }

    @Test
    void createProject_shouldSaveAndReturnProject() {
        when(projectRepository.save(project)).thenReturn(project);

        Project result = projectService.createProject(project);

        assertEquals("Test Project", result.getName());
        verify(projectRepository).save(project);
    }

    @Test
    void getAllProjects_shouldReturnList() {
        when(projectRepository.findAll()).thenReturn(List.of(project));

        List<Project> result = projectService.getAllProjects();

        assertEquals(1, result.size());
    }

    @Test
    void getProjectById_whenExists_shouldReturnProject() {
        when(projectRepository.findById(1L)).thenReturn(Optional.of(project));

        Project result = projectService.getProjectById(1L);

        assertEquals("Test Project", result.getName());
    }

    @Test
    void getProjectById_whenNotExists_shouldThrowException() {
        when(projectRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> projectService.getProjectById(99L));
    }

    @Test
    void updateProject_shouldUpdateFieldsAndSave() {
        Project updated = new Project();
        updated.setName("Updated Name");
        updated.setDescription("Updated Description");

        when(projectRepository.findById(1L)).thenReturn(Optional.of(project));
        when(projectRepository.save(any(Project.class))).thenAnswer(inv -> inv.getArgument(0));

        Project result = projectService.updateProject(1L, updated);

        assertEquals("Updated Name", result.getName());
        assertEquals("Updated Description", result.getDescription());
    }

    @Test
    void deleteProject_shouldCallRepositoryDelete() {
        projectService.deleteProject(1L);
        verify(projectRepository).deleteById(1L);
    }

    @Test
    void convertToDTO_shouldMapFieldsCorrectly() {
        var dto = projectService.convertToDTO(project);

        assertEquals(project.getId(), dto.getId());
        assertEquals(project.getName(), dto.getName());
        assertEquals(project.getDescription(), dto.getDescription());
    }
}