import React, { useState } from 'react';
import { register } from '../services/api';

function Register({ onRegister, goToLogin }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register({ name, email, password });
            onRegister();
        } catch (err) {
            setError('Registration failed. Email may already be in use.');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '100px auto', padding: '20px' }}>
            <h2>Task Manager - Register</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '10px' }}>
                    <input type="text" placeholder="Name" value={name}
                           onChange={(e) => setName(e.target.value)}
                           style={{ width: '100%', padding: '8px' }} />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <input type="email" placeholder="Email" value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           style={{ width: '100%', padding: '8px' }} />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <input type="password" placeholder="Password" value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           style={{ width: '100%', padding: '8px' }} />
                </div>
                <button type="submit" style={{ width: '100%', padding: '10px' }}>
                    Register
                </button>
            </form>
            <p style={{ marginTop: '10px' }}>
                Already have an account?{' '}
                <span style={{ color: 'blue', cursor: 'pointer' }} onClick={goToLogin}>
                    Login
                </span>
            </p>
        </div>
    );
}

export default Register;