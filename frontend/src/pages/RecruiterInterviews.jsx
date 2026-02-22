import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { Calendar as CalendarIcon, Clock, Users, Video, MapPin, Plus, MoreHorizontal, ChevronRight, ChevronLeft, Search } from 'lucide-react';

const RecruiterInterviews = () => {
    const [view, setView] = useState('list'); // 'list' or 'calendar'
    const [showScheduleModal, setShowScheduleModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const [interviews, setInterviews] = useState([
        { id: 1, candidate: 'Michael Chen', role: 'Senior Frontend Developer', date: '2023-10-31', time: '10:00 AM - 11:30 AM', type: 'Online', format: 'Technical Round', interviewers: ['Alex Johnson', 'Sarah Lee'], status: 'Upcoming' },
        { id: 2, candidate: 'Jessica Patel', role: 'Product Manager', date: '2023-11-01', time: '02:00 PM - 03:00 PM', type: 'Onsite', format: 'Culture Fit', location: 'HQ - Room 4B', interviewers: ['David Brown'], status: 'Upcoming' },
        { id: 3, candidate: 'Emily Watson', role: 'UX/UI Designer', date: '2023-10-28', time: '11:00 AM - 12:00 PM', type: 'Online', format: 'Portfolio Review', interviewers: ['Sarah Lee'], status: 'Feedback Pending' },
        { id: 4, candidate: 'David Smith', role: 'Backend Engineer (Java)', date: '2023-10-25', time: '09:00 AM - 10:00 AM', type: 'Online', format: 'Initial Screen', interviewers: ['HR Team'], status: 'Completed' },
    ]);

    const handleScheduleSubmit = (e) => {
        e.preventDefault();
        alert("Interview scheduled successfully! Notifications sent to candidate and interviewers.");
        setShowScheduleModal(false);
    };

    const upcomingInterviews = interviews.filter(i => i.status === 'Upcoming' && i.candidate.toLowerCase().includes(searchTerm.toLowerCase()));
    const pastInterviews = interviews.filter(i => i.status !== 'Upcoming' && i.candidate.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="app-container">
            <Sidebar />
            <div className="main-content">
                <Navbar title="Interview Scheduling" />

                <div style={{ padding: '2rem' }}>

                    {/* Header Controls */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                        <div>
                            <h2 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-dark)' }}>Interviews Schedule</h2>
                            <p style={{ margin: 0, color: 'var(--text-muted)' }}>Manage upcoming interviews, gather feedback, and coordinate with hiring managers.</p>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <div style={{ display: 'flex', backgroundColor: 'var(--bg-main)', padding: '0.25rem', borderRadius: '8px' }}>
                                <button onClick={() => setView('list')} style={{ padding: '0.5rem 1rem', border: 'none', backgroundColor: view === 'list' ? 'white' : 'transparent', borderRadius: '6px', fontWeight: '600', color: view === 'list' ? 'var(--primary-color)' : 'var(--text-muted)', cursor: 'pointer', boxShadow: view === 'list' ? 'var(--shadow-sm)' : 'none', transition: 'all 0.2s' }}>List View</button>
                                <button onClick={() => setView('calendar')} style={{ padding: '0.5rem 1rem', border: 'none', backgroundColor: view === 'calendar' ? 'white' : 'transparent', borderRadius: '6px', fontWeight: '600', color: view === 'calendar' ? 'var(--primary-color)' : 'var(--text-muted)', cursor: 'pointer', boxShadow: view === 'calendar' ? 'var(--shadow-sm)' : 'none', transition: 'all 0.2s' }}>Calendar</button>
                            </div>
                            <button onClick={() => setShowScheduleModal(true)} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Plus size={16} /> Schedule Interview
                            </button>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: '2rem' }}>

                        {/* Main Timeline / List */}
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-dark)' }}>Upcoming</h3>
                                <div style={{ position: 'relative' }}>
                                    <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
                                    <input
                                        type="text" placeholder="Search candidate..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                                        style={{ padding: '0.5rem 1rem 0.5rem 2.25rem', borderRadius: '8px', border: '1px solid var(--border-color)', outline: 'none', fontSize: '0.85rem' }}
                                    />
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3rem' }}>
                                {upcomingInterviews.length === 0 ? <p style={{ color: 'var(--text-muted)' }}>No upcoming interviews match your search.</p> : upcomingInterviews.map((interview) => (
                                    <InterviewCard key={interview.id} interview={interview} />
                                ))}
                            </div>

                            <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.1rem', color: 'var(--text-dark)' }}>Recent / Needs Feedback</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {pastInterviews.length === 0 ? <p style={{ color: 'var(--text-muted)' }}>No recent interviews.</p> : pastInterviews.map((interview) => (
                                    <InterviewCard key={interview.id} interview={interview} isPast={true} />
                                ))}
                            </div>
                        </div>

                        {/* Sidebar / Mini Calendar Placeholder */}
                        <div>
                            <div className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-dark)' }}>October 2023</h3>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button style={{ padding: '0.25rem', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'white', cursor: 'pointer' }}><ChevronLeft size={16} /></button>
                                        <button style={{ padding: '0.25rem', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'white', cursor: 'pointer' }}><ChevronRight size={16} /></button>
                                    </div>
                                </div>

                                {/* Very simple calendar mock */}
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.5rem', textAlign: 'center', fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                                    <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.5rem', textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-dark)' }}>
                                    {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                                        <div key={day} style={{
                                            padding: '0.5rem 0',
                                            borderRadius: '50%',
                                            backgroundColor: day === 31 || day === 28 ? 'var(--primary-light)' : day === 25 ? '#fee2e2' : 'transparent',
                                            color: day === 31 || day === 28 ? 'var(--primary-color)' : day === 25 ? '#dc2626' : 'inherit',
                                            fontWeight: day === 31 || day === 28 || day === 25 ? '700' : '400',
                                            cursor: 'pointer'
                                        }}>
                                            {day}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="card" style={{ padding: '1.5rem', backgroundColor: 'var(--bg-main)' }}>
                                <h3 style={{ margin: '0 0 1rem 0', fontSize: '1rem', color: 'var(--text-dark)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Clock size={16} color="var(--primary-color)" /> Sync Calendar
                                </h3>
                                <p style={{ margin: '0 0 1rem 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Connect your Google or Outlook calendar to prevent double-booking.</p>
                                <button className="btn" style={{ width: '100%', backgroundColor: 'white', border: '1px solid var(--border-color)' }}>Connect Calendar</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Schedule Modal Overlay */}
            {showScheduleModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'fadeIn 0.2s ease-out' }}>
                    <div style={{ backgroundColor: 'white', borderRadius: '12px', width: '100%', maxWidth: '600px', padding: '2rem', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h2 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--text-dark)' }}>Schedule Interview</h2>
                            <button onClick={() => setShowScheduleModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>&times;</button>
                        </div>

                        <form onSubmit={handleScheduleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--text-dark)' }}>Candidate*</label>
                                    <select required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', outline: 'none' }}>
                                        <option value="">Select Candidate</option>
                                        <option value="1">Michael Chen - Frontend</option>
                                        <option value="2">Jessica Patel - PM</option>
                                    </select>
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--text-dark)' }}>Interview Type*</label>
                                    <select required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', outline: 'none' }}>
                                        <option value="Technical">Technical Round</option>
                                        <option value="Culture">Culture Fit</option>
                                        <option value="Initial">Initial Screening</option>
                                        <option value="Executive">Executive Final</option>
                                    </select>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--text-dark)' }}>Date*</label>
                                    <input type="date" required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', outline: 'none' }} />
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--text-dark)' }}>Start*</label>
                                        <input type="time" required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', outline: 'none' }} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--text-dark)' }}>End*</label>
                                        <input type="time" required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', outline: 'none' }} />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--text-dark)' }}>Format*</label>
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                        <input type="radio" name="format" value="Online" defaultChecked /> Online (Video)
                                    </label>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                        <input type="radio" name="format" value="Onsite" /> Onsite (In-Office)
                                    </label>
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--text-dark)' }}>Assign Interviewers</label>
                                <input type="text" placeholder="Type names to search..." style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', outline: 'none' }} />
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
                                <button type="button" onClick={() => setShowScheduleModal(false)} className="btn" style={{ backgroundColor: 'white', border: '1px solid var(--border-color)' }}>Cancel</button>
                                <button type="submit" className="btn btn-primary">Send Invites</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

const InterviewCard = ({ interview, isPast }) => {
    return (
        <div className="card" style={{
            padding: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderLeft: `4px solid ${isPast ? (interview.status === 'Completed' ? '#10b981' : '#f59e0b') : 'var(--primary-color)'}`,
            opacity: isPast && interview.status === 'Completed' ? 0.7 : 1
        }}>
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                <div style={{ padding: '1rem', backgroundColor: 'var(--bg-main)', borderRadius: '12px', textAlign: 'center', minWidth: '80px' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '600', marginBottom: '0.25rem' }}>{new Date(interview.date).toLocaleDateString('en-US', { month: 'short' })}</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-dark)' }}>{new Date(interview.date).getDate()}</div>
                </div>

                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
                        <h4 style={{ margin: 0, fontSize: '1.05rem', color: 'var(--text-dark)' }}>{interview.format} with {interview.candidate}</h4>
                        <span style={{
                            padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: '600',
                            backgroundColor: interview.status === 'Upcoming' ? '#e0e7ff' : interview.status === 'Completed' ? '#dcfce7' : '#fef3c7',
                            color: interview.status === 'Upcoming' ? '#4338ca' : interview.status === 'Completed' ? '#15803d' : '#b45309'
                        }}>
                            {interview.status}
                        </span>
                    </div>
                    <p style={{ margin: '0 0 0.75rem 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>{interview.role}</p>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', fontSize: '0.8rem', color: 'var(--text-main)', fontWeight: '500' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><Clock size={14} color="var(--text-muted)" /> {interview.time}</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                            {interview.type === 'Online' ? <Video size={14} color="var(--text-muted)" /> : <MapPin size={14} color="var(--text-muted)" />}
                            {interview.location || 'Google Meet'}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><Users size={14} color="var(--text-muted)" /> {interview.interviewers.join(', ')}</span>
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
                {isPast && interview.status === 'Feedback Pending' && (
                    <button className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>Submit Feedback</button>
                )}
                <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '0.5rem' }}><MoreHorizontal size={20} /></button>
            </div>
        </div>
    );
}

export default RecruiterInterviews;
