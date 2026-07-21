import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import ProfileModal from './ProfileModal';
import { useState, useEffect } from 'react';
import { getMyTasks, markTasksSeen } from '../services/api';

function Navbar({ tabs, onLogout }) {
    const location = useLocation();
    const name = localStorage.getItem('name');
    const role = localStorage.getItem('role');
    const [unseenCount, setUnseenCount] = useState(0);

    useEffect(() => {
        if (role === 'EMPLOYEE') {
            loadUnseenCount();
        }
    }, []);

    const loadUnseenCount = async () => {
        const res = await getMyTasks();
        const count = res.data.filter(t => !t.seenByAssignee).length;
        setUnseenCount(count);
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
                {role === 'EMPLOYEE' && unseenCount > 0 && (
                    <span className="badge bg-danger rounded-pill" style={{ cursor: 'pointer' }}
                          onClick={async () => {
                              await markTasksSeen();
                              setUnseenCount(0);
                          }}>
        {unseenCount} new task{unseenCount > 1 ? 's' : ''}
    </span>
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