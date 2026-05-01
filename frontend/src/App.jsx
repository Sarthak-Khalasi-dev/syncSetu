import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
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
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.split('/')[1];
    if (path) {
      const pageName = path.charAt(0).toUpperCase() + path.slice(1);
      document.title = `SyncSetu | ${pageName}`;
    } else {
      document.title = "SyncSetu | Login";
    }
  }, [location]);

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
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'system');

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    const applyTheme = (currentTheme) => {
      if (currentTheme === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        root.classList.add(systemTheme);
      } else {
        root.classList.add(currentTheme);
      }
    };

    applyTheme(theme);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') {
        applyTheme('system');
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  // Expose theme setter to window so SettingsPage can update it without a complex Context setup
  // Or better, just dispatch a custom event that SettingsPage can use or trigger.
  useEffect(() => {
    const handleThemeChange = (e) => setTheme(e.detail);
    window.addEventListener('themeChange', handleThemeChange);
    return () => window.removeEventListener('themeChange', handleThemeChange);
  }, []);

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
