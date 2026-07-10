import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getTasks, createTask, getUsers, deleteTask, updateTask } from '../services/api';

function ProjectDetail() {
    const { id } = useParams();
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [newTask, setNewTask] = useState({
        title: '', description: '', status: 'TODO', priority: 'MEDIUM',
        dueDate: '', project: { id }, assignedUser: { id: '' }
    });

    useEffect(() => {
        loadData();
    }, [id]);

    const loadData = async () => {
        const [t, u] = await Promise.all([getTasks(), getUsers()]);
        setTasks(t.data.filter(task => String(task.projectId) === String(id)));
        setUsers(u.data.filter(u => u.role === 'EMPLOYEE'));
    };

    const handleCreateTask = async (e) => {
        e.preventDefault();
        await createTask(newTask);
        setNewTask({ title: '', description: '', status: 'TODO', priority: 'MEDIUM', dueDate: '', project: { id }, assignedUser: { id: '' } });
        setShowForm(false);
        loadData();
    };

    const handleDeleteTask = async (taskId) => {
        await deleteTask(taskId);
        loadData();
    };

    const priorityBadge = (priority) => {
        if (priority === 'HIGH') return 'bg-danger';
        if (priority === 'MEDIUM') return 'bg-warning text-dark';
        return 'bg-secondary';
    };

    return (
        <div>
            <Link to="/" className="text-decoration-none">&larr; Back to Projects</Link>
            <div className="d-flex justify-content-between align-items-center my-3">
                <h3>Project Tasks</h3>
                <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
                    {showForm ? 'Cancel' : '+ Assign Task'}
                </button>
            </div>

            {showForm && (
                <div className="card p-3 mb-4 shadow-sm">
                    <form onSubmit={handleCreateTask} className="row g-2">
                        <div className="col-md-3">
                            <input className="form-control" placeholder="Task Title" value={newTask.title}
                                   onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} required />
                        </div>
                        <div className="col-md-3">
                            <input className="form-control" placeholder="Description" value={newTask.description}
                                   onChange={(e) => setNewTask({ ...newTask, description: e.target.value })} />
                        </div>
                        <div className="col-md-2">
                            <select className="form-select" value={newTask.priority}
                                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}>
                                <option value="LOW">Low</option>
                                <option value="MEDIUM">Medium</option>
                                <option value="HIGH">High</option>
                            </select>
                        </div>
                        <div className="col-md-2">
                            <input type="date" className="form-control" value={newTask.dueDate}
                                   onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })} />
                        </div>
                        <div className="col-md-2">
                            <select className="form-select" value={newTask.assignedUser.id}
                                    onChange={(e) => setNewTask({ ...newTask, assignedUser: { id: e.target.value } })} required>
                                <option value="">Assign To</option>
                                {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                            </select>
                        </div>
                        <div className="col-md-12 mt-2">
                            <button type="submit" className="btn btn-success">Create Task</button>
                        </div>
                    </form>
                </div>
            )}

            {tasks.map(t => (
                <div key={t.id} className="card p-3 mb-2 shadow-sm">
                    <div className="d-flex justify-content-between align-items-start">
                        <div>
                            <strong>{t.title}</strong>
                            <span className={`badge ms-2 ${priorityBadge(t.priority)}`}>{t.priority}</span>
                            <div className="text-muted small">{t.description}</div>
                            <div className="text-muted small">Assigned to: {t.assignedUserName || 'Unassigned'}</div>
                            {t.dueDate && <div className="text-muted small">Due: {t.dueDate}</div>}
                        </div>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteTask(t.id)}>Delete</button>
                    </div>
                    <div className="mt-2">
                        <div className="progress" style={{ height: '8px' }}>
                            <div className="progress-bar bg-success" style={{ width: `${t.progress || 0}%` }} />
                        </div>
                        <small className="text-muted">{t.progress || 0}% complete — {t.status}</small>
                        {t.updateNote && <div className="text-muted small mt-1">Note: {t.updateNote}</div>}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ProjectDetail;