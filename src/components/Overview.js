import React, { useState, useEffect } from 'react';
import { getTasks, getMyTasks, getProjects } from '../services/api';

function Overview({ role }) {
    const [stats, setStats] = useState({ total: 0, done: 0, inProgress: 0, todo: 0, projects: 0 });

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        const tasksRes = role === 'MANAGER' ? await getTasks() : await getMyTasks();
        const tasks = tasksRes.data;

        let done = 0, inProgress = 0, todo = 0;
        tasks.forEach(t => {
            if (t.status === 'DONE') done++;
            else if (t.status === 'IN_PROGRESS') inProgress++;
            else todo++;
        });

        let projectCount = 0;
        if (role === 'MANAGER') {
            const projectsRes = await getProjects();
            projectCount = projectsRes.data.length;
        }

        setStats({ total: tasks.length, done, inProgress, todo, projects: projectCount });
    };

    const cardStyle = { borderLeft: '5px solid var(--color-red)' };

    return (
        <div>
            <h3 className="mb-4">Overview</h3>
            <div className="row g-3">
                {role === 'MANAGER' && (
                    <div className="col-md-3">
                        <div className="card p-3 shadow-sm" style={cardStyle}>
                            <div className="text-muted small">Total Projects</div>
                            <div className="fs-3 fw-bold">{stats.projects}</div>
                        </div>
                    </div>
                )}
                <div className="col-md-3">
                    <div className="card p-3 shadow-sm" style={cardStyle}>
                        <div className="text-muted small">Total Tasks</div>
                        <div className="fs-3 fw-bold">{stats.total}</div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card p-3 shadow-sm" style={cardStyle}>
                        <div className="text-muted small">Completed</div>
                        <div className="fs-3 fw-bold">{stats.done}</div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card p-3 shadow-sm" style={cardStyle}>
                        <div className="text-muted small">In Progress</div>
                        <div className="fs-3 fw-bold">{stats.inProgress}</div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card p-3 shadow-sm" style={cardStyle}>
                        <div className="text-muted small">To Do</div>
                        <div className="fs-3 fw-bold">{stats.todo}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Overview;