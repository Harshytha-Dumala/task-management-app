import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Overview from '../components/Overview';
import ProjectsList from '../components/ProjectsList';
import ProjectDetail from '../components/ProjectDetail';

function ManagerDashboard({ onLogout }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout();
        navigate('/login');
    };

    const tabs = [
        { path: '/', label: 'Overview' },
        { path: '/projects', label: 'Projects' },
    ];

    return (
        <div>
            <Navbar tabs={tabs} onLogout={handleLogout} />
            <div className="p-4">
                <Routes>
                    <Route path="/" element={<Overview role="MANAGER" />} />
                    <Route path="/projects" element={<ProjectsList />} />
                    <Route path="/projects/:id" element={<ProjectDetail />} />
                </Routes>
            </div>
        </div>
    );
}

export default ManagerDashboard;