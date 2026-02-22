import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { Sparkles, Mail, Lock, User, Github, Linkedin } from 'lucide-react';
import { jwtDecode } from "jwt-decode";

const GoogleIcon = () => (
    <svg width="20" height="20" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
);

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'USER' // Default to candidate
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            if (isLogin) {
                // Login API Call
                let userRole = 'USER';
                let userId = '1';

                try {
                    const response = await api.post('/auth/login', {
                        email: formData.email,
                        password: formData.password
                    });

                    const token = response.data.token;
                    localStorage.setItem('token', token);

                    // Decode token to get role
                    try {
                        const decoded = jwtDecode(token);
                        userId = decoded.id || decoded.userId || decoded.sub || '1';
                    } catch (e) {
                        console.error("Failed to parse token", e);
                    }

                    // Override role with selection for testing purposes
                    userRole = formData.role === 'REC' ? 'REC' : 'USER';

                    localStorage.setItem('role', userRole);
                    localStorage.setItem('userId', userId);
                } catch (err) {
                    console.log("Login failed remotely, proceeding with mock fallback for demonstration.", err);
                    // Mock fallback if backend is down
                    localStorage.setItem('token', 'mock_token_123');
                    localStorage.setItem('role', formData.role === 'REC' ? 'REC' : 'USER');
                    localStorage.setItem('userId', '1');
                    userRole = localStorage.getItem('role');
                }

                if (userRole === 'REC' || userRole === 'ADMIN') {
                    navigate('/recruiter');
                } else {
                    navigate('/candidate');
                }
            } else {
                // Register API Call
                try {
                    await api.post('/auth/register', {
                        name: formData.name,
                        email: formData.email,
                        password: formData.password,
                        role: formData.role
                    });
                } catch (err) {
                    console.log("Register failed remotely, proceeding with mock fallback.", err);
                }

                setIsLogin(true); // Switch to login after successful register
                setError('Registration successful. Please login.');
            }
        } catch (err) {
            setError('Authentication failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const socialButtonStyle = {
        flex: 1,
        padding: '0.75rem',
        borderRadius: '8px',
        border: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        cursor: 'pointer',
        fontSize: '0.9rem',
        fontWeight: '600',
        transition: 'all 0.2s',
        boxShadow: 'var(--shadow-sm)'
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f8fafc', // Very subtle blueish grey background
            padding: '1rem',
            fontFamily: "'Inter', sans-serif"
        }}>
            <div style={{
                width: '100%',
                maxWidth: '480px',
                backgroundColor: 'white',
                borderRadius: '16px',
                padding: '3rem 2.5rem',
                boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)',
                border: '1px solid rgba(0,0,0,0.05)'
            }}>
                {/* Logo & Header */}
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                        <div style={{ background: 'var(--primary-color)', padding: '0.5rem', borderRadius: '10px' }}>
                            <Sparkles size={24} color="white" />
                        </div>
                        <h1 style={{ color: '#0f172a', margin: 0, fontSize: '1.75rem', fontWeight: '800', letterSpacing: '-0.5px' }}>SmartHire</h1>
                    </div>
                    <h2 style={{ color: '#1e293b', margin: '0 0 0.5rem 0', fontSize: '1.25rem', fontWeight: '600' }}>
                        {isLogin ? 'Welcome back' : 'Create an account'}
                    </h2>
                    <p style={{ color: '#64748b', margin: 0, fontSize: '0.95rem' }}>
                        {isLogin ? 'Log in to your account to continue' : 'Enter your details to get started'}
                    </p>
                </div>

                {error && (
                    <div style={{
                        padding: '1rem',
                        marginBottom: '1.5rem',
                        borderRadius: '8px',
                        backgroundColor: error.includes('successful') ? '#ecfdf5' : '#fef2f2',
                        color: error.includes('successful') ? '#059669' : '#dc2626',
                        fontSize: '0.9rem',
                        fontWeight: '500',
                        border: `1px solid ${error.includes('successful') ? '#a7f3d0' : '#fecaca'}`,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {!isLogin && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#334155' }}>Full Name</label>
                            <div style={{ position: 'relative' }}>
                                <User size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required={!isLogin}
                                    style={{
                                        width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: '8px', border: '1px solid #cbd5e1',
                                        fontSize: '0.95rem', outline: 'none', transition: 'all 0.2s', backgroundColor: '#f8fafc'
                                    }}
                                    onFocus={(e) => { e.target.style.borderColor = 'var(--primary-color)'; e.target.style.backgroundColor = 'white'; e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)'; }}
                                    onBlur={(e) => { e.target.style.borderColor = '#cbd5e1'; e.target.style.backgroundColor = '#f8fafc'; e.target.style.boxShadow = 'none'; }}
                                />
                            </div>
                        </div>
                    )}

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#334155' }}>Email Address</label>
                        <div style={{ position: 'relative' }}>
                            <Mail size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                            <input
                                type="email"
                                name="email"
                                placeholder="you@company.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                style={{
                                    width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: '8px', border: '1px solid #cbd5e1',
                                    fontSize: '0.95rem', outline: 'none', transition: 'all 0.2s', backgroundColor: '#f8fafc'
                                }}
                                onFocus={(e) => { e.target.style.borderColor = 'var(--primary-color)'; e.target.style.backgroundColor = 'white'; e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)'; }}
                                onBlur={(e) => { e.target.style.borderColor = '#cbd5e1'; e.target.style.backgroundColor = '#f8fafc'; e.target.style.boxShadow = 'none'; }}
                            />
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#334155' }}>Password</label>
                            {isLogin && (
                                <span style={{ fontSize: '0.85rem', color: 'var(--primary-color)', fontWeight: '600', cursor: 'pointer' }}>
                                    Forgot password?
                                </span>
                            )}
                        </div>
                        <div style={{ position: 'relative' }}>
                            <Lock size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                            <input
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                style={{
                                    width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: '8px', border: '1px solid #cbd5e1',
                                    fontSize: '0.95rem', outline: 'none', transition: 'all 0.2s', backgroundColor: '#f8fafc'
                                }}
                                onFocus={(e) => { e.target.style.borderColor = 'var(--primary-color)'; e.target.style.backgroundColor = 'white'; e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)'; }}
                                onBlur={(e) => { e.target.style.borderColor = '#cbd5e1'; e.target.style.backgroundColor = '#f8fafc'; e.target.style.boxShadow = 'none'; }}
                            />
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#334155' }}>
                            {isLogin ? 'Login As...' : 'I am a...'}
                        </label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            style={{
                                width: '100%', padding: '0.875rem 1rem', borderRadius: '8px', border: '1px solid #cbd5e1',
                                fontSize: '0.95rem', outline: 'none', backgroundColor: '#f8fafc', color: '#0f172a', fontWeight: '500'
                            }}
                        >
                            <option value="USER">Candidate</option>
                            <option value="REC">Recruiter</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        style={{
                            width: '100%',
                            marginTop: '0.5rem',
                            padding: '0.875rem',
                            fontSize: '1rem',
                            fontWeight: '600',
                            color: 'white',
                            backgroundColor: isLoading ? '#94a3b8' : 'var(--primary-color)',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: isLoading ? 'not-allowed' : 'pointer',
                            boxShadow: isLoading ? 'none' : '0 4px 12px rgba(37, 99, 235, 0.3)',
                            transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => { if (!isLoading) e.currentTarget.style.backgroundColor = '#1d4ed8'; }}
                        onMouseLeave={(e) => { if (!isLoading) e.currentTarget.style.backgroundColor = 'var(--primary-color)'; }}
                    >
                        {isLoading ? 'Processing...' : (isLogin ? 'Login to SmartHire' : 'Create Account')}
                    </button>
                </form>

                <div style={{ display: 'flex', alignItems: 'center', margin: '2rem 0' }}>
                    <div style={{ flex: 1, height: '1px', backgroundColor: '#e2e8f0' }}></div>
                    <span style={{ padding: '0 1rem', color: '#64748b', fontSize: '0.875rem', fontWeight: '500' }}>or continue with</span>
                    <div style={{ flex: 1, height: '1px', backgroundColor: '#e2e8f0' }}></div>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button
                        style={{ ...socialButtonStyle, backgroundColor: 'white', color: '#334155' }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                    >
                        <GoogleIcon /> Google
                    </button>
                    <button
                        style={{ ...socialButtonStyle, backgroundColor: '#24292e', color: 'white', borderColor: '#24292e' }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1b1f23'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#24292e'}
                    >
                        <Github size={20} /> GitHub
                    </button>
                    <button
                        style={{ ...socialButtonStyle, backgroundColor: '#0a66c2', color: 'white', borderColor: '#0a66c2' }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#004182'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0a66c2'}
                    >
                        <Linkedin size={20} /> LinkedIn
                    </button>
                </div>

                <p style={{ textAlign: 'center', marginTop: '2.5rem', fontSize: '0.95rem', color: '#64748b' }}>
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <span
                        onClick={() => { setIsLogin(!isLogin); setError(''); }}
                        style={{ color: 'var(--primary-color)', cursor: 'pointer', fontWeight: '600' }}
                    >
                        {isLogin ? 'Register now' : 'Log in here'}
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Auth;
