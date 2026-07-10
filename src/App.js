import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ManagerDashboard from './pages/ManagerDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import './App.css';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
    const [role, setRole] = useState(localStorage.getItem('role'));

    const handleLogin = (userRole) => {
        setIsLoggedIn(true);
        setRole(userRole);
    };

    const handleLogout = () => {
        localStorage.clear();
        setIsLoggedIn(false);
        setRole(null);
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/login"
                    element={isLoggedIn ? <Navigate to="/" /> : <Login onLogin={handleLogin} />}
                />
                <Route
                    path="/register"
                    element={isLoggedIn ? <Navigate to="/" /> : <Register />}
                />
                <Route
                    path="/*"
                    element={
                        !isLoggedIn ? (
                            <Navigate to="/login" />
                        ) : role === 'MANAGER' ? (
                            <ManagerDashboard onLogout={handleLogout} />
                        ) : (
                            <EmployeeDashboard onLogout={handleLogout} />
                        )
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;