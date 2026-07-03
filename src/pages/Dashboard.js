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

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h2>Task Manager</h2>
                <button onClick={onLogout}>Logout</button>
            </div>

            {/* Create Project */}
            <h3>Create Project</h3>
            <form onSubmit={handleCreateProject} style={{ marginBottom: '20px' }}>
                <input placeholder="Project Name" value={newProject.name}
                       onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                       style={{ marginRight: '10px', padding: '8px' }} />
                <input placeholder="Description" value={newProject.description}
                       onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                       style={{ marginRight: '10px', padding: '8px' }} />
                <button type="submit">Add Project</button>
            </form>

            {/* Create Task */}
            <h3>Create Task</h3>
            <form onSubmit={handleCreateTask} style={{ marginBottom: '20px' }}>
                <input placeholder="Task Title" value={newTask.title}
                       onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                       style={{ marginRight: '10px', padding: '8px' }} />
                <input placeholder="Description" value={newTask.description}
                       onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                       style={{ marginRight: '10px', padding: '8px' }} />
                <select value={newTask.status}
                        onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
                        style={{ marginRight: '10px', padding: '8px' }}>
                    <option value="TODO">TODO</option>
                    <option value="IN_PROGRESS">IN PROGRESS</option>
                    <option value="DONE">DONE</option>
                </select>
                <select value={newTask.project.id}
                        onChange={(e) => setNewTask({ ...newTask, project: { id: e.target.value } })}
                        style={{ marginRight: '10px', padding: '8px' }}>
                    <option value="">Select Project</option>
                    {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
                <select value={newTask.assignedUser.id}
                        onChange={(e) => setNewTask({ ...newTask, assignedUser: { id: e.target.value } })}
                        style={{ marginRight: '10px', padding: '8px' }}>
                    <option value="">Assign User</option>
                    {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                </select>
                <button type="submit">Add Task</button>
            </form>

            {/* Projects List */}
            <h3>Projects</h3>
            {projects.map(p => (
                <div key={p.id} style={{ padding: '10px', border: '1px solid #ccc', marginBottom: '10px' }}>
                    <strong>{p.name}</strong> — {p.description}
                </div>
            ))}

            {/* Tasks List */}
            <h3>Tasks</h3>
            {tasks.map(t => (
                <div key={t.id} style={{ padding: '10px', border: '1px solid #ccc', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <strong>{t.title}</strong> — {t.description}
                        <span style={{ marginLeft: '10px', color: 'gray' }}>{t.status}</span>
                    </div>
                    <div>
                        <select value={t.status} onChange={(e) => handleStatusChange(t, e.target.value)}
                                style={{ marginRight: '10px', padding: '5px' }}>
                            <option value="TODO">TODO</option>
                            <option value="IN_PROGRESS">IN PROGRESS</option>
                            <option value="DONE">DONE</option>
                        </select>
                        <button onClick={() => handleDeleteTask(t.id)} style={{ color: 'red' }}>Delete</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Dashboard;