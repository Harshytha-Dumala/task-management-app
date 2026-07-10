import React, { useState, useEffect } from 'react';
import { getProjects, createProject, getTasks, createTask, updateTask, deleteTask, getUsers } from '../services/api';

function Dashboard({ onLogout }) {
    const [projects, setProjects] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);
    const [newProject, setNewProject] = useState({ name: '', description: '' });
    const [newTask, setNewTask] = useState({ title: '', description: '', status: 'TODO', project: { id: '' }, assignedUser: { id: '' } });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const [p, t, u] = await Promise.all([getProjects(), getTasks(), getUsers()]);
        setProjects(p.data);
        setTasks(t.data);
        setUsers(u.data);
    };

    const handleCreateProject = async (e) => {
        e.preventDefault();
        await createProject(newProject);
        setNewProject({ name: '', description: '' });
        loadData();
    };

    const handleCreateTask = async (e) => {
        e.preventDefault();
        await createTask(newTask);
        setNewTask({ title: '', description: '', status: 'TODO', project: { id: '' }, assignedUser: { id: '' } });
        loadData();
    };

    const handleStatusChange = async (task, status) => {
        await updateTask(task.id, { ...task, status });
        loadData();
    };

    const handleDeleteTask = async (id) => {
        await deleteTask(id);
        loadData();
    };

    const statusBadge = (status) => {
        if (status === 'DONE') return 'bg-success';
        if (status === 'IN_PROGRESS') return 'bg-warning text-dark';
        return 'bg-secondary';
    };

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Task Manager</h2>
                <button className="btn btn-outline-danger" onClick={onLogout}>Logout</button>
            </div>

            {/* Create Project */}
            <div className="card p-3 mb-4 shadow-sm">
                <h5>Create Project</h5>
                <form onSubmit={handleCreateProject} className="row g-2">
                    <div className="col-md-4">
                        <input className="form-control" placeholder="Project Name" value={newProject.name}
                               onChange={(e) => setNewProject({ ...newProject, name: e.target.value })} />
                    </div>
                    <div className="col-md-6">
                        <input className="form-control" placeholder="Description" value={newProject.description}
                               onChange={(e) => setNewProject({ ...newProject, description: e.target.value })} />
                    </div>
                    <div className="col-md-2">
                        <button type="submit" className="btn btn-primary w-100">Add</button>
                    </div>
                </form>
            </div>

            {/* Create Task */}
            <div className="card p-3 mb-4 shadow-sm">
                <h5>Create Task</h5>
                <form onSubmit={handleCreateTask} className="row g-2">
                    <div className="col-md-2">
                        <input className="form-control" placeholder="Title" value={newTask.title}
                               onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} />
                    </div>
                    <div className="col-md-2">
                        <input className="form-control" placeholder="Description" value={newTask.description}
                               onChange={(e) => setNewTask({ ...newTask, description: e.target.value })} />
                    </div>
                    <div className="col-md-2">
                        <select className="form-select" value={newTask.status}
                                onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}>
                            <option value="TODO">TODO</option>
                            <option value="IN_PROGRESS">IN PROGRESS</option>
                            <option value="DONE">DONE</option>
                        </select>
                    </div>
                    <div className="col-md-2">
                        <select className="form-select" value={newTask.project.id}
                                onChange={(e) => setNewTask({ ...newTask, project: { id: e.target.value } })}>
                            <option value="">Select Project</option>
                            {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                        </select>
                    </div>
                    <div className="col-md-2">
                        <select className="form-select" value={newTask.assignedUser.id}
                                onChange={(e) => setNewTask({ ...newTask, assignedUser: { id: e.target.value } })}>
                            <option value="">Assign User</option>
                            {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                        </select>
                    </div>
                    <div className="col-md-2">
                        <button type="submit" className="btn btn-primary w-100">Add</button>
                    </div>
                </form>
            </div>

            {/* Projects List */}
            <h5>Projects</h5>
            <div className="row mb-4">
                {projects.map(p => (
                    <div className="col-md-4 mb-2" key={p.id}>
                        <div className="card p-3 shadow-sm">
                            <strong>{p.name}</strong>
                            <div className="text-muted small">{p.description}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Tasks List */}
            <h5>Tasks</h5>
            {tasks.map(t => (
                <div key={t.id} className="card p-3 mb-2 shadow-sm d-flex flex-row justify-content-between align-items-center">
                    <div>
                        <strong>{t.title}</strong> — <span className="text-muted">{t.description}</span>
                        <span className={`badge ms-2 ${statusBadge(t.status)}`}>{t.status}</span>
                    </div>
                    <div className="d-flex gap-2">
                        <select className="form-select form-select-sm" value={t.status}
                                onChange={(e) => handleStatusChange(t, e.target.value)}>
                            <option value="TODO">TODO</option>
                            <option value="IN_PROGRESS">IN PROGRESS</option>
                            <option value="DONE">DONE</option>
                        </select>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteTask(t.id)}>Delete</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Dashboard;