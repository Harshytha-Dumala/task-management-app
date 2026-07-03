package com.taskmanager.taskmanagement.repository;

import com.taskmanager.taskmanagement.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, Long> {
}