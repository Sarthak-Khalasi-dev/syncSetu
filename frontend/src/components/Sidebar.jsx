import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';
import {
  LayoutGrid,
  TrendingUp,
  BookUser,
  Inbox,
  BellRing,
  Users,
  Settings,
  LogOut,
  ChevronRight,
  Plus
} from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', icon: LayoutGrid, path: '/dashboard' },
    { name: 'Pipeline', icon: TrendingUp, path: '/pipeline' },
    { name: 'Contacts', icon: BookUser, path: '/contacts' },
    { name: 'Inbox', icon: Inbox, path: '/inbox' },
    { name: 'Follow-ups', icon: BellRing, path: '/follow-ups' },
    { name: 'Team', icon: Users, path: '/team' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <aside className={`sidebar-syncsetu ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-brand">
        <div className="brand-logo-wrapper">
          <img src={logo} alt="SyncSetu Logo" className="brand-logo-img-v2" />
        </div>
        <motion.h1 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="brand-name"
        >
          SyncSetu
        </motion.h1>
        <button className="mobile-close-sidebar" onClick={onClose}>
          <Plus size={24} style={{ transform: 'rotate(45deg)' }} />
        </button>
      </div>

      <div className="sidebar-user-top">
        <div className="user-profile-simple">
          <div className="avatar-container-premium">
            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Alex Sterling" className="user-avatar" />
            <div className="pro-badge-mini">PRO</div>
          </div>
          <div className="user-info">
            <span className="user-name">Alex Sterling</span>
            <span className="user-account-type">Premium Account</span>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav-v2">
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => {
                navigate(item.path);
                onClose();
              }}
              className={`nav-item-v2 ${isActive ? 'active' : ''}`}
            >
              <item.icon size={20} className="nav-icon" />
              <span className="nav-text">{item.name}</span>
              {isActive && (
                <motion.div 
                  layoutId="activeIndicator"
                  className="active-dot-indicator"
                />
              )}
              {!isActive && <ChevronRight size={14} className="hover-arrow" />}
            </motion.div>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <div className="nav-item-v2 log-out-btn" onClick={() => {
          navigate('/');
          onClose();
        }}>
          <LogOut size={20} className="nav-icon" />
          <span className="nav-text">Log Out</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;



