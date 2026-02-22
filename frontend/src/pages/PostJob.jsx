import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { Briefcase, MapPin, DollarSign, List, Edit3, Image, Tag, Save, PlusCircle, Check, UploadCloud } from 'lucide-react';

const PostJob = () => {
    const [formData, setFormData] = useState({
        title: '',
        company: '',
        location: '',
        type: 'Full-Time',
        experience: 'Entry-Level',
        salaryMin: '',
        salaryMax: '',
        description: '',
        requirements: '',
        skills: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Mocking an API call
        setTimeout(() => {
            setIsSubmitting(false);
            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false);
                setFormData({
                    title: '', company: '', location: '', type: 'Full-Time', experience: 'Entry-Level',
                    salaryMin: '', salaryMax: '', description: '', requirements: '', skills: ''
                });
            }, 3000);
        }, 1200);
    };

    return (
        <div className="app-container">
            <Sidebar />
            <div className="main-content">
                <Navbar title="Post a New Job" />

                <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                        <div>
                            <h2 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-dark)' }}>Create a Job Posting</h2>
                            <p style={{ margin: 0, color: 'var(--text-muted)' }}>Fill out the details below to publish a new open position to the candidate board.</p>
                        </div>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button className="btn" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'white', border: '1px solid var(--border-color)', color: 'var(--text-main)' }}>
                                <Save size={16} /> Save Draft
                            </button>
                            <button onClick={handleSubmit} disabled={isSubmitting} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                {isSubmitting ? 'Publishing...' : <><PlusCircle size={16} /> Publish Job</>}
                            </button>
                        </div>
                    </div>

                    {showSuccess && (
                        <div style={{ padding: '1rem 1.5rem', backgroundColor: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: 'var(--border-radius-md)', color: '#065f46', display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', animation: 'fadeIn 0.3s ease-out' }}>
                            <div style={{ width: '24px', height: '24px', backgroundColor: '#10b981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                                <Check size={14} />
                            </div>
                            <strong>Success!</strong> Your job posting has been published and is now live.
                        </div>
                    )}

                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>

                        {/* Main Form Content */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                            {/* Basic Details */}
                            <div className="card" style={{ padding: '1.5rem' }}>
                                <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Edit3 size={18} color="var(--primary-color)" /> Basic Information
                                </h3>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--text-dark)' }}>Job Title*</label>
                                        <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Senior Frontend Developer" style={inputStyle} required />
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                        <div>
                                            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--text-dark)' }}>Company Name*</label>
                                            <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="e.g. Acme Corp" style={inputStyle} required />
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--text-dark)' }}>Location*</label>
                                            <div style={{ position: 'relative' }}>
                                                <MapPin size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                                                <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="e.g. San Francisco, CA or Remote" style={{ ...inputStyle, paddingLeft: '2.5rem' }} required />
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                        <div>
                                            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--text-dark)' }}>Employment Type*</label>
                                            <select name="type" value={formData.type} onChange={handleChange} style={inputStyle}>
                                                <option value="Full-Time">Full-Time</option>
                                                <option value="Part-Time">Part-Time</option>
                                                <option value="Contract">Contract</option>
                                                <option value="Internship">Internship</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--text-dark)' }}>Experience Level*</label>
                                            <select name="experience" value={formData.experience} onChange={handleChange} style={inputStyle}>
                                                <option value="Entry-Level">Entry-Level</option>
                                                <option value="Mid-Level">Mid-Level</option>
                                                <option value="Senior-Level">Senior-Level</option>
                                                <option value="Executive">Executive</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Job Description */}
                            <div className="card" style={{ padding: '1.5rem' }}>
                                <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <List size={18} color="var(--primary-color)" /> Role Details
                                </h3>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--text-dark)' }}>Job Description*</label>
                                        <textarea
                                            name="description" value={formData.description} onChange={handleChange}
                                            placeholder="Provide a detailed description of the role..."
                                            style={{ ...inputStyle, minHeight: '150px', resize: 'vertical' }} required
                                        />
                                    </div>

                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--text-dark)' }}>Key Responsibilities & Requirements</label>
                                        <textarea
                                            name="requirements" value={formData.requirements} onChange={handleChange}
                                            placeholder="List the key requirements and what the candidate will be doing..."
                                            style={{ ...inputStyle, minHeight: '120px', resize: 'vertical' }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar Form Content */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                            {/* Compensation */}
                            <div className="card" style={{ padding: '1.5rem' }}>
                                <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <DollarSign size={18} color="var(--primary-color)" /> Compensation
                                </h3>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--text-dark)' }}>Salary Range (Annual)</label>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <div style={{ position: 'relative', flex: 1 }}>
                                                <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>$</span>
                                                <input type="number" name="salaryMin" value={formData.salaryMin} onChange={handleChange} placeholder="Min" style={{ ...inputStyle, paddingLeft: '2rem' }} />
                                            </div>
                                            <span style={{ color: 'var(--text-muted)' }}>to</span>
                                            <div style={{ position: 'relative', flex: 1 }}>
                                                <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>$</span>
                                                <input type="number" name="salaryMax" value={formData.salaryMax} onChange={handleChange} placeholder="Max" style={{ ...inputStyle, paddingLeft: '2rem' }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Tags / Skills */}
                            <div className="card" style={{ padding: '1.5rem' }}>
                                <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Tag size={18} color="var(--primary-color)" /> Tags & Skills
                                </h3>

                                <div>
                                    <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--text-dark)' }}>Required Skills</label>
                                    <input
                                        type="text" name="skills" value={formData.skills} onChange={handleChange}
                                        placeholder="React, Java, SQL (comma separated)"
                                        style={inputStyle}
                                    />
                                    <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Separate skills with a comma to add them as tags.</p>
                                </div>
                            </div>

                            {/* Branding */}
                            <div className="card" style={{ padding: '1.5rem' }}>
                                <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Image size={18} color="var(--primary-color)" /> Company Branding
                                </h3>

                                <div style={{ border: '2px dashed var(--border-color)', borderRadius: 'var(--border-radius-md)', padding: '2rem 1rem', textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s', backgroundColor: 'var(--bg-main)' }} onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--primary-color)'} onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-color)'}>
                                    <UploadCloud size={32} color="var(--text-muted)" style={{ margin: '0 auto 0.5rem auto' }} />
                                    <p style={{ margin: '0 0 0.25rem 0', fontWeight: '600', color: 'var(--text-dark)' }}>Upload Company Logo</p>
                                    <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>PNG, JPG up to 5MB</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
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

export default PostJob;
