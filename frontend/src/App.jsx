import React, { useEffect, useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';

import Sidebar from './components/Sidebar';
import ErrorBoundary from './components/ErrorBoundary';
import { pageView, initAnalytics } from './utils/analytics';
import { CallProvider } from './context/CallContext';
import GlobalCallOverlay from './components/GlobalCallOverlay';
import './index.css';

// Lazy load pages for performance optimization
const LoginPage = lazy(() => import('./pages/LoginPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const PipelinePage = lazy(() => import('./pages/PipelinePage'));
const ContactsPage = lazy(() => import('./pages/ContactsPage'));
const InboxPage = lazy(() => import('./pages/InboxPage'));
const FollowUpsPage = lazy(() => import('./pages/FollowUpsPage'));
const TeamPage = lazy(() => import('./pages/TeamPage'));
const SettingsPage = lazy(() => import('./pages/SettingsPage'));
const ComingSoonPage = lazy(() => import('./pages/ComingSoonPage'));

// Protected Route Guard
const ProtectedRoute = () => {
  const token = localStorage.getItem('token'); // In real app, verify token validity
  
  // For demo purposes, we will allow bypass if token is mock-token or if the user just logged in.
  // We can just rely on state or localStorage. If missing, redirect.
  // if (!token) {
  //   return <Navigate to="/login" replace />;
  // }
  
  return <Outlet />;
};

// Layout component to keep Sidebar persistent
const MainLayout = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const path = location.pathname.split('/')[1];
    if (path) {
      const pageName = path.charAt(0).toUpperCase() + path.slice(1);
      document.title = `SyncSetu | ${pageName}`;
    } else {
      document.title = "SyncSetu | Login";
    }
    pageView(location.pathname);
    // Close sidebar on navigation on mobile
    setIsSidebarOpen(false);
  }, [location]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className={`app-layout ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      {isSidebarOpen && <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)}></div>}
      <div className="main-content-wrapper">
        <Suspense fallback={<div className="flex items-center justify-center h-full"><div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div></div>}>
          <Outlet context={{ toggleSidebar }} />
        </Suspense>
      </div>
    </div>
  );
};

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'system');

  useEffect(() => {
    initAnalytics('G-XXXXXXX'); // Initialize analytics on mount
  }, []);

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

  useEffect(() => {
    const handleThemeChange = (e) => setTheme(e.detail);
    window.addEventListener('themeChange', handleThemeChange);
    return () => window.removeEventListener('themeChange', handleThemeChange);
  }, []);

  return (
    <HelmetProvider>
      <CallProvider>
        <ErrorBoundary>
          <Router>
            <Toaster position="top-right" toastOptions={{
              style: { background: '#333', color: '#fff', borderRadius: '8px' }
            }} />
            <GlobalCallOverlay />
            <Routes>
            <Route path="/login" element={
              <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div></div>}>
                <LoginPage />
              </Suspense>
            } />
            
            {/* Protected Routes with persistent Sidebar */}
            <Route element={<ProtectedRoute />}>
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
            </Route>

            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </Router>
      </ErrorBoundary>
      </CallProvider>
    </HelmetProvider>
  );
}

export default App;
