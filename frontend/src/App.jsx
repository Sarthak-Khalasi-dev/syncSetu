import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import PipelinePage from './pages/PipelinePage';
import ContactsPage from './pages/ContactsPage';
import InboxPage from './pages/InboxPage';
import ComingSoonPage from './pages/ComingSoonPage';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/pipeline" element={<PipelinePage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/inbox" element={<InboxPage />} />
        <Route path="/follow-ups" element={<ComingSoonPage title="Follow-ups" />} />
        <Route path="/team" element={<ComingSoonPage title="Team" />} />
        <Route path="/settings" element={<ComingSoonPage title="Settings" />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
