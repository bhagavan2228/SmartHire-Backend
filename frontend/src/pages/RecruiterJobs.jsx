import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { Search, Filter, MoreVertical, Briefcase, Users, Eye, Edit3, Trash2, Copy, PauseCircle, PlayCircle, PlusCircle, CheckCircle, TrendingUp, MapPin } from 'lucide-react';
import api from '../api/axios';

const RecruiterJobs = () => {
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('ALL');

    const mockJobs = [
        { id: 101, title: 'Senior Frontend Developer', type: 'Full-Time', location: 'Remote', applicants: 45, views: 1250, postedDate: '2023-10-15', status: 'Active' },
        { id: 102, title: 'Product Manager', type: 'Full-Time', location: 'New York, NY', applicants: 12, views: 540, postedDate: '2023-10-18', status: 'Active' },
        { id: 103, title: 'UX/UI Designer', type: 'Contract', location: 'San Francisco, CA', applicants: 89, views: 2100, postedDate: '2023-10-10', status: 'Active' },
        { id: 104, title: 'Backend Engineer (Java)', type: 'Full-Time', location: 'Remote', applicants: 34, views: 980, postedDate: '2023-09-25', status: 'Closed' },
        { id: 105, title: 'DevOps Specialist', type: 'Hybrid', location: 'Austin, TX', applicants: 8, views: 320, postedDate: '2023-10-22', status: 'Paused' },
    ];

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        setLoading(true);
        try {
            const res = await api.get('/jobs');
            if (res.data && res.data.length > 0) {
                // Enhance real data with mock performance metrics for demonstration
                const enhancedJobs = res.data.map(job => ({
                    ...job,
                    applicants: job.applicants || Math.floor(Math.random() * 50) + 5,
                    views: job.views || Math.floor(Math.random() * 1500) + 100,
                    status: job.status || 'Active'
                }));
                setJobs(enhancedJobs);
            } else {
                throw new Error("No data");
            }
        } catch (err) {
            console.log("Using mock job data");
            setJobs(mockJobs);
        } finally {
            setLoading(false);
        }
    };

    const toggleStatus = (id, currentStatus) => {
        let newStatus = 'Active';
        if (currentStatus === 'Active') newStatus = 'Paused';
        else if (currentStatus === 'Paused') newStatus = 'Active';
        else return; // Don't toggle closed jobs easily

        setJobs(jobs.map(job => job.id === id ? { ...job, status: newStatus } : job));
        // In real app: api.put(`/jobs/${id}`, { status: newStatus })
    };

    const duplicateJob = (job) => {
        const newJob = { ...job, id: Date.now(), title: `${job.title} (Copy)`, applicants: 0, views: 0, status: 'Paused', postedDate: new Date().toISOString().split('T')[0] };
        setJobs([newJob, ...jobs]);
        alert("Job duplicated as a paused draft.");
    };

    const filteredJobs = jobs.filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'ALL' || job.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="app-container">
            <Sidebar />
            <div className="main-content">
                <Navbar title="Manage Jobs" />

                <div style={{ padding: '2rem' }}>

                    {/* Header Controls */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                        <div>
                            <h2 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-dark)' }}>Active Jobs & Performance</h2>
                            <p style={{ margin: 0, color: 'var(--text-muted)' }}>Monitor your listings, view performance metrics, and manage applicant flow.</p>
                        </div>

                        <button onClick={() => navigate('/recruiter/post-job')} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <PlusCircle size={16} /> Post New Job
                        </button>
                    </div>

                    {/* Stats Summary */}
                    <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem' }}>
                        <div className="card" style={{ flex: 1, padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ padding: '0.75rem', backgroundColor: 'rgba(59, 130, 246, 0.1)', borderRadius: '12px', color: 'var(--info-color)' }}><Briefcase size={24} /></div>
                            <div>
                                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600' }}>Total Active</p>
                                <h3 style={{ margin: 0, fontSize: '1.5rem', color: 'var(--text-dark)' }}>{jobs.filter(j => j.status === 'Active').length}</h3>
                            </div>
                        </div>
                        <div className="card" style={{ flex: 1, padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ padding: '0.75rem', backgroundColor: 'rgba(16, 185, 129, 0.1)', borderRadius: '12px', color: 'var(--success-color)' }}><Eye size={24} /></div>
                            <div>
                                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600' }}>Total Views (30d)</p>
                                <h3 style={{ margin: 0, fontSize: '1.5rem', color: 'var(--text-dark)' }}>{jobs.reduce((acc, job) => acc + (job.views || 0), 0).toLocaleString()}</h3>
                            </div>
                        </div>
                        <div className="card" style={{ flex: 1, padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ padding: '0.75rem', backgroundColor: 'rgba(245, 158, 11, 0.1)', borderRadius: '12px', color: 'var(--warning-color)' }}><Users size={24} /></div>
                            <div>
                                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600' }}>Avg. Applicants</p>
                                <h3 style={{ margin: 0, fontSize: '1.5rem', color: 'var(--text-dark)' }}>{Math.round(jobs.reduce((acc, job) => acc + (job.applicants || 0), 0) / (jobs.length || 1))}</h3>
                            </div>
                        </div>
                    </div>

                    {/* Filters & Search */}
                    <div className="card" style={{ padding: '1.25rem', marginBottom: '1.5rem', display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                        <div style={{ flex: 1, minWidth: '300px', position: 'relative' }}>
                            <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                            <input
                                type="text"
                                placeholder="Search roles..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: '8px', border: '1px solid var(--border-color)', outline: 'none', transition: 'all 0.2s' }}
                                onFocus={(e) => { e.target.style.borderColor = 'var(--primary-color)'; e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)'; }}
                                onBlur={(e) => { e.target.style.borderColor = 'var(--border-color)'; e.target.style.boxShadow = 'none'; }}
                            />
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <Filter size={18} color="var(--text-muted)" />
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                style={{ padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid var(--border-color)', outline: 'none', backgroundColor: 'white', minWidth: '150px', cursor: 'pointer' }}
                            >
                                <option value="ALL">All Statuses</option>
                                <option value="Active">Active</option>
                                <option value="Paused">Paused</option>
                                <option value="Closed">Closed</option>
                            </select>
                        </div>
                    </div>

                    {/* Main Table */}
                    <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                <thead style={{ backgroundColor: 'var(--bg-main)', borderBottom: '1px solid var(--border-color)' }}>
                                    <tr>
                                        <th style={{ padding: '1rem 1.5rem', fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Job Role</th>
                                        <th style={{ padding: '1rem 1.5rem', fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Status</th>
                                        <th style={{ padding: '1rem 1.5rem', fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Performance</th>
                                        <th style={{ padding: '1rem 1.5rem', fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', textAlign: 'right' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <tr>
                                            <td colSpan="4" style={{ padding: '3rem', textAlign: 'center' }}>
                                                <div className="skeleton-loader" style={{ width: '40px', height: '40px', borderRadius: '50%', margin: '0 auto 1rem auto' }}></div>
                                                <p style={{ color: 'var(--text-muted)' }}>Loading jobs...</p>
                                            </td>
                                        </tr>
                                    ) : filteredJobs.length === 0 ? (
                                        <tr>
                                            <td colSpan="4" style={{ padding: '4rem', textAlign: 'center' }}>
                                                <Briefcase size={32} color="var(--text-muted)" style={{ margin: '0 auto 1rem auto', opacity: 0.5 }} />
                                                <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-dark)' }}>No jobs found</h3>
                                                <p style={{ margin: 0, color: 'var(--text-muted)' }}>Try adjusting your filters or post a new job.</p>
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredJobs.map(job => (
                                            <tr key={job.id} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background-color 0.2s' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--bg-main)'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                                                <td style={{ padding: '1.25rem 1.5rem' }}>
                                                    <div style={{ fontWeight: '600', color: 'var(--text-dark)', marginBottom: '0.35rem', fontSize: '1.05rem' }}>{job.title}</div>
                                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                        <MapPin size={12} /> {job.location} • <Briefcase size={12} /> {job.type} • Posted {job.postedDate}
                                                    </div>
                                                </td>
                                                <td style={{ padding: '1.25rem 1.5rem' }}>
                                                    <span style={{
                                                        padding: '0.35rem 0.75rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '600',
                                                        backgroundColor: job.status === 'Active' ? '#ecfdf5' : job.status === 'Paused' ? '#fffbeb' : '#f1f5f9',
                                                        color: job.status === 'Active' ? '#059669' : job.status === 'Paused' ? '#b45309' : '#64748b',
                                                        display: 'inline-flex', alignItems: 'center', gap: '0.35rem'
                                                    }}>
                                                        {job.status === 'Active' && <CheckCircle size={12} />}
                                                        {job.status === 'Paused' && <PauseCircle size={12} />}
                                                        {job.status}
                                                    </span>
                                                </td>
                                                <td style={{ padding: '1.25rem 1.5rem' }}>
                                                    <div style={{ display: 'flex', gap: '1.5rem' }}>
                                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                            <span style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-dark)' }}>{job.applicants}</span>
                                                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Applied</span>
                                                        </div>
                                                        <div style={{ width: '1px', backgroundColor: 'var(--border-color)' }}></div>
                                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                            <span style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-dark)' }}>{job.views?.toLocaleString() || '0'}</span>
                                                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Views</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td style={{ padding: '1.25rem 1.5rem', textAlign: 'right' }}>
                                                    <div style={{ display: 'flex', gap: '0.25rem', justifyContent: 'flex-end' }}>

                                                        <button
                                                            title="View Applications"
                                                            onClick={() => navigate('/recruiter/applicants')}
                                                            style={{ width: '32px', height: '32px', borderRadius: '6px', backgroundColor: 'transparent', color: 'var(--primary-color)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }}
                                                            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--primary-light)'}
                                                            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                                                        >
                                                            <Users size={18} />
                                                        </button>

                                                        {job.status !== 'Closed' && (
                                                            <button
                                                                title={job.status === 'Active' ? 'Pause Job' : 'Reactivate Job'}
                                                                onClick={() => toggleStatus(job.id, job.status)}
                                                                style={{ width: '32px', height: '32px', borderRadius: '6px', backgroundColor: 'transparent', color: job.status === 'Active' ? '#b45309' : '#059669', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }}
                                                                onMouseEnter={e => e.currentTarget.style.backgroundColor = job.status === 'Active' ? '#fef3c7' : '#dcfce7'}
                                                                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                                                            >
                                                                {job.status === 'Active' ? <PauseCircle size={18} /> : <PlayCircle size={18} />}
                                                            </button>
                                                        )}

                                                        <button
                                                            title="Duplicate Draft"
                                                            onClick={() => duplicateJob(job)}
                                                            style={{ width: '32px', height: '32px', borderRadius: '6px', backgroundColor: 'transparent', color: 'var(--text-main)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }}
                                                            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--bg-main)'}
                                                            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                                                        >
                                                            <Copy size={18} />
                                                        </button>

                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecruiterJobs;
