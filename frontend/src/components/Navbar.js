import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import ProfileModal from './ProfileModal';
import { useState, useEffect } from 'react';
import { getMyTasks, markTaskSeen } from '../services/api';
function Navbar({ tabs, onLogout }) {
    const location = useLocation();
    const name = localStorage.getItem('name');
    const role = localStorage.getItem('role');
    const [unseenTasks, setUnseenTasks] = useState([]);

    useEffect(() => {
        if (role === 'EMPLOYEE') {
            loadUnseenTasks();
        }
    }, []);

    const loadUnseenTasks = async () => {
        const res = await getMyTasks();
        setUnseenTasks(res.data.filter(t => !t.seenByAssignee));
    };

    const handleMarkSeen = async (taskId) => {
        await markTaskSeen(taskId);
        setUnseenTasks(prev => prev.filter(t => t.id !== taskId));
    };

    return (
        <nav className="navbar-custom d-flex justify-content-between align-items-center px-4 py-2">
            <div className="d-flex align-items-center gap-4">
                <span className="fw-bold fs-5 text-white">Task Manager</span>
                <div className="d-flex gap-3">
                    {tabs.map(tab => (
                        <Link
                            key={tab.path}
                            to={tab.path}
                            className={`nav-tab-link ${location.pathname === tab.path ? 'active' : ''}`}
                        >
                            {tab.label}
                        </Link>
                    ))}
                </div>
            </div>

            <div className="d-flex align-items-center gap-2">
                {role === 'EMPLOYEE' && unseenTasks.length > 0 && (
                    <div className="dropdown">
        <span className="badge bg-danger rounded-pill" style={{ cursor: 'pointer' }} data-bs-toggle="dropdown">
            {unseenTasks.length} new task{unseenTasks.length > 1 ? 's' : ''}
        </span>
                        <ul className="dropdown-menu dropdown-menu-end p-2" style={{ minWidth: '280px' }}>
                            {unseenTasks.map(t => (
                                <li key={t.id} className="d-flex justify-content-between align-items-center mb-2 px-2">
                                    <div className="small">
                                        <strong>{t.assignedByManagerName || 'Manager'}</strong> assigned you: {t.title}
                                    </div>
                                    <button className="btn btn-sm btn-outline-success ms-2"
                                            onClick={() => handleMarkSeen(t.id)}>
                                        Done
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                <button className="btn profile-btn" data-bs-toggle="modal" data-bs-target="#profileModal">
                    {name || 'Profile'}
                </button>
                <button className="btn logout-btn" onClick={onLogout}>Logout</button>
            </div>

            <ProfileModal />
        </nav>
    );
}

export default Navbar;