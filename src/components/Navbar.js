import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import ProfileModal from './ProfileModal';

function Navbar({ tabs, onLogout }) {
    const location = useLocation();
    const name = localStorage.getItem('name');

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