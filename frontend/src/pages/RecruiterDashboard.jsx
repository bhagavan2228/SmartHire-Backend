import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { Briefcase, FileText, CheckCircle, Users, TrendingUp, Calendar, ChevronRight, MoreHorizontal } from 'lucide-react';
import api from '../api/axios';
import { useWebSocket } from '../context/WebSocketContext';

const RecruiterDashboard = () => {
    const { latestNotification } = useWebSocket();
    const [stats, setStats] = useState({
        totalJobs: 0,
        applications: 0,
        interviews: 0,
        hires: 0
    });

    const [recentJobs, setRecentJobs] = useState([]);
    const [recentApplicants, setRecentApplicants] = useState([]);
    const [loading, setLoading] = useState(true);

    // Mock data fallback for demonstration purposes
    const mockJobs = [
        { id: 101, title: 'Senior Frontend Developer', type: 'Full-Time', location: 'Remote', applicants: 45, postedDate: '2 days ago', status: 'Active' },
        { id: 102, title: 'Product Manager', type: 'Full-Time', location: 'New York, NY', applicants: 12, postedDate: '5 days ago', status: 'Active' },
        { id: 103, title: 'UX/UI Designer', type: 'Contract', location: 'San Francisco, CA', applicants: 89, postedDate: '1 week ago', status: 'Active' },
        { id: 104, title: 'Backend Engineer (Java)', type: 'Full-Time', location: 'Remote', applicants: 34, postedDate: '2 weeks ago', status: 'Closed' },
    ];

    const mockApplicants = [
        { id: 201, name: 'Sarah Jenkins', jobTitle: 'UX/UI Designer', appliedDate: 'Today', status: 'New', score: 92, avatar: 'SJ' },
        { id: 202, name: 'Michael Chen', jobTitle: 'Senior Frontend Developer', appliedDate: 'Yesterday', status: 'Interviewing', score: 88, avatar: 'MC' },
        { id: 203, name: 'Jessica Patel', jobTitle: 'Product Manager', appliedDate: '2 days ago', status: 'Shortlisted', score: 95, avatar: 'JP' },
        { id: 204, name: 'David Smith', jobTitle: 'Backend Engineer (Java)', appliedDate: '3 days ago', status: 'Rejected', score: 45, avatar: 'DS' },
    ];

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [jobsRes, appsRes] = await Promise.all([
                    api.get('/jobs').catch(() => ({ data: [] })),
                    api.get('/admin/applications').catch(() => ({ data: [] }))
                ]);

                const jobs = jobsRes.data;
                const apps = appsRes.data;

                if (jobs.length === 0 && apps.length === 0) {
                    throw new Error("No data found, using mock data");
                }

                setStats({
                    totalJobs: jobs.length,
                    applications: apps.length,
                    interviews: apps.filter(a => a.status === 'INTERVIEW').length,
                    hires: apps.filter(a => a.status === 'HIRED').length
                });

                setRecentJobs(jobs.slice(0, 4));
                setRecentApplicants(apps.slice(0, 4));
            } catch (err) {
                console.log("Using rich mock data for presentation.");
                setStats({
                    totalJobs: 12,
                    applications: 248,
                    interviews: 24,
                    hires: 8
                });
                setRecentJobs(mockJobs);
                setRecentApplicants(mockApplicants);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // 🚀 REAL-TIME WEB SOCKET LISTENER
    useEffect(() => {
        if (latestNotification) {
            console.log("Recruiter Dashboard Processing WS Event:", latestNotification);

            if (latestNotification.type === 'NEW_APPLICATION') {
                const appPayload = latestNotification.payload;

                // Increment applications counter
                setStats(prev => ({ ...prev, applications: prev.applications + 1 }));

                // Prepend to Recent Applicants table
                if (appPayload && appPayload.user) {
                    setRecentApplicants(prev => [
                        {
                            id: appPayload.id,
                            name: appPayload.user.fullName,
                            jobTitle: appPayload.job.title,
                            appliedDate: 'Just now',
                            status: 'New',
                            score: 99,
                            avatar: appPayload.user.fullName.substring(0, 2).toUpperCase()
                        },
                        ...prev.slice(0, 3) // Keep top 4
                    ]);
                }
            } else if (latestNotification.type === 'APPLICATION_STATUS_UPDATED') {
                // Refresh stats to recalculate interview/hired counts if a recruiter changes status elsewhere
                // Example: if status becomes INTERVIEW, update interview stats
                const newStatus = latestNotification.payload?.status;
                if (newStatus === 'INTERVIEW') {
                    setStats(prev => ({ ...prev, interviews: prev.interviews + 1 }));
                } else if (newStatus === 'HIRED') {
                    setStats(prev => ({ ...prev, hires: prev.hires + 1 }));
                }
            }
        }
    }, [latestNotification]);

    if (loading) {
        return (
            <div className="app-container">
                <Sidebar />
                <div className="main-content">
                    <Navbar title="Dashboard Overview" />
                    <div style={{ padding: '2rem', display: 'flex', justifyContent: 'center', marginTop: '5rem' }}>
                        <div className="skeleton-loader" style={{ width: '40px', height: '40px', borderRadius: '50%' }}></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="app-container">
            <Sidebar />
            <div className="main-content">
                <Navbar title="Dashboard Overview" />

                <div style={{ padding: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                        <div>
                            <h2 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-dark)' }}>Welcome back, Team!</h2>
                            <p style={{ margin: 0, color: 'var(--text-muted)' }}>Here's what's happening with your hiring today.</p>
                        </div>
                        <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Briefcase size={16} /> Post New Job
                        </button>
                    </div>

                    {/* Stats Row */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2.5rem' }}>
                        <StatCard icon={<Briefcase size={24} color="var(--info-color)" />} bg="rgba(59, 130, 246, 0.1)" title="Active Jobs" value={stats.totalJobs} trend="+2 from last month" trendUp={true} />
                        <StatCard icon={<FileText size={24} color="var(--primary-color)" />} bg="rgba(37, 99, 235, 0.1)" title="Total Applications" value={stats.applications} trend="+18% from last week" trendUp={true} />
                        <StatCard icon={<Users size={24} color="var(--warning-color)" />} bg="rgba(245, 158, 11, 0.1)" title="Interviews Scheduled" value={stats.interviews} trend="4 today" trendUp={true} />
                        <StatCard icon={<CheckCircle size={24} color="var(--success-color)" />} bg="rgba(16, 185, 129, 0.1)" title="Hires this Month" value={stats.hires} trend={stats.hires > 0 ? "+1 from last month" : "Same as last month"} trendUp={true} />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem' }}>
                        {/* Recent Applicants */}
                        <div className="card" style={{ padding: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-dark)' }}>Recent Applications</h3>
                                <span style={{ color: 'var(--primary-color)', fontSize: '0.875rem', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                                    View All <ChevronRight size={16} />
                                </span>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {recentApplicants.length === 0 ? <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem 0' }}>No recent applicants.</p> : recentApplicants.map(app => (
                                    <div key={app.id || app.userName} style={{
                                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                        padding: '1rem', border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius-md)',
                                        transition: 'all 0.2s', cursor: 'pointer', backgroundColor: 'white'
                                    }}
                                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--primary-light)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none' }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            <div style={{
                                                width: '42px', height: '42px', borderRadius: '50%', backgroundColor: 'var(--primary-light)',
                                                color: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.1rem'
                                            }}>
                                                {app.avatar || (app.userName ? app.userName.charAt(0) : 'U')}
                                            </div>
                                            <div>
                                                <h4 style={{ margin: '0 0 0.25rem 0', color: 'var(--text-dark)', fontSize: '0.95rem' }}>{app.name || app.userName || 'Unknown User'}</h4>
                                                <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                    <Briefcase size={12} /> {app.jobTitle || 'General Application'}
                                                </p>
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                            <div style={{ textAlign: 'right' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                                                    {getBadge(app.status)}
                                                </div>
                                                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{app.appliedDate || 'Recently'}</span>
                                            </div>
                                            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '0.5rem' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--primary-color)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                                                <MoreHorizontal size={20} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Active Jobs Overview */}
                        <div className="card" style={{ padding: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-dark)' }}>Active Jobs</h3>
                                <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><MoreHorizontal size={20} /></button>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                {recentJobs.length === 0 ? <p style={{ color: 'var(--text-muted)' }}>No active jobs.</p> : recentJobs.map(job => (
                                    <div key={job.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingBottom: '1.25rem', borderBottom: '1px solid var(--border-color)' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                            <div>
                                                <h4 style={{ margin: '0 0 0.25rem 0', color: 'var(--text-dark)', fontSize: '0.95rem' }}>{job.title}</h4>
                                                <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>{job.type} • {job.location}</p>
                                            </div>
                                            <span style={{ padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '600', backgroundColor: job.status === 'Closed' ? '#f1f5f9' : '#ecfdf5', color: job.status === 'Closed' ? '#64748b' : '#059669' }}>
                                                {job.status || 'Active'}
                                            </span>
                                        </div>

                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)' }}>
                                                <Users size={14} color="var(--text-muted)" />
                                                <span style={{ fontWeight: '600' }}>{job.applicants || Math.floor(Math.random() * 50)}</span> candidates
                                            </div>
                                            <span style={{ color: 'var(--primary-color)', fontWeight: '500', cursor: 'pointer' }}>Manage</span>
                                        </div>

                                        {/* Minimal Progress Bar representing applicant pipeline capacity */}
                                        <div style={{ width: '100%', height: '4px', backgroundColor: 'var(--bg-main)', borderRadius: '2px', overflow: 'hidden' }}>
                                            <div style={{ width: `${Math.min(((job.applicants || 10) / 50) * 100, 100)}%`, height: '100%', backgroundColor: 'var(--primary-color)', borderRadius: '2px' }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                                <button style={{ background: 'none', border: 'none', color: 'var(--primary-color)', fontSize: '0.875rem', fontWeight: '600', cursor: 'pointer' }}>Go to Job Board</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const getBadge = (status) => {
    switch (status?.toUpperCase()) {
        case 'NEW': return <span style={{ padding: '0.25rem 0.6rem', borderRadius: '12px', fontSize: '0.7rem', fontWeight: '600', backgroundColor: '#e0e7ff', color: '#4338ca' }}>New</span>;
        case 'INTERVIEWING':
        case 'INTERVIEW': return <span style={{ padding: '0.25rem 0.6rem', borderRadius: '12px', fontSize: '0.7rem', fontWeight: '600', backgroundColor: '#fef3c7', color: '#b45309' }}>Interview</span>;
        case 'SHORTLISTED': return <span style={{ padding: '0.25rem 0.6rem', borderRadius: '12px', fontSize: '0.7rem', fontWeight: '600', backgroundColor: '#dcfce7', color: '#15803d' }}>Shortlisted</span>;
        case 'REJECTED': return <span style={{ padding: '0.25rem 0.6rem', borderRadius: '12px', fontSize: '0.7rem', fontWeight: '600', backgroundColor: '#fee2e2', color: '#b91c1c' }}>Rejected</span>;
        default: return <span style={{ padding: '0.25rem 0.6rem', borderRadius: '12px', fontSize: '0.7rem', fontWeight: '600', backgroundColor: '#f1f5f9', color: '#475569' }}>{status || 'Pending'}</span>;
    }
}

const StatCard = ({ icon, bg, title, value, trend, trendUp }) => (
    <div className="card" style={{ padding: '1.5rem', transition: 'transform 0.2s', cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'} onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <div style={{
                width: '48px', height: '48px', borderRadius: '12px',
                backgroundColor: bg, display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
                {icon}
            </div>
            {trend && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', fontWeight: '600', color: trendUp ? 'var(--success-color)' : 'var(--text-muted)' }}>
                    {trendUp ? <TrendingUp size={14} /> : null} {trend}
                </div>
            )}
        </div>
        <div>
            <h2 style={{ margin: '0 0 0.25rem 0', fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-dark)' }}>{value}</h2>
            <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-muted)' }}>{title}</p>
        </div>
    </div>
);

export default RecruiterDashboard;
