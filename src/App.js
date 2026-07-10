import React, { useState } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [showRegister, setShowRegister] = useState(false);

  const handleLogin = () => setIsLoggedIn(true);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  const handleRegisterSuccess = () => setShowRegister(false);

  if (isLoggedIn) {
    return <Dashboard onLogout={handleLogout} />;
  }

  return showRegister
      ? <Register onRegister={handleRegisterSuccess} goToLogin={() => setShowRegister(false)} />
      : <Login onLogin={handleLogin} goToRegister={() => setShowRegister(true)} />;
}

export default App;