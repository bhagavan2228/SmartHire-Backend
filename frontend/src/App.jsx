import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './pages/Auth';
import RecruiterDashboard from './pages/RecruiterDashboard';
import ManageApplicants from './pages/ManageApplicants';
import RecruiterJobs from './pages/RecruiterJobs';
import PostJob from './pages/PostJob';
import RecruiterInterviews from './pages/RecruiterInterviews';
import RecruiterSettings from './pages/RecruiterSettings';
import BrowseJobs from './pages/BrowseJobs';
import MyApplications from './pages/MyApplications';
import { WebSocketProvider } from './context/WebSocketContext';

const PrivateRoute = ({ children, allowedRole }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && role !== allowedRole && role !== 'ADMIN') {
    // If not allowed, redirect to their default dashboard
    return <Navigate to={role === 'REC' ? '/recruiter' : '/candidate'} replace />;
  }

  return children;
};

function App() {
  return (
    <WebSocketProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Auth />} />

          {/* Recruiter Routes */}
          <Route path="/recruiter" element={
            <PrivateRoute allowedRole="REC">
              <RecruiterDashboard />
            </PrivateRoute>
          } />
          <Route path="/recruiter/applicants" element={
            <PrivateRoute allowedRole="REC">
              <ManageApplicants />
            </PrivateRoute>
          } />
          <Route path="/recruiter/manage-jobs" element={
            <PrivateRoute allowedRole="REC">
              <RecruiterJobs />
            </PrivateRoute>
          } />
          <Route path="/recruiter/post-job" element={
            <PrivateRoute allowedRole="REC">
              <PostJob />
            </PrivateRoute>
          } />
          <Route path="/recruiter/interviews" element={
            <PrivateRoute allowedRole="REC">
              <RecruiterInterviews />
            </PrivateRoute>
          } />
          <Route path="/recruiter/settings" element={
            <PrivateRoute allowedRole="REC">
              <RecruiterSettings />
            </PrivateRoute>
          } />

          {/* Candidate Routes */}
          <Route path="/candidate" element={
            <PrivateRoute allowedRole="USER">
              <BrowseJobs />
            </PrivateRoute>
          } />
          <Route path="/candidate/applications" element={
            <PrivateRoute allowedRole="USER">
              <MyApplications />
            </PrivateRoute>
          } />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </WebSocketProvider>
  );
}

export default App;
