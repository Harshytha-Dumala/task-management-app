import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getMyTasks, updateTaskProgress } from '../services/api';

function MyTasks() {
    const [tasks, setTasks] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [progressInput, setProgressInput] = useState(0);
    const [noteInput, setNoteInput] = useState('');

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        const res = await getMyTasks();
        setTasks(res.data);
    };

    const startEdit = (task) => {
        setEditingId(task.id);const tabs = [
            { path: '/', label: 'Projects' },
        ];
        setProgressInput(task.progress || 0);
        setNoteInput(task.updateNote || '');
    };

    const handleUpdate = async (taskId) => {
        await updateTaskProgress(taskId, { progress: Number(progressInput), updateNote: noteInput });
        setEditingId(null);
        loadTasks();
    };

    const formatStatus = (status) => {
        if (status === 'IN_PROGRESS') return 'In Progress';
        if (status === 'DONE') return 'Done';
        if (status === 'TODO') return 'To Do';
        return status;
    };
    const isOverdue = (task) => {
        if (!task.dueDate || task.status === 'DONE') return false;
        return new Date(task.dueDate) < new Date(new Date().toDateString());
    };
    return (
        <div>
            <h3 className="mb-4">My Tasks</h3>
            {tasks.length === 0 && <p className="text-muted">No tasks assigned yet.</p>}
            {tasks.map(t => (
                <div key={t.id} className={`card p-3 mb-3 shadow-sm ${isOverdue(t) ? 'border-danger' : ''}`}>
                    <div className="d-flex justify-content-between align-items-start">
                        <div>
                            <strong>{t.title}</strong>
                            {isOverdue(t) && <span className="badge bg-danger ms-2">Overdue</span>}
                            <div className="text-muted small">{t.description}</div>
                            <div className="text-muted small">Project: {t.projectName}</div>
                            <div className="text-muted small">Assigned by: {t.assignedByManagerName || 'Unknown'}</div>
                            {t.dueDate && <div className="text-muted small">Due: {t.dueDate}</div>}
                        </div>
                        {editingId !== t.id && (
                            <button className="btn btn-sm btn-outline-primary" onClick={() => startEdit(t)}>
                                Update
                            </button>
                        )}
                    </div>

                    <div className="mt-2">
                        <div className="progress" style={{ height: '8px' }}>
                            <div className="progress-bar bg-success" style={{ width: `${t.progress || 0}%` }} />
                        </div>
                        <small className="text-muted">{t.progress || 0}% complete — {formatStatus(t.status)}</small>
                    </div>

                    {editingId === t.id && (
                        <div className="mt-3 border-top pt-3">
                            <label className="form-label small">Progress: {progressInput}%</label>
                            <input type="range" className="form-range" min="0" max="100" value={progressInput}
                                   onChange={(e) => setProgressInput(e.target.value)} />
                            <textarea className="form-control mt-2" placeholder="Update note / description of work done"
                                      value={noteInput} onChange={(e) => setNoteInput(e.target.value)} rows="2" />
                            <div className="mt-2 d-flex gap-2">
                                <button className="btn btn-success btn-sm" onClick={() => handleUpdate(t.id)}>Save</button>
                                <button className="btn btn-secondary btn-sm" onClick={() => setEditingId(null)}>Cancel</button>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

function EmployeeDashboard({ onLogout }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout();
        navigate('/login');
    };

    const tabs = [];
    const formatStatus = (status) => {
        if (status === 'IN_PROGRESS') return 'In Progress';
        if (status === 'DONE') return 'Done';
        if (status === 'TODO') return 'To Do';
        return status;
    };
    const isOverdue = (task) => {
        if (!task.dueDate || task.status === 'DONE') return false;
        return new Date(task.dueDate) < new Date(new Date().toDateString());
    };

    return (
        <div>
            <Navbar tabs={tabs} onLogout={handleLogout} />
            <div className="p-4">
                <Routes>
                    <Route path="/" element={<MyTasks />} />
                </Routes>
            </div>
        </div>
    );
}

export default EmployeeDashboard;