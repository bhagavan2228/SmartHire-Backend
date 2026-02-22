import React, { useState, useRef, useEffect } from 'react';
import { Bell, User, MessageSquare, Calendar, Eye, Sparkles, CheckCheck, LogOut, Settings, UserCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ title }) => {
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [messagesCount, setMessagesCount] = useState(5);
    const navigate = useNavigate();

    const [notifications, setNotifications] = useState([
        { id: 1, text: "Interview Tomorrow at 10:00 AM", group: "Today", icon: <Calendar size={16} color="var(--primary-color)" />, unread: true },
        { id: 2, text: "Your application for Java Developer was viewed", group: "Yesterday", icon: <Eye size={16} color="var(--text-muted)" />, unread: true },
        { id: 3, text: "5 New Jobs Matching Your Profile", group: "Earlier", icon: <Sparkles size={16} color="var(--warning-color)" />, unread: false },
        { id: 4, text: "Interview Scheduled for Backend Engineer", group: "Earlier", icon: <Calendar size={16} color="var(--danger-color)" />, unread: false }
    ]);

    const notifRef = useRef(null);
    const profileRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (notifRef.current && !notifRef.current.contains(event.target)) {
                setShowNotifications(false);
            }
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setShowProfile(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const unreadCount = notifications.filter(n => n.unread).length;

    const groupedNotifications = {
        Today: notifications.filter(n => n.group === 'Today'),
        Yesterday: notifications.filter(n => n.group === 'Yesterday'),
        Earlier: notifications.filter(n => n.group === 'Earlier'),
    };

    const markAllRead = () => {
        setNotifications(notifications.map(n => ({ ...n, unread: false })));
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('userId');
        navigate('/login');
    };

    return (
        <header style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1rem 2rem',
            background: 'var(--bg-card)',
            borderBottom: '1px solid var(--border-color)',
            position: 'sticky',
            top: 0,
            zIndex: 10
        }}>
            <h2 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--text-dark)', fontWeight: '700' }}>{title}</h2>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                {/* Messages Icon */}
                <button
                    onClick={() => setMessagesCount(0)}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        color: 'var(--text-muted)',
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <MessageSquare size={20} />
                    {messagesCount > 0 && (
                        <span style={{
                            position: 'absolute',
                            top: '-4px',
                            right: '-6px',
                            backgroundColor: 'var(--danger-color)',
                            color: 'white',
                            fontSize: '0.65rem',
                            fontWeight: 'bold',
                            width: '16px',
                            height: '16px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '2px solid white'
                        }}>
                            {messagesCount}
                        </span>
                    )}
                </button>

                {/* Notifications Icon & Dropdown */}
                <div style={{ position: 'relative' }} ref={notifRef}>
                    <button
                        onClick={() => {
                            setShowNotifications(!showNotifications);
                            if (!showNotifications) setShowProfile(false);
                        }}
                        style={{
                            background: showNotifications ? 'var(--bg-main)' : 'white',
                            border: '1px solid var(--border-color)',
                            cursor: 'pointer',
                            color: showNotifications ? 'var(--primary-color)' : 'var(--text-muted)',
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.2s',
                            borderColor: showNotifications ? 'var(--primary-color)' : 'var(--border-color)'
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--primary-color)'; e.currentTarget.style.borderColor = 'var(--primary-color)'; }}
                        onMouseLeave={(e) => { if (!showNotifications) { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border-color)'; } }}
                    >
                        <Bell size={18} />
                        {unreadCount > 0 && (
                            <span style={{
                                position: 'absolute',
                                top: '-2px',
                                right: '-2px',
                                backgroundColor: 'var(--danger-color)',
                                color: 'white',
                                fontSize: '0.65rem',
                                fontWeight: 'bold',
                                width: '16px',
                                height: '16px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '2px solid white'
                            }}>
                                {unreadCount}
                            </span>
                        )}
                    </button>

                    {showNotifications && (
                        <div className="card animate-fade-in" style={{
                            position: 'absolute',
                            top: '120%',
                            right: '-10px',
                            width: '350px',
                            padding: '0',
                            zIndex: 50,
                            boxShadow: 'var(--shadow-elevated)',
                            borderRadius: 'var(--border-radius-lg)',
                            overflow: 'hidden'
                        }}>
                            <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-main)' }}>
                                <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: '600' }}>Notifications</h3>
                                {unreadCount > 0 && (
                                    <span onClick={markAllRead} style={{ fontSize: '0.75rem', color: 'var(--primary-color)', cursor: 'pointer', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <CheckCheck size={14} /> Mark all Read
                                    </span>
                                )}
                            </div>
                            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                {Object.entries(groupedNotifications).map(([group, items]) => (
                                    items.length > 0 && (
                                        <div key={group}>
                                            <div style={{ padding: '0.5rem 1rem', background: 'var(--bg-main)', fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-muted)' }}>
                                                {group}
                                            </div>
                                            {items.map(notif => (
                                                <div key={notif.id} style={{
                                                    padding: '1rem',
                                                    borderBottom: '1px solid var(--border-color)',
                                                    backgroundColor: notif.unread ? 'var(--primary-light)' : 'white',
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    gap: '1rem',
                                                    alignItems: 'flex-start',
                                                    transition: 'background-color 0.2s'
                                                }}
                                                    onClick={() => {
                                                        const newNotifs = [...notifications];
                                                        const idx = newNotifs.findIndex(n => n.id === notif.id);
                                                        newNotifs[idx].unread = false;
                                                        setNotifications(newNotifs);
                                                    }}
                                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-main)'}
                                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = notif.unread ? 'var(--primary-light)' : 'white'}
                                                >
                                                    <div style={{
                                                        width: '32px', height: '32px', borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: 'var(--shadow-sm)'
                                                    }}>
                                                        {notif.icon}
                                                    </div>
                                                    <div>
                                                        <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.875rem', color: 'var(--text-dark)', fontWeight: notif.unread ? '600' : '500' }}>{notif.text}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )
                                ))}
                            </div>
                            <div style={{ padding: '0.75rem', textAlign: 'center', borderTop: '1px solid var(--border-color)', background: 'white' }}>
                                <span style={{ fontSize: '0.875rem', color: 'var(--primary-color)', cursor: 'pointer', fontWeight: '600' }}>View All Notifications</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Profile Dropdown */}
                <div style={{ position: 'relative' }} ref={profileRef}>
                    <div
                        onClick={() => {
                            setShowProfile(!showProfile);
                            if (!showProfile) setShowNotifications(false);
                        }}
                        style={{
                            width: '38px',
                            height: '38px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, var(--primary-color) 0%, #3b82f6 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            boxShadow: showProfile ? '0 0 0 3px var(--primary-light)' : '0 2px 4px rgba(26, 86, 219, 0.3)',
                            transition: 'all 0.2s'
                        }}>
                        <User size={18} />
                    </div>

                    {showProfile && (
                        <div className="card animate-fade-in" style={{
                            position: 'absolute',
                            top: '120%',
                            right: 0,
                            width: '220px',
                            padding: '0.5rem 0',
                            zIndex: 50,
                            boxShadow: 'var(--shadow-elevated)',
                            borderRadius: 'var(--border-radius-md)'
                        }}>
                            <div style={{ padding: '0.5rem 1.25rem 1rem 1.25rem', borderBottom: '1px solid var(--border-color)', marginBottom: '0.5rem' }}>
                                <p style={{ margin: '0 0 0.25rem 0', fontWeight: '600', color: 'var(--text-dark)' }}>{localStorage.getItem('role') === 'REC' ? 'Recruiter' : 'Candidate'}</p>
                                <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>user@example.com</p>
                            </div>

                            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1.25rem', color: 'var(--text-main)', textDecoration: 'none', transition: 'background 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-main)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                                <UserCircle size={16} /> My Profile
                            </a>
                            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1.25rem', color: 'var(--text-main)', textDecoration: 'none', transition: 'background 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-main)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                                <Settings size={16} /> Account Settings
                            </a>

                            <div style={{ height: '1px', backgroundColor: 'var(--border-color)', margin: '0.5rem 0' }}></div>

                            <button onClick={handleLogout} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1.25rem', color: 'var(--danger-color)', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', transition: 'background 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--danger-light)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                                <LogOut size={16} /> Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;
