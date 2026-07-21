import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getTasks, createTask, getUsers, deleteTask, updateTask, getUserById } from '../services/api';

function ProjectDetail() {
    const { id } = useParams();
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);
    const [previewUser, setPreviewUser] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [newTask, setNewTask] = useState({
        title: '', description: '', status: 'TODO',
        dueDate: '', project: { id }, assignedUser: { id: '' }
    });

    useEffect(() => {
        loadData();
    }, [id]);

    const isOverdue = (task) => {
        if (!task.dueDate || task.status === 'DONE') return false;
        return new Date(task.dueDate) < new Date(new Date().toDateString());
    };

    const loadData = async () => {
        const [t, u] = await Promise.all([getTasks(), getUsers()]);
        setTasks(t.data.filter(task => String(task.projectId) === String(id)));
        setUsers(u.data.filter(u => u.role === 'EMPLOYEE'));
    };

    const handleCreateTask = async (e) => {
        e.preventDefault();
        await createTask(newTask);
        setNewTask({ title: '', description: '', status: 'TODO', dueDate: '', project: { id }, assignedUser: { id: '' } });
        setPreviewUser(null);
        setShowForm(false);
        loadData();
    };

    const handleDeleteTask = async (taskId) => {
        await deleteTask(taskId);
        loadData();
    };

    const handlePreview = async (userId) => {
        if (!userId) {
            setPreviewUser(null);
            return;
        }
        const res = await getUserById(userId);
        setPreviewUser(res.data);
    };

    const formatStatus = (status) => {
        if (status === 'IN_PROGRESS') return 'In Progress';
        if (status === 'DONE') return 'Done';
        if (status === 'TODO') return 'To Do';
        return status;
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
                            <input type="date" className="form-control" value={newTask.dueDate}
                                   onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })} />
                        </div>
                        <div className="col-md-3">
                            <select className="form-select" value={newTask.assignedUser.id}
                                    onChange={(e) => {
                                        setNewTask({ ...newTask, assignedUser: { id: e.target.value } });
                                        handlePreview(e.target.value);
                                    }} required>
                                <option value="">Assign To</option>
                                {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                            </select>
                        </div>
                        <div className="col-md-12 mt-2">
                            <button type="submit" className="btn btn-success">Create Task</button>
                        </div>
                    </form>

                    {previewUser && (
                        <div className="card p-3 mt-2 shadow-sm bg-light">
                            <strong>{previewUser.name}</strong>
                            <div className="text-muted small">{previewUser.email}</div>
                            <div className="text-muted small">Department: {previewUser.department || '—'}</div>
                            <div className="text-muted small">Employee ID: {previewUser.employeeId || '—'}</div>
                            <div className="text-muted small">Bio: {previewUser.bio || '—'}</div>
                        </div>
                    )}
                </div>
            )}

            {tasks.map(t => (
                <div key={t.id} className={`card p-3 mb-2 shadow-sm ${isOverdue(t) ? 'border-danger' : ''}`}>
                    <div className="d-flex justify-content-between align-items-start">
                        <div>
                            <strong>{t.title}</strong>
                            {isOverdue(t) && <span className="badge bg-danger ms-2">Overdue</span>}
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
                        <small className="text-muted">{t.progress || 0}% complete — {formatStatus(t.status)}</small>
                        {t.updateNote && <div className="text-muted small mt-1">Note: {t.updateNote}</div>}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ProjectDetail;