import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutGrid,
  TrendingUp,
  BookUser,
  Inbox,
  BellRing,
  Users,
  Settings,
  Plus,
  HelpCircle
} from 'lucide-react';
import logo from '../assets/logo.png';

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

  const handleSupport = () => {
    alert("Support window opening... (Mock)");
  };

  const handleNewMessage = () => {
    alert("Creating new message... (Mock)");
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo" onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer' }}>
        <img src={logo} alt="SyncSetu Logo" className="brand-logo-img" />
        SyncSetu
      </div>
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <a
            key={item.name}
            onClick={() => navigate(item.path)}
            className={`nav-item cursor-pointer ${location.pathname === item.path ? 'active' : ''}`}
          >
            <item.icon size={18} /> {item.name}
          </a>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <button className="btn-new-message" onClick={handleNewMessage}>
          <Plus size={18} /> New Message
        </button>
        <a onClick={handleSupport} className="nav-item nav-item-support cursor-pointer">
          <HelpCircle size={18} /> Help Support
        </a>
        <div className="user-profile-widget">
          <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Alex Sterling" className="widget-avatar" />
          <div className="widget-info">
            <div className="widget-name">Alex Sterling</div>
            <div className="widget-role">Premium Account</div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
