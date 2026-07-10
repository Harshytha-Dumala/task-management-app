import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/api';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('EMPLOYEE');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register({ name, email, password, role });
            navigate('/login');
        } catch (err) {
            setError('Registration failed. Email may already be in use.');
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card p-4 shadow" style={{ width: '400px' }}>
                <h3 className="text-center mb-3">Task Manager - Register</h3>
                {error && <div className="alert alert-danger py-2">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input type="text" className="form-control" placeholder="Name"
                               value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <input type="email" className="form-control" placeholder="Email"
                               value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <input type="password" className="form-control" placeholder="Password"
                               value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Role</label>
                        <select className="form-select" value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value="EMPLOYEE">Employee</option>
                            <option value="MANAGER">Manager</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Register</button>
                </form>
                <p className="text-center mt-3 mb-0">
                    Already have an account?{' '}
                    <span className="text-primary" style={{ cursor: 'pointer' }} onClick={() => navigate('/login')}>
                        Login
                    </span>
                </p>
            </div>
        </div>
    );
}

export default Register;