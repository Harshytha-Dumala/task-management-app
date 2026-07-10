import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProjects, createProject } from '../services/api';

function ProjectsList() {
    const [projects, setProjects] = useState([]);
    const [newProject, setNewProject] = useState({ name: '', description: '' });
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        loadProjects();
    }, []);

    const loadProjects = async () => {
        const res = await getProjects();
        setProjects(res.data);
    };

    const handleCreateProject = async (e) => {
        e.preventDefault();
        await createProject(newProject);
        setNewProject({ name: '', description: '' });
        setShowForm(false);
        loadProjects();
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3>Projects</h3>
                <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
                    {showForm ? 'Cancel' : '+ New Project'}
                </button>
            </div>

            {showForm && (
                <div className="card p-3 mb-4 shadow-sm">
                    <form onSubmit={handleCreateProject} className="row g-2">
                        <div className="col-md-4">
                            <input className="form-control" placeholder="Project Name" value={newProject.name}
                                   onChange={(e) => setNewProject({ ...newProject, name: e.target.value })} required />
                        </div>
                        <div className="col-md-6">
                            <input className="form-control" placeholder="Description" value={newProject.description}
                                   onChange={(e) => setNewProject({ ...newProject, description: e.target.value })} />
                        </div>
                        <div className="col-md-2">
                            <button type="submit" className="btn btn-success w-100">Create</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="row">
                {projects.map(p => (
                    <div className="col-md-4 mb-3" key={p.id}>
                        <Link to={`/projects/${p.id}`} className="text-decoration-none text-dark">
                            <div className="card p-3 shadow-sm h-100">
                                <strong>{p.name}</strong>
                                <div className="text-muted small mt-1">{p.description}</div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProjectsList;