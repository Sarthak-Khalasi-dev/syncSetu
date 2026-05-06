import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';
import { 
  Search, 
  Bell, 
  BellOff, 
  User, 
  Clock, 
  Zap,
  SlidersHorizontal,
  Menu
} from 'lucide-react';
import FilterDropdown from './FilterDropdown';

const TopHeader = ({ 
  title, 
  searchPlaceholder = "Search...", 
  searchQuery, 
  onSearchChange,
  showFilter = false,
  onFilterChange = () => {},
  activeFilter = 'ALL',
  filterOptions = []
}) => {
  const { toggleSidebar } = useOutletContext() || {};
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New Lead Assigned",
      desc: "Manoj Gupta has been assigned to your pipeline.",
      time: "2 mins ago",
      type: "lead",
      unread: true
    },
    {
      id: 2,
      title: "Task Reminder",
      desc: "Follow up with Ananya Kapoor regarding the site visit.",
      time: "1 hour ago",
      type: "task",
      unread: true
    },
    {
      id: 3,
      title: "Deal Won! 🎉",
      desc: "Deepak Verma just closed a ₹90,000 deal.",
      time: "3 hours ago",
      type: "success",
      unread: false
    }
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, unread: false } : n));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <header className="dashboard-header" onClick={(e) => {
      e.stopPropagation();
      setIsFilterOpen(false);
      setIsNotificationOpen(false);
    }}>
      <div className="header-left">
        <button className="mobile-menu-toggle" onClick={toggleSidebar}>
          <Menu size={24} />
        </button>
        <h1 className={title === "Contacts" ? "page-title-bold" : "page-title"}>{title}</h1>
      </div>
      
      <div className={`header-search ${title === "Contacts" ? "main-search" : ""}`}>
        <Search size={18} className="search-icon" />
        <input 
          type="text" 
          placeholder={searchPlaceholder} 
          className="search-input"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="header-actions">
        <div className="notification-wrapper">
          <button 
            className={`icon-btn ${isNotificationOpen ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              setIsFilterOpen(false);
              setIsNotificationOpen(!isNotificationOpen);
            }}
          >
            <Bell size={20} />
            {unreadCount > 0 && <span className="notification-dot"></span>}
          </button>
          
          <AnimatePresence>
            {isNotificationOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 15, scale: 0.95 }}
                className="notification-dropdown"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="dropdown-header">
                  <h3>Notifications</h3>
                  {notifications.length > 0 && (
                    <button className="clear-all-btn" onClick={clearAll}>Clear all</button>
                  )}
                </div>
                <div className="dropdown-body">
                  {notifications.length === 0 ? (
                    <div className="empty-state">
                      <BellOff size={32} />
                      <p>No notifications yet</p>
                      <span>We'll let you know when something happens!</span>
                    </div>
                  ) : (
                    notifications.map(notif => (
                      <div 
                        key={notif.id} 
                        className="notification-item" 
                        onClick={() => markAsRead(notif.id)}
                      >
                        <div className={`notif-icon ${
                          notif.type === 'lead' ? 'bg-teal-light' : 
                          notif.type === 'task' ? 'bg-slate-light' : 'bg-green-light'
                        }`}>
                          {notif.type === 'lead' ? <User size={18} className="text-teal" /> :
                           notif.type === 'task' ? <Clock size={18} className="text-slate" /> :
                           <Zap size={18} className="text-green" />}
                        </div>
                        <div className="notif-content">
                          <span className="notif-title">{notif.title}</span>
                          <span className="notif-desc">{notif.desc}</span>
                          <span className="notif-time">{notif.time}</span>
                        </div>
                        {notif.unread && <div className="unread-glow"></div>}
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {showFilter && (
          <div className="filter-wrapper" style={{ position: 'relative' }}>
            <button 
              className={`btn-filter ${isFilterOpen ? 'active' : ''}`} 
              onClick={(e) => {
                e.stopPropagation();
                setIsNotificationOpen(false);
                setIsFilterOpen(!isFilterOpen);
              }}
            >
              <SlidersHorizontal size={16} /> Filter
              {activeFilter !== 'ALL' && <span className="filter-badge">!</span>}
            </button>
            <FilterDropdown 
              isOpen={isFilterOpen} 
              onClose={() => setIsFilterOpen(false)}
              activeFilter={activeFilter}
              onFilterChange={onFilterChange}
              options={filterOptions}
            />
          </div>
        )}

      </div>
    </header>
  );
};

export default TopHeader;
