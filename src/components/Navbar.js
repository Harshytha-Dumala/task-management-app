import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar({ tabs, onLogout }) {
    const location = useLocation();
    const name = localStorage.getItem('name');
    const email = localStorage.getItem('email');
    const role = localStorage.getItem('role');

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

            <div className="dropdown">
                <button className="btn profile-btn dropdown-toggle" type="button" data-bs-toggle="dropdown">
                    {name || 'Profile'}
                </button>
                <ul className="dropdown-menu dropdown-menu-end p-3" style={{ minWidth: '220px' }}>
                    <li className="mb-1"><strong>{name}</strong></li>
                    <li className="mb-1 text-muted small">{email}</li>
                    <li className="mb-2">
                        <span className="badge role-badge">{role}</span>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                        <button className="btn btn-sm w-100 logout-btn" onClick={onLogout}>Logout</button>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;