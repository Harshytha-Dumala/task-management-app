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
        setEditingId(task.id);
        setProgressInput(task.progress || 0);
        setNoteInput(task.updateNote || '');
    };

    const handleUpdate = async (taskId) => {
        await updateTaskProgress(taskId, { progress: Number(progressInput), updateNote: noteInput });
        setEditingId(null);
        loadTasks();
    };

    const priorityBadge = (priority) => {
        if (priority === 'HIGH') return 'bg-danger';
        if (priority === 'MEDIUM') return 'bg-warning text-dark';
        return 'bg-secondary';
    };

    return (
        <div>
            <h3 className="mb-4">My Tasks</h3>
            {tasks.length === 0 && <p className="text-muted">No tasks assigned yet.</p>}
            {tasks.map(t => (
                <div key={t.id} className="card p-3 mb-3 shadow-sm">
                    <div className="d-flex justify-content-between align-items-start">
                        <div>
                            <strong>{t.title}</strong>
                            <span className={`badge ms-2 ${priorityBadge(t.priority)}`}>{t.priority}</span>
                            <div className="text-muted small">{t.description}</div>
                            <div className="text-muted small">Project: {t.projectName}</div>
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
                        <small className="text-muted">{t.progress || 0}% complete — {t.status}</small>
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

    const tabs = [
        { path: '/', label: 'My Tasks' },
    ];

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