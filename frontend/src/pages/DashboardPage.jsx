import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  LayoutGrid,
  TrendingUp,
  BookUser,
  Inbox,
  BellRing,
  Users,
  Settings,
  Search,
  Bell,
  IndianRupee,
  UserPlus,
  CheckCircle,
  ArrowUpRight,
  Plus,
  HelpCircle,
  Send,
  Smile,
  Trash2,
  MoreVertical,
  X,
  BellOff,
  User,
  Zap,
  Clock
} from 'lucide-react';

import { useState, useEffect, useRef } from 'react';
import EmojiPicker from 'emoji-picker-react';
import logo from '../assets/logo.png';

const DashboardPage = () => {
  const navigate = useNavigate();
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
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isAddLeadOpen, setIsAddLeadOpen] = useState(false);
  
  const [leads, setLeads] = useState([
    {
      id: 1,
      name: "Rajesh Deshmukh",
      company: "Managing Director, Tech-Hind Solutions",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      badge: "NEW",
      badgeType: "green",
      time: "Updated 2h ago"
    },
    {
      id: 2,
      name: "Ananya Kapoor",
      company: "Creative Lead, Urban Studio Mumbai",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      badge: "FOLLOW-UP",
      badgeType: "blue",
      time: "Updated 5h ago"
    }
  ]);

  const [newLead, setNewLead] = useState({ name: "", company: "" });
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi Alex, reviewed the proposal for the South Mumbai project. Can we discuss the timeline tomorrow morning?",
      sender: "ANANYA KAPOOR",
      time: "09:42 AM",
      type: "received"
    },
    {
      id: 2,
      text: "Absolutely, Ananya. I have a slot at 10:30 AM IST. Does that work for you? I've updated the latest milestones.",
      sender: "ALEX STERLING",
      time: "10:15 AM",
      type: "sent"
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const chatEndRef = useRef(null);
  const emojiPickerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputText,
      sender: "ALEX STERLING",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: "sent"
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText("");
  };

  const handleDeleteMessage = (id) => {
    setMessages(prev => prev.filter(m => m.id !== id));
  };

  const handleAddLead = (e) => {
    e.preventDefault();
    if (!newLead.name || !newLead.company) return;

    const lead = {
      id: Date.now(),
      name: newLead.name,
      company: newLead.company,
      avatar: `https://avatar.iran.liara.run/public/${Math.floor(Math.random() * 50)}`,
      badge: "NEW",
      badgeType: "green",
      time: "Just now"
    };

    setLeads([lead, ...leads]);
    setNewLead({ name: "", company: "" });
    setIsAddLeadOpen(false);

    // Mock notification for adding lead
    const newNotif = {
      id: Date.now(),
      title: "Lead Created",
      desc: `${newLead.name} was successfully added to your list.`,
      time: "Just now",
      type: "lead",
      unread: true
    };
    setNotifications([newNotif, ...notifications]);
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, unread: false } : n));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const onEmojiClick = (emojiObject) => {
    setInputText(prev => prev + emojiObject.emoji);
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <div className="dashboard-container" onClick={() => setIsNotificationOpen(false)}>
      {/* Sidebar */}
      <aside className="sidebar" onClick={(e) => e.stopPropagation()}>
        <div className="sidebar-logo">
          <img src={logo} alt="SyncSetu Logo" className="brand-logo-img" />
          SyncSetu
        </div>
        <nav className="sidebar-nav">
          <a href="#" className="nav-item active">
            <LayoutGrid size={18} /> Dashboard
          </a>
          <a onClick={() => navigate('/pipeline')} className="nav-item cursor-pointer">
            <TrendingUp size={18} /> Pipeline
          </a>
          <a href="#" className="nav-item">
            <BookUser size={18} /> Contacts
          </a>
          <a href="#" className="nav-item">
            <Inbox size={18} /> Inbox
          </a>
          <a href="#" className="nav-item">
            <BellRing size={18} /> Follow-ups
          </a>
          <a href="#" className="nav-item">
            <Users size={18} /> Team
          </a>
          <a href="#" className="nav-item">
            <Settings size={18} /> Settings
          </a>
        </nav>

        <div className="sidebar-bottom">
          <button className="btn-new-message">
            <Plus size={18} /> New Message
          </button>
          <a href="#" className="nav-item nav-item-support">
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

      {/* Main Content */}
      <main className="main-content">
        <header className="dashboard-header" onClick={(e) => e.stopPropagation()}>
          <div className="header-left">
            <h2 className="mobile-logo">SyncSetu</h2>
          </div>
          <div className="header-search">
            <Search size={18} className="search-icon" />
            <input type="text" placeholder="Search relationships..." className="search-input" />
          </div>
          <div className="header-actions">
            <div className="notification-wrapper">
              <button 
                className={`icon-btn ${isNotificationOpen ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
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
                        <button className="clear-all-btn" onClick={clearAllNotifications}>Clear all</button>
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
            <button className="icon-btn"><Search size={20} className="mobile-search-icon" /></button>
            <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="User Profile" className="user-avatar" />
          </div>
        </header>

        <div className="dashboard-content">
          <div className="overview-header">
            <p className="subtitle">DASHBOARD OVERVIEW</p>
            <h1><span className="name">Namaste, Alex.</span> <span className="greeting-text">You have 4 follow-ups scheduled for today.</span></h1>
          </div>

          <div className="kpi-grid">
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="kpi-card outline-card border-green">
              <div className="kpi-header">
                <h3>PROJECTED REVENUE</h3>
                <IndianRupee size={18} className="kpi-icon text-teal" />
              </div>
              <div className="kpi-body">
                <h2>₹12.4M</h2>
                <div className="trend text-teal">
                  <ArrowUpRight size={14} /> +14.2% this month
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ y: 20, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              transition={{ delay: 0.2 }} 
              className="kpi-card outline-card cursor-pointer"
              onClick={() => setIsAddLeadOpen(true)}
            >
              <div className="kpi-header">
                <h3>NEW LEADS</h3>
                <UserPlus size={18} className="kpi-icon text-slate" />
              </div>
              <div className="kpi-body">
                <h2>{leads.length}</h2>
                <div className="kpi-desc">
                  + Add New Lead
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="kpi-card blue-card">
              <div className="kpi-header">
                <h3>WIN RATE</h3>
                <CheckCircle size={18} className="kpi-icon" />
              </div>
              <div className="kpi-body">
                <h2>64%</h2>
                <div className="progress-bar-container">
                  <div className="progress-bar-fill" style={{ width: '64%' }}></div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="main-grid">
            <div className="recent-leads-section">
              <div className="section-header">
                <h2>Recent Leads</h2>
                <button className="view-all">View All Relationships</button>
              </div>
              <div className="leads-list">
                {leads.map((lead, index) => (
                  <motion.div 
                    key={lead.id} 
                    initial={{ x: -20, opacity: 0 }} 
                    animate={{ x: 0, opacity: 1 }} 
                    transition={{ delay: 0.4 + (index * 0.1) }}
                    className="lead-item"
                  >
                    <img src={lead.avatar} alt={lead.name} className="lead-avatar" />
                    <div className="lead-info">
                      <div className="lead-name-row">
                        <h3>{lead.name}</h3>
                        <span className={`badge badge-${lead.badgeType}`}>{lead.badge}</span>
                      </div>
                      <p className="lead-company">{lead.company}</p>
                      <span className="lead-time">{lead.time}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="chat-section outline-card">
              <div className="chat-header">
                <div className="chat-user">
                  <div className="online-indicator"></div>
                  <h2>Ananya Kapoor</h2>
                </div>
                <div className="chat-actions">
                  <Search size={18} className="cursor-pointer" />
                  <MoreVertical size={18} className="cursor-pointer" />
                </div>
              </div>
              
              <div className="chat-messages">
                {messages.map((msg) => (
                  <div key={msg.id} className={`message-wrapper ${msg.type}`}>
                    <div className="message-content">
                       {msg.type === 'sent' && (
                         <div className="message-actions-hover">
                           <Trash2 size={14} onClick={() => handleDeleteMessage(msg.id)} />
                         </div>
                       )}
                       <p>{msg.text}</p>
                       <span className="message-time">{msg.time}</span>
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>

              <form className="chat-input-area" onSubmit={handleSendMessage}>
                <div className="input-wrapper">
                  <div className="emoji-trigger" ref={emojiPickerRef}>
                    <Smile size={20} className="cursor-pointer" onClick={() => setShowEmojiPicker(!showEmojiPicker)} />
                    {showEmojiPicker && (
                      <div className="emoji-picker-container">
                        <EmojiPicker onEmojiClick={onEmojiClick} autoFocusSearch={false} />
                      </div>
                    )}
                  </div>
                  <input 
                    type="text" 
                    placeholder="Type your message..." 
                    className="message-input"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                  />
                  <button type="submit" className="send-btn">
                    <Send size={18} />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Add Lead Modal */}
        <AnimatePresence>
          {isAddLeadOpen && (
            <div className="modal-overlay" onClick={() => setIsAddLeadOpen(false)}>
              <motion.div 
                className="modal-content"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="modal-header">
                  <h2>Create New Lead</h2>
                  <button onClick={() => setIsAddLeadOpen(false)} className="close-btn">
                    <X size={24} />
                  </button>
                </div>
                <form onSubmit={handleAddLead} className="add-lead-form">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Rahul Sharma"
                      value={newLead.name}
                      onChange={(e) => setNewLead({...newLead, name: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Company / Role</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Director at ABC Corp"
                      value={newLead.company}
                      onChange={(e) => setNewLead({...newLead, company: e.target.value})}
                      required
                    />
                  </div>
                  <div className="modal-footer">
                    <button type="button" onClick={() => setIsAddLeadOpen(false)} className="btn-cancel">Cancel</button>
                    <button type="submit" className="btn-save">Add Relationship</button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <div className="growth-watermark">
          <h2>GROWTH</h2>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
