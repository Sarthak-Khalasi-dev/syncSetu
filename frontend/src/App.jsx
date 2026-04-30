import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import PipelinePage from './pages/PipelinePage';
import ContactsPage from './pages/ContactsPage';
import InboxPage from './pages/InboxPage';
import FollowUpsPage from './pages/FollowUpsPage';
import TeamPage from './pages/TeamPage';
import SettingsPage from './pages/SettingsPage';
import ComingSoonPage from './pages/ComingSoonPage';
import Sidebar from './components/Sidebar';
import './index.css';

// Layout component to keep Sidebar persistent
const MainLayout = () => {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content-wrapper">
        <Outlet />
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        {/* Protected Routes with persistent Sidebar */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/pipeline" element={<PipelinePage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/inbox" element={<InboxPage />} />
          <Route path="/follow-ups" element={<FollowUpsPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/help" element={<ComingSoonPage title="Help" />} />
        </Route>

        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
