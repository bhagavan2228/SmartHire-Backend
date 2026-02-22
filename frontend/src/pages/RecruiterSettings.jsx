import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { Settings as SettingsIcon, Building, Users, Shield, Bell, Check, Edit3, Plus, Trash2 } from 'lucide-react';

const RecruiterSettings = () => {
    const [activeTab, setActiveTab] = useState('company');

    // Mock Settings Data
    const [companyDetails, setCompanyDetails] = useState({
        name: 'TechCorp Solutions', website: 'https://techcorp.example.com', size: '50-200 Employees', industry: 'Software Development', description: 'Building the future of enterprise software with React and Java.'
    });

    const [teamMembers, setTeamMembers] = useState([
        { id: 1, name: 'Admin User', email: 'admin@techcorp.example.com', role: 'Super Admin', lastActive: '2 mins ago' },
        { id: 2, name: 'Sarah Lee', email: 'sarah.l@techcorp.example.com', role: 'Recruiter', lastActive: '1 hr ago' },
        { id: 3, name: 'David Brown', email: 'dbrown@techcorp.example.com', role: 'Hiring Manager', lastActive: 'Yesterday' }
    ]);

    const handleSave = () => {
        alert("Settings saved successfully!");
    };

    return (
        <div className="app-container">
            <Sidebar />
            <div className="main-content">
                <Navbar title="Account Settings" />

                <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>

                    {/* Header Controls */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                        <div>
                            <h2 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-dark)' }}>Organization Settings</h2>
                            <p style={{ margin: 0, color: 'var(--text-muted)' }}>Manage your company profile, team members, roles, and hiring preferences.</p>
                        </div>
                        <button onClick={handleSave} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Check size={16} /> Save Changes
                        </button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '2.5rem' }}>

                        {/* Settings Navigation Menu */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <SettingsMenuTab active={activeTab === 'company'} onClick={() => setActiveTab('company')} icon={<Building size={18} />} label="Company Profile" />
                            <SettingsMenuTab active={activeTab === 'team'} onClick={() => setActiveTab('team')} icon={<Users size={18} />} label="Team Members" />
                            <SettingsMenuTab active={activeTab === 'roles'} onClick={() => setActiveTab('roles')} icon={<Shield size={18} />} label="Roles & Permissions" />
                            <SettingsMenuTab active={activeTab === 'notifications'} onClick={() => setActiveTab('notifications')} icon={<Bell size={18} />} label="Notifications" />
                        </div>

                        {/* Settings Content Area */}
                        <div>
                            {activeTab === 'company' && (
                                <div className="card" style={{ padding: '2rem' }}>
                                    <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.25rem', color: 'var(--text-dark)' }}>Company Profile</h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                        <div>
                                            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--text-dark)' }}>Company Name</label>
                                            <input type="text" value={companyDetails.name} onChange={e => setCompanyDetails({ ...companyDetails, name: e.target.value })} style={inputStyle} />
                                        </div>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                                            <div>
                                                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--text-dark)' }}>Website</label>
                                                <input type="url" value={companyDetails.website} onChange={e => setCompanyDetails({ ...companyDetails, website: e.target.value })} style={inputStyle} />
                                            </div>
                                            <div>
                                                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--text-dark)' }}>Company Size</label>
                                                <select value={companyDetails.size} onChange={e => setCompanyDetails({ ...companyDetails, size: e.target.value })} style={inputStyle}>
                                                    <option>1-10 Employees</option>
                                                    <option>11-50 Employees</option>
                                                    <option>50-200 Employees</option>
                                                    <option>201-500 Employees</option>
                                                    <option>500+ Employees</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--text-dark)' }}>Industry</label>
                                            <input type="text" value={companyDetails.industry} onChange={e => setCompanyDetails({ ...companyDetails, industry: e.target.value })} style={inputStyle} />
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--text-dark)' }}>Company Description</label>
                                            <textarea value={companyDetails.description} onChange={e => setCompanyDetails({ ...companyDetails, description: e.target.value })} style={{ ...inputStyle, minHeight: '120px', resize: 'vertical' }} />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'team' && (
                                <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
                                    <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <h3 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--text-dark)' }}>Team Members</h3>
                                        <button className="btn" style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-color)', fontSize: '0.85rem', fontWeight: '600' }}>
                                            <Plus size={16} /> Invite Member
                                        </button>
                                    </div>

                                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                        <thead style={{ backgroundColor: 'var(--bg-main)' }}>
                                            <tr>
                                                <th style={{ padding: '1rem 2rem', fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase' }}>User</th>
                                                <th style={{ padding: '1rem 2rem', fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Role</th>
                                                <th style={{ padding: '1rem 2rem', fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Last Active</th>
                                                <th style={{ padding: '1rem 2rem', fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase', textAlign: 'right' }}>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {teamMembers.map((member) => (
                                                <tr key={member.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                                    <td style={{ padding: '1rem 2rem' }}>
                                                        <div style={{ fontWeight: '600', color: 'var(--text-dark)' }}>{member.name}</div>
                                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{member.email}</div>
                                                    </td>
                                                    <td style={{ padding: '1rem 2rem' }}>
                                                        <span style={{
                                                            padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '600',
                                                            backgroundColor: member.role === 'Super Admin' ? '#fef08a' : member.role === 'Recruiter' ? '#e0e7ff' : '#ecfdf5',
                                                            color: member.role === 'Super Admin' ? '#854d0e' : member.role === 'Recruiter' ? '#4338ca' : '#059669'
                                                        }}>
                                                            {member.role}
                                                        </span>
                                                    </td>
                                                    <td style={{ padding: '1rem 2rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>{member.lastActive}</td>
                                                    <td style={{ padding: '1rem 2rem', textAlign: 'right' }}>
                                                        <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '0 0.5rem' }}><Edit3 size={16} /></button>
                                                        {member.role !== 'Super Admin' && <button style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0 0.5rem' }}><Trash2 size={16} /></button>}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                            {activeTab === 'roles' && (
                                <div className="card" style={{ padding: '2rem' }}>
                                    <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.25rem', color: 'var(--text-dark)' }}>Permissions Matrix</h3>
                                    <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Configure what each role is allowed to do within your SmartHire workspace.</p>

                                    <div style={{ border: '1px solid var(--border-color)', borderRadius: '8px', overflow: 'hidden' }}>
                                        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', backgroundColor: 'var(--bg-main)', padding: '1rem', borderBottom: '1px solid var(--border-color)', fontWeight: '600', color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase' }}>
                                            <div>Capability</div>
                                            <div style={{ textAlign: 'center' }}>Super Admin</div>
                                            <div style={{ textAlign: 'center' }}>Recruiter</div>
                                        </div>
                                        <PermissionRow label="Manage Company Settings" admin={true} rec={false} />
                                        <PermissionRow label="Create & Edit Job Posts" admin={true} rec={true} />
                                        <PermissionRow label="View All Candidates" admin={true} rec={true} />
                                        <PermissionRow label="Schedule Interviews" admin={true} rec={true} />
                                        <PermissionRow label="Make Direct Offers" admin={true} rec={false} />
                                    </div>
                                </div>
                            )}

                            {activeTab === 'notifications' && (
                                <div className="card" style={{ padding: '2rem' }}>
                                    <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.25rem', color: 'var(--text-dark)' }}>Email Preferences</h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                        <ToggleSetting title="New Candidate Application" desc="Email me when a new candidate applies to a job I posted." defaultChecked={true} />
                                        <ToggleSetting title="Interview Accepts/Declines" desc="Notify me when a candidate responds to an interview invite." defaultChecked={true} />
                                        <ToggleSetting title="Daily Digest" desc="Send me a daily summary of hiring activity." defaultChecked={false} />
                                        <ToggleSetting title="Hiring Manager Feedback" desc="Alert me when a hiring manager leaves feedback on a candidate." defaultChecked={true} />
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const SettingsMenuTab = ({ active, onClick, icon, label }) => (
    <button
        onClick={onClick}
        style={{
            display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem', width: '100%',
            backgroundColor: active ? '#eff6ff' : 'transparent',
            color: active ? 'var(--primary-color)' : 'var(--text-dark)',
            border: 'none', borderRadius: '8px', textAlign: 'left', fontWeight: '600', fontSize: '0.95rem', cursor: 'pointer', transition: 'all 0.2s',
            borderLeft: active ? '3px solid var(--primary-color)' : '3px solid transparent'
        }}
    >
        {icon} {label}
    </button>
);

const PermissionRow = ({ label, admin, rec }) => (
    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', padding: '1rem', borderBottom: '1px solid var(--border-color)', alignItems: 'center' }}>
        <div style={{ fontSize: '0.9rem', color: 'var(--text-dark)', fontWeight: '500' }}>{label}</div>
        <div style={{ textAlign: 'center', color: admin ? 'var(--success-color)' : 'var(--text-muted)' }}>{admin ? <Check size={18} style={{ margin: '0 auto' }} /> : '-'}</div>
        <div style={{ textAlign: 'center', color: rec ? 'var(--success-color)' : 'var(--text-muted)' }}>{rec ? <Check size={18} style={{ margin: '0 auto' }} /> : '-'}</div>
    </div>
);

const ToggleSetting = ({ title, desc, defaultChecked }) => {
    const [checked, setChecked] = useState(defaultChecked);
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
                <div style={{ fontWeight: '600', color: 'var(--text-dark)', marginBottom: '0.25rem' }}>{title}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{desc}</div>
            </div>
            <div
                onClick={() => setChecked(!checked)}
                style={{
                    width: '44px', height: '24px', backgroundColor: checked ? 'var(--primary-color)' : '#cbd5e1',
                    borderRadius: '12px', position: 'relative', cursor: 'pointer', transition: 'background-color 0.2s'
                }}
            >
                <div style={{
                    position: 'absolute', top: '2px', left: checked ? '22px' : '2px',
                    width: '20px', height: '20px', backgroundColor: 'white', borderRadius: '50%',
                    transition: 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                }}></div>
            </div>
        </div>
    );
};

const inputStyle = {
    width: '100%',
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    border: '1px solid var(--border-color)',
    fontSize: '0.95rem',
    outline: 'none',
    backgroundColor: 'var(--bg-main)',
    color: 'var(--text-dark)',
    transition: 'all 0.2s',
    fontFamily: 'inherit'
};

export default RecruiterSettings;
