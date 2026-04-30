import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutGrid,
  TrendingUp,
  BookUser,
  Inbox,
  BellRing,
  Users,
  Settings,
  HelpCircle,
  ChevronRight,
  Plus
} from 'lucide-react';

const Sidebar = () => {
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
    <aside className="sidebar-syncsetu">
      <div className="sidebar-brand">
        <motion.h1 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="brand-name"
        >
          SyncSetu
        </motion.h1>
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

      <div className="sidebar-action-container">
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="btn-new-message-v2"
        >
          <Plus size={20} />
          <span>New Message</span>
        </motion.button>
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
              onClick={() => navigate(item.path)}
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
        <div className="nav-item-v2 help-support">
          <HelpCircle size={20} className="nav-icon" />
          <span className="nav-text">Help Support</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;



