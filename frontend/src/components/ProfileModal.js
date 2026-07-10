import React, { useState, useEffect } from 'react';
import { getMyProfile, updateMyProfile } from '../services/api';

function ProfileModal() {
    const [profile, setProfile] = useState(null);
    const [editing, setEditing] = useState(false);
    const [form, setForm] = useState({ name: '', department: '', employeeId: '', bio: '' });

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        const res = await getMyProfile();
        setProfile(res.data);
        setForm({
            name: res.data.name || '',
            department: res.data.department || '',
            employeeId: res.data.employeeId || '',
            bio: res.data.bio || ''
        });
    };

    const handleSave = async () => {
        await updateMyProfile(form);
        setEditing(false);
        loadProfile();
        localStorage.setItem('name', form.name);
    };

    if (!profile) return null;

    return (
        <div className="modal fade" id="profileModal" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Profile</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div className="modal-body">
                        {!editing ? (
                            <div>
                                <p><strong>Name:</strong> {profile.name}</p>
                                <p><strong>Email:</strong> {profile.email}</p>
                                <p><strong>Role:</strong> <span className="badge role-badge">{profile.role}</span></p>
                                <p><strong>Department:</strong> {profile.department || '—'}</p>
                                <p><strong>Employee ID:</strong> {profile.employeeId || '—'}</p>
                                <p><strong>Bio:</strong> {profile.bio || '—'}</p>
                                <button className="btn btn-primary btn-sm" onClick={() => setEditing(true)}>Edit Profile</button>
                            </div>
                        ) : (
                            <div>
                                <div className="mb-2">
                                    <label className="form-label small">Name</label>
                                    <input className="form-control" value={form.name}
                                           onChange={(e) => setForm({ ...form, name: e.target.value })} />
                                </div>
                                <div className="mb-2">
                                    <label className="form-label small">Department</label>
                                    <input className="form-control" value={form.department}
                                           onChange={(e) => setForm({ ...form, department: e.target.value })} />
                                </div>
                                <div className="mb-2">
                                    <label className="form-label small">Employee ID</label>
                                    <input className="form-control" value={form.employeeId}
                                           onChange={(e) => setForm({ ...form, employeeId: e.target.value })} />
                                </div>
                                <div className="mb-2">
                                    <label className="form-label small">Bio</label>
                                    <textarea className="form-control" rows="2" value={form.bio}
                                              onChange={(e) => setForm({ ...form, bio: e.target.value })} />
                                </div>
                                <div className="d-flex gap-2">
                                    <button className="btn btn-success btn-sm" onClick={handleSave}>Save</button>
                                    <button className="btn btn-secondary btn-sm" onClick={() => setEditing(false)}>Cancel</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileModal;