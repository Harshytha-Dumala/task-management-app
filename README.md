# Task Management App

A full-stack task management application with role-based access control, built with Spring Boot and React.

## Features

- User authentication with JWT
- Role-based access: Manager and Employee
- Managers can create projects, assign tasks to employees, and track progress
- Employees can view assigned tasks and update progress with notes
- Task priority levels, due dates, and progress percentage tracking
- Editable user profiles (department, employee ID, bio)
- Clean error handling with global exception responses
- DTO-based API responses (no internal entity leakage)
- Bootstrap-based responsive UI

## Tech Stack

**Backend:**
- Java 21, Spring Boot
- Spring Security with JWT authentication
- Spring Data JPA (Hibernate)
- MySQL
- JUnit 5 + Mockito for service layer testing

**Frontend:**
- React
- React Router
- Bootstrap 5
- Axios

## Project Structure

- `backend/` — Spring Boot REST API
- `frontend/` — React application

## Getting Started

### Prerequisites
- Java 21
- Node.js and npm
- MySQL

### Backend Setup

Navigate to the backend folder:
cd backend
Update `src/main/resources/application.properties` with your MySQL credentials, then run:
mvnw spring-boot:run
Backend runs on `http://localhost:8080`

### Frontend Setup

Navigate to the frontend folder:
cd frontend
npm install
npm start
Frontend runs on `http://localhost:3000`

## Usage

1. Register an account, selecting either **Manager** or **Employee** role
2. Managers create projects, assign tasks to employees, and monitor progress
3. Employees view assigned tasks, update progress percentage, and add update notes

## Running Tests
cd backend
mvnw test
