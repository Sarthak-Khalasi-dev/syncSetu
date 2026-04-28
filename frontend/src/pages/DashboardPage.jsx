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
  BellOff
} from 'lucide-react';

import { useState, useEffect, useRef } from 'react';
import EmojiPicker from 'emoji-picker-react';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
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
  };

  const onEmojiClick = (emojiObject) => {
    setInputText(prev => prev + emojiObject.emoji);
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo">
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
        {/* Top Header */}
        <header className="dashboard-header">
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
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              >
                <Bell size={20} />
                {notifications.length > 0 && <span className="notification-dot"></span>}
              </button>
              
              <AnimatePresence>
                {isNotificationOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="notification-dropdown"
                  >
                    <div className="dropdown-header">
                      <h3>Notifications</h3>
                      <button onClick={() => setIsNotificationOpen(false)}><X size={16} /></button>
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
                          <div key={notif.id} className="notification-item">
                            {notif.text}
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

        {/* Dashboard Overview */}
        <div className="dashboard-content">
          <div className="overview-header">
            <p className="subtitle">DASHBOARD OVERVIEW</p>
            <h1><span className="name">Namaste, Alex.</span> <span className="greeting-text">You have 4 follow-ups scheduled for today.</span></h1>
          </div>

          {/* KPI Cards */}
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

          {/* Bottom Section */}
          <div className="dashboard-bottom">
            {/* Recent Leads */}
            <div className="recent-leads dashboard-card">
              <div className="section-header">
                <h2>Recent Leads</h2>
                <a href="#" className="view-all-btn">View All Pipeline</a>
              </div>
              <div className="lead-list">
                <AnimatePresence>
                  {leads.map((lead) => (
                    <motion.div 
                      key={lead.id}
                      initial={{ x: -20, opacity: 0 }} 
                      animate={{ x: 0, opacity: 1 }} 
                      exit={{ x: 20, opacity: 0 }}
                      className="lead-card"
                    >
                      <img src={lead.avatar} alt={lead.name} className="lead-avatar" />
                      <div className="lead-info">
                        <h4>{lead.name}</h4>
                        <p>{lead.company}</p>
                      </div>
                      <div className="lead-meta">
                        <span className={`badge badge-${lead.badgeType}`}>{lead.badge}</span>
                        <span className="time">{lead.time}</span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <div className="growth-watermark">
                <h2>Growth happens<br />here.</h2>
                <p>ADD 12 MORE LEADS TO HIT YOUR QUARTERLY TARGET</p>
              </div>
            </div>

            {/* Quick Thread */}
            <div className="quick-thread dashboard-card">
              <div className="section-header">
                <h2>Quick Thread</h2>
                <div className="status"><span className="dot"></span> Active Now</div>
              </div>
              <div className="chat-window">
                <AnimatePresence>
                  {messages.map((msg) => (
                    <motion.div 
                      key={msg.id}
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ scale: 0.95, opacity: 0 }}
                      className={`thread-message ${msg.type}`}
                    >
                      <div className="bubble-wrapper">
                        <div className="bubble">
                          {msg.text}
                        </div>
                        <button 
                          className="msg-delete-btn" 
                          onClick={() => handleDeleteMessage(msg.id)}
                          title="Delete message"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                      <div className={`sender ${msg.type === 'sent' ? 'sent-sender' : ''}`}>
                        {msg.sender} • {msg.time}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                <div ref={chatEndRef} />
              </div>

              <form className="chat-input-area" onSubmit={handleSendMessage}>
                <div className="input-wrapper">
                  <input 
                    type="text" 
                    placeholder="Type a message..." 
                    className="chat-input" 
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                  />
                  <div className="emoji-trigger-container" ref={emojiPickerRef}>
                    <Smile 
                      size={20} 
                      className="emoji-icon" 
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)} 
                    />
                    {showEmojiPicker && (
                      <div className="emoji-picker-popup">
                        <EmojiPicker 
                          onEmojiClick={onEmojiClick} 
                          autoFocusSearch={false}
                          theme="light"
                          width={300}
                          height={400}
                        />
                      </div>
                    )}
                  </div>
                </div>
                <button type="submit" className="btn-send" disabled={!inputText.trim()}>
                  <Send size={18} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* Add Lead Modal */}
      <AnimatePresence>
        {isAddLeadOpen && (
          <div className="modal-overlay">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="modal-content"
            >
              <div className="modal-header">
                <h2>Add New Lead</h2>
                <button onClick={() => setIsAddLeadOpen(false)} className="close-btn"><X size={20} /></button>
              </div>
              <form onSubmit={handleAddLead} className="add-lead-form">
                <div className="form-group">
                  <label>Full Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. John Doe"
                    value={newLead.name}
                    onChange={(e) => setNewLead({...newLead, name: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Company / Role</label>
                  <input 
                    type="text" 
                    placeholder="e.g. CEO at SyncSetu"
                    value={newLead.company}
                    onChange={(e) => setNewLead({...newLead, company: e.target.value})}
                    required
                  />
                </div>
                <div className="modal-footer">
                  <button type="button" onClick={() => setIsAddLeadOpen(false)} className="btn-cancel">Cancel</button>
                  <button type="submit" className="btn-save">Add Lead</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashboardPage;
