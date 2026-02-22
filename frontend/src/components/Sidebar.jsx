import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    Briefcase,
    Users,
    LogOut,
    Sparkles,
    FileText,
    UploadCloud,
    X,
    File,
    CheckCircle,
    PlusCircle,
    Calendar,
    Settings
} from 'lucide-react';

const Sidebar = () => {
    const navigate = useNavigate();
    const role = localStorage.getItem('role');
    const [showResumeModal, setShowResumeModal] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('userId');
        navigate('/login');
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileSelect(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFileSelect(e.target.files[0]);
        }
    };

    const handleFileSelect = (file) => {
        if (file.type === "application/pdf" || file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || file.type === "application/msword") {
            setSelectedFile(file);
        } else {
            alert("Please upload a PDF or DOCX file.");
        }
    };

    const handleUpload = () => {
        if (!selectedFile) return;
        setUploading(true);
        // Simulate upload progress
        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;
            setUploadProgress(progress);
            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    setUploading(false);
                    alert("Resume uploaded successfully!");
                    setShowResumeModal(false);
                    setSelectedFile(null);
                    setUploadProgress(0);
                }, 500);
            }
        }, 200);
    };

    return (
        <div style={{
            width: 'var(--sidebar-width)',
            backgroundColor: 'var(--bg-sidebar)',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: 'var(--shadow-lg)',
            zIndex: 40
        }}>
            <div style={{ padding: '1.75rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Sparkles size={24} color="white" />
                <h2 style={{ color: 'white', margin: 0, fontSize: '1.25rem', fontWeight: '700', letterSpacing: '0.5px' }}>SmartHire</h2>
            </div>

            <nav style={{ flex: 1, padding: '1rem 0', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                {role === 'REC' && (
                    <>
                        <SidebarLink to="/recruiter" icon={<LayoutDashboard size={20} />} label="Dashboard Overview" />
                        <SidebarLink to="/recruiter/manage-jobs" icon={<Briefcase size={20} />} label="Active Jobs" />
                        <SidebarLink to="/recruiter/post-job" icon={<PlusCircle size={20} />} label="Post New Job" />
                        <SidebarLink to="/recruiter/applicants" icon={<Users size={20} />} label="Candidates" />
                        <SidebarLink to="/recruiter/interviews" icon={<Calendar size={20} />} label="Interviews" />
                        <SidebarLink to="/recruiter/settings" icon={<Settings size={20} />} label="Settings" />
                    </>
                )}

                {role === 'USER' && (
                    <>
                        <SidebarLink to="/candidate" icon={<Briefcase size={20} />} label="Browse Jobs" />
                        <SidebarLink to="/candidate/applications" icon={<FileText size={20} />} label="My Applications" />
                    </>
                )}
            </nav>

            <div style={{ padding: '1.5rem' }}>
                {role === 'USER' && (
                    <button
                        onClick={() => setShowResumeModal(true)}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            width: '100%',
                            padding: '1rem',
                            backgroundColor: 'rgba(255,255,255,0.1)',
                            color: 'white',
                            border: '1px solid rgba(255,255,255,0.2)',
                            borderRadius: 'var(--border-radius-md)',
                            cursor: 'pointer',
                            textAlign: 'left',
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            marginBottom: '1rem',
                            transition: 'all 0.2s ease',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'var(--primary-color)';
                            e.currentTarget.style.borderColor = 'var(--primary-color)';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                            e.currentTarget.style.transform = 'translateY(0)';
                        }}
                    >
                        <UploadCloud size={20} />
                        Upload Resume
                    </button>
                )}

                <button
                    onClick={handleLogout}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        width: '100%',
                        padding: '0.75rem 1rem',
                        backgroundColor: 'transparent',
                        color: 'rgba(255,255,255,0.8)',
                        border: 'none',
                        borderRadius: 'var(--border-radius-sm)',
                        cursor: 'pointer',
                        textAlign: 'left',
                        fontSize: '0.9rem',
                        fontWeight: '500',
                        transition: 'var(--transition-fast)'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--bg-sidebar-active)';
                        e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = 'rgba(255,255,255,0.8)';
                    }}
                >
                    <LogOut size={18} />
                    Logout
                </button>
            </div>

            {/* Resume Upload Modal */}
            {showResumeModal && (
                <div style={{
                    position: 'fixed',
                    top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    backdropFilter: 'blur(4px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 9999
                }}>
                    <div style={{
                        background: 'var(--bg-main)',
                        width: '500px',
                        borderRadius: 'var(--border-radius-lg)',
                        padding: '2rem',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                        position: 'relative'
                    }}>
                        <button
                            onClick={() => setShowResumeModal(false)}
                            style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
                        >
                            <X size={24} />
                        </button>

                        <h2 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-dark)', fontSize: '1.5rem', fontWeight: '700' }}>Upload Resume</h2>
                        <p style={{ margin: '0 0 2rem 0', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Upload your latest ATS-friendly resume to fast-track applications.</p>

                        {/* Drag and Drop Zone */}
                        <div
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                            style={{
                                border: `2px dashed ${dragActive ? 'var(--primary-color)' : 'var(--border-color)'}`,
                                borderRadius: 'var(--border-radius-md)',
                                padding: '3rem 2rem',
                                textAlign: 'center',
                                backgroundColor: dragActive ? 'var(--primary-light)' : 'var(--bg-card)',
                                transition: 'all 0.2s',
                                cursor: 'pointer',
                                marginBottom: '1.5rem'
                            }}
                            onClick={() => document.getElementById('resume-upload-input').click()}
                        >
                            <input
                                id="resume-upload-input"
                                type="file"
                                style={{ display: 'none' }}
                                onChange={handleChange}
                                accept=".pdf,.doc,.docx"
                            />

                            {!selectedFile ? (
                                <>
                                    <div style={{ background: 'var(--primary-light)', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
                                        <UploadCloud size={32} color="var(--primary-color)" />
                                    </div>
                                    <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-dark)', fontSize: '1.1rem' }}>Click or drag file to this area to upload</h3>
                                    <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.85rem' }}>Support for a single or bulk upload. Strictly prohibit from uploading company data or other sensitive files.</p>
                                    <p style={{ margin: '0.5rem 0 0 0', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 'bold' }}>Accepted formats: PDF, DOCX (Max 5MB)</p>
                                </>
                            ) : (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center', background: 'white', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                                    <File size={32} color="var(--primary-color)" />
                                    <div style={{ textAlign: 'left' }}>
                                        <p style={{ margin: '0', fontWeight: '600', color: 'var(--text-dark)', fontSize: '0.95rem' }}>{selectedFile.name}</p>
                                        <p style={{ margin: '0', color: 'var(--text-muted)', fontSize: '0.8rem' }}>{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                                    </div>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setSelectedFile(null); }}
                                        style={{ marginLeft: '1rem', background: 'none', border: 'none', color: 'var(--danger-color)', cursor: 'pointer' }}
                                    >
                                        Remove
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Progress Bar */}
                        {uploading && (
                            <div style={{ marginBottom: '1.5rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
                                    <span style={{ color: 'var(--text-dark)', fontWeight: '600' }}>Uploading...</span>
                                    <span style={{ color: 'var(--primary-color)', fontWeight: '600' }}>{Math.min(uploadProgress, 100)}%</span>
                                </div>
                                <div style={{ width: '100%', height: '8px', background: 'var(--border-color)', borderRadius: '4px', overflow: 'hidden' }}>
                                    <div style={{ width: `${Math.min(uploadProgress, 100)}%`, height: '100%', background: 'var(--primary-color)', transition: 'width 0.2s ease' }}></div>
                                </div>
                            </div>
                        )}

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                            <button
                                onClick={() => setShowResumeModal(false)}
                                style={{ padding: '0.75rem 1.5rem', border: '1px solid var(--border-color)', background: 'white', color: 'var(--text-main)', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpload}
                                disabled={!selectedFile || uploading}
                                style={{
                                    padding: '0.75rem 1.5rem', border: 'none', background: (!selectedFile || uploading) ? 'var(--text-muted)' : 'var(--primary-color)', color: 'white',
                                    borderRadius: '6px', fontWeight: '600', cursor: (!selectedFile || uploading) ? 'not-allowed' : 'pointer', transition: 'background 0.2s',
                                    display: 'flex', alignItems: 'center', gap: '0.5rem'
                                }}
                            >
                                {uploading ? 'Processing...' : (
                                    <>
                                        Upload Now <CheckCircle size={18} />
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const SidebarLink = ({ to, icon, label }) => {
    return (
        <NavLink
            to={to}
            style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.875rem 1.5rem',
                color: isActive ? 'white' : 'rgba(255,255,255,0.7)',
                textDecoration: 'none',
                backgroundColor: isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
                borderLeft: isActive ? '3px solid white' : '3px solid transparent',
                fontSize: '0.95rem',
                transition: 'var(--transition-fast)'
            })}
        >
            {icon}
            <span style={{ fontWeight: 500 }}>{label}</span>
        </NavLink>
    );
};

export default Sidebar;
