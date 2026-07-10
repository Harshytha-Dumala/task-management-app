import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/api';

function Register() {
    const [form, setForm] = useState({
        name: '', email: '', password: '', role: 'EMPLOYEE',
        department: '', employeeId: '', bio: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (field, value) => setForm({ ...form, [field]: value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(form);
            navigate('/login');
        } catch (err) {
            setError('Registration failed. Email may already be in use.');
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center py-5 bg-light" style={{ minHeight: '100vh' }}>
            <div className="card p-4 shadow" style={{ width: '450px' }}>
                <h3 className="text-center mb-3">Task Manager - Register</h3>
                {error && <div className="alert alert-danger py-2">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input type="text" className="form-control" placeholder="Name"
                               value={form.name} onChange={(e) => handleChange('name', e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <input type="email" className="form-control" placeholder="Email"
                               value={form.email} onChange={(e) => handleChange('email', e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <input type="password" className="form-control" placeholder="Password"
                               value={form.password} onChange={(e) => handleChange('password', e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Role</label>
                        <select className="form-select" value={form.role} onChange={(e) => handleChange('role', e.target.value)}>
                            <option value="EMPLOYEE">Employee</option>
                            <option value="MANAGER">Manager</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <input type="text" className="form-control" placeholder="Department (optional)"
                               value={form.department} onChange={(e) => handleChange('department', e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <input type="text" className="form-control" placeholder="Employee ID (optional)"
                               value={form.employeeId} onChange={(e) => handleChange('employeeId', e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <textarea className="form-control" placeholder="Short bio (optional)" rows="2"
                                  value={form.bio} onChange={(e) => handleChange('bio', e.target.value)} />
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