import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { Briefcase, Calendar, Clock, MoreHorizontal, MapPin } from 'lucide-react';
import api from '../api/axios';
import { useWebSocket } from '../context/WebSocketContext';

const MyApplications = () => {
    const { latestNotification } = useWebSocket();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            const res = await api.get('/applications/my');
            // Adding mock data if no real data is returned for demonstration of Kanban
            if (res.data.length === 0) {
                setApplications([
                    { id: 101, job: { title: 'Frontend Developer', company: 'Google', location: 'Remote' }, status: 'APPLIED', appliedDate: new Date() },
                    { id: 102, job: { title: 'Backend Engineer', company: 'Amazon', location: 'Seattle' }, status: 'INTERVIEW', appliedDate: new Date(Date.now() - 86400000 * 2) },
                    { id: 103, job: { title: 'Data Scientist', company: 'Meta', location: 'Menlo Park' }, status: 'REJECTED', appliedDate: new Date(Date.now() - 86400000 * 10) },
                    { id: 104, job: { title: 'Full Stack Dev', company: 'Netflix', location: 'Remote' }, status: 'HIRED', appliedDate: new Date(Date.now() - 86400000 * 5) }
                ]);
            } else {
                setApplications(res.data);
            }
        } catch (err) {
            console.error("Failed to fetch applications", err);
        } finally {
            setLoading(false);
        }
    };

    // 🚀 REAL-TIME WEB SOCKET LISTENER
    useEffect(() => {
        if (latestNotification && latestNotification.type === 'APPLICATION_STATUS_UPDATED') {
            console.log("MyApplications Processing WS Event:", latestNotification);

            const updatedApp = latestNotification.payload;
            if (updatedApp) {
                setApplications(prev => prev.map(app =>
                    app.id === updatedApp.id ? { ...app, status: updatedApp.status } : app
                ));
            }
        }
    }, [latestNotification]);

    // Grouping logic for Kanban
    const columns = [
        { id: 'APPLIED', title: 'Applied', color: 'var(--info-color)', bg: 'rgba(59, 130, 246, 0.1)', statuses: ['APPLIED', 'NEW', 'PENDING'] },
        { id: 'INTERVIEW', title: 'Interviewing', color: 'var(--warning-color)', bg: 'rgba(245, 158, 11, 0.1)', statuses: ['INTERVIEW', 'SHORTLISTED'] },
        { id: 'OFFER', title: 'Offers', color: 'var(--success-color)', bg: 'rgba(16, 185, 129, 0.1)', statuses: ['HIRED', 'OFFER', 'ACCEPTED'] },
        { id: 'REJECTED', title: 'Rejected', color: 'var(--danger-color)', bg: 'rgba(239, 68, 68, 0.1)', statuses: ['REJECTED'] },
    ];

    const getColumnApplications = (columnStatuses) => {
        return applications.filter(app => {
            const status = (app.status || 'APPLIED').toUpperCase();
            // Map unknown statuses to APPLIED
            return columnStatuses.includes(status) || (columnStatuses.includes('APPLIED') && !columns.some(c => c.statuses.includes(status) && c.id !== 'APPLIED'));
        });
    };

    return (
        <div className="app-container">
            <Sidebar />
            <div className="main-content">
                <Navbar title="My Applications" />

                <div style={{ padding: '2rem 2.5rem', height: 'calc(100vh - 75px)', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                        <div>
                            <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-dark)' }}>Application Tracking</h2>
                            <p style={{ margin: '0.5rem 0 0 0', color: 'var(--text-muted)' }}>Manage your job applications in a Kanban board.</p>
                        </div>
                    </div>

                    {loading ? (
                        <div style={{ display: 'flex', gap: '1.5rem', overflowX: 'auto', flex: 1, paddingBottom: '1rem' }}>
                            {[1, 2, 3, 4].map(n => (
                                <div key={n} style={{ flex: '0 0 320px', background: 'var(--bg-main)', borderRadius: 'var(--border-radius-lg)', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ padding: '1.25rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between' }}>
                                        <div style={{ height: '20px', width: '100px', background: 'var(--bg-card)', borderRadius: '4px', animation: 'pulse 1.5s infinite' }}></div>
                                        <div style={{ height: '20px', width: '20px', background: 'var(--bg-card)', borderRadius: '4px', animation: 'pulse 1.5s infinite' }}></div>
                                    </div>
                                    <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                        {[1, 2].map(m => (
                                            <div key={m} style={{ background: 'var(--bg-card)', padding: '1.25rem', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--border-color)' }}>
                                                <div style={{ height: '16px', width: '150px', background: 'var(--bg-main)', borderRadius: '4px', marginBottom: '1rem', animation: 'pulse 1.5s infinite' }}></div>
                                                <div style={{ height: '12px', width: '100px', background: 'var(--bg-main)', borderRadius: '4px', marginBottom: '0.5rem', animation: 'pulse 1.5s infinite' }}></div>
                                                <div style={{ height: '12px', width: '120px', background: 'var(--bg-main)', borderRadius: '4px', animation: 'pulse 1.5s infinite' }}></div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : applications.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)', background: 'var(--bg-card)', borderRadius: 'var(--border-radius-lg)', border: '1px dashed var(--border-color)' }}>
                            <Briefcase size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
                            <p style={{ fontSize: '1.125rem' }}>You haven't applied to any jobs yet.</p>
                            <button className="btn btn-primary mt-4" onClick={() => window.location.href = '/candidate'}>Browse Jobs</button>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', gap: '1.5rem', overflowX: 'auto', flex: 1, paddingBottom: '1rem' }}>
                            {columns.map(column => {
                                const columnApps = getColumnApplications(column.statuses);
                                return (
                                    <div key={column.id} style={{
                                        flex: '0 0 320px',
                                        background: 'var(--bg-main)',
                                        borderRadius: 'var(--border-radius-lg)',
                                        border: '1px solid var(--border-color)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        maxHeight: '100%'
                                    }}>
                                        {/* Column Header */}
                                        <div style={{ padding: '1.25rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-card)', borderTopLeftRadius: 'var(--border-radius-lg)', borderTopRightRadius: 'var(--border-radius-lg)' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: column.color }}></div>
                                                <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: '600', color: 'var(--text-dark)' }}>{column.title}</h3>
                                            </div>
                                            <span style={{ background: column.bg, color: column.color, padding: '0.1rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '700' }}>
                                                {columnApps.length}
                                            </span>
                                        </div>

                                        {/* Column Body - Cards */}
                                        <div style={{ padding: '1rem', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                            {columnApps.map(app => (
                                                <div key={app.id} style={{
                                                    background: 'var(--bg-card)',
                                                    padding: '1.25rem',
                                                    borderRadius: 'var(--border-radius-md)',
                                                    border: '1px solid var(--border-color)',
                                                    boxShadow: 'var(--shadow-sm)',
                                                    cursor: 'grab',
                                                    transition: 'all 0.2s ease',
                                                    position: 'relative'
                                                }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                                        e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                                                        e.currentTarget.style.borderColor = column.color;
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.transform = 'translateY(0)';
                                                        e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                                                        e.currentTarget.style.borderColor = 'var(--border-color)';
                                                    }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                                                        <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: '600', color: 'var(--text-dark)' }}>{app.job?.title || 'Unknown Role'}</h4>
                                                        <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 0 }}>
                                                            <MoreHorizontal size={16} />
                                                        </button>
                                                    </div>

                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--primary-color)', fontSize: '0.875rem', fontWeight: '500' }}>
                                                        <Briefcase size={14} /> {app.job?.company || 'Company'}
                                                    </div>

                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                                                        <MapPin size={12} /> {app.job?.location || 'Location Not Specified'}
                                                    </div>

                                                    <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                            <Clock size={12} /> {app.appliedDate ? new Date(app.appliedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Recent'}
                                                        </span>
                                                        <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: column.bg, color: column.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 'bold' }}>
                                                            {app.job?.company ? app.job.company.charAt(0) : 'C'}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            {columnApps.length === 0 && (
                                                <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.875rem', border: '2px dashed var(--border-color)', borderRadius: 'var(--border-radius-md)' }}>
                                                    No applications here
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyApplications;
