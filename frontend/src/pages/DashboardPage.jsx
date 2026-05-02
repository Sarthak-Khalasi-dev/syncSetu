import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  IndianRupee,
  UserPlus,
  CheckCircle,
  ArrowUpRight,
  Plus,
  Send,
  Smile,
  Trash2,
  MoreVertical,
  Search
} from 'lucide-react';

import { useState, useEffect, useRef } from 'react';
import EmojiPicker from 'emoji-picker-react';
import Sidebar from '../components/Sidebar';
import TopHeader from '../components/TopHeader';
import AddContactModal from '../components/AddContactModal';
import SEO from '../components/SEO';
import api from '../services/api';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [isAddLeadOpen, setIsAddLeadOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const [leads, setLeads] = useState([]);
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
  const [contactCount, setContactCount] = useState(0);
  const chatEndRef = useRef(null);
  const isFirstRender = useRef(true);
  const emojiPickerRef = useRef(null);

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [leadsRes, contactsRes] = await Promise.all([
          api.get('/leads'),
          api.get('/contacts')
        ]);
        setLeads(leadsRes.data.data);
        setContactCount(contactsRes.data.count);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      }
    };
    fetchData();
  }, []);

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
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
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

  const handleAddContact = async (formData) => {
    try {
      const newLead = {
        name: formData.name,
        company: formData.business || "New Relationship",
        time: "Just now",
        status: 'New'
      };

      const res = await api.post('/leads', newLead);
      setLeads(prev => [res.data.data, ...prev]);
      setIsAddLeadOpen(false);
    } catch (err) {
      console.error('Error adding lead:', err);
    }
  };

  const onEmojiClick = (emojiObject) => {
    setInputText(prev => prev + emojiObject.emoji);
  };

  const filteredLeads = leads.filter(lead => 
    lead.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    lead.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="page-content-wrapper">
      <SEO title="Dashboard" description="SyncSetu CRM Dashboard" />
      {/* Main Content */}
      <main className="main-content">
        <TopHeader 
          title="Dashboard" 
          searchPlaceholder="Search relationships..."
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <div className="dashboard-content">
          <div className="overview-header-v2">
            <span className="subtitle">DASHBOARD OVERVIEW</span>
            <h1><span className="name">Namaste, Alex.</span> <span className="greeting-text">You have 4 follow-ups scheduled for today.</span></h1>
          </div>

          <div className="kpi-grid">
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="premium-kpi-card border-green">
              <div className="kpi-header">
                <h3>TOTAL RELATIONSHIPS</h3>
                <UserPlus size={18} className="kpi-icon text-teal" />
              </div>
              <div className="kpi-body">
                <h2>{contactCount}</h2>
                <div className="trend text-teal">
                  <ArrowUpRight size={14} /> Real-time Sync
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ y: 20, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              transition={{ delay: 0.2 }} 
              className="premium-kpi-card cursor-pointer"
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

            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="premium-kpi-card blue-card">
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
                <button className="view-all" onClick={() => navigate('/contacts')}>View All Relationships</button>
              </div>
              <div className="leads-list">
                {filteredLeads.length === 0 ? (
                  <div className="empty-search-state">
                    <Search size={32} />
                    <p>No relationships found matching "{searchQuery}"</p>
                    <span>Try searching for a different name or company.</span>
                  </div>
                ) : (
                  filteredLeads.map((lead, index) => (
                    <motion.div 
                      key={lead._id || lead.id} 
                      initial={{ x: -20, opacity: 0 }} 
                      animate={{ x: 0, opacity: 1 }} 
                      transition={{ delay: 0.4 + (index * 0.1) }}
                      className="premium-lead-item"
                    >
                      <img src={lead.avatar || 'https://randomuser.me/api/portraits/lego/1.jpg'} alt={lead.name} className="lead-avatar" />
                      <div className="lead-info">
                        <div className="lead-name-row">
                          <h3>{lead.name}</h3>
                          <span className={`badge badge-${lead.badgeType || (lead.status === 'New' ? 'green' : 'blue')}`}>
                            {lead.badge || lead.status || 'NEW'}
                          </span>
                        </div>
                        <p className="lead-company">{lead.company}</p>
                        <span className="lead-time">{lead.time || 'Recently updated'}</span>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>

            <div className="chat-section premium-chat-section">
              <div className="chat-header">
                <div className="chat-user">
                  <div className="online-indicator"></div>
                  <h2>Ananya Kapoor</h2>
                </div>
                <div className="chat-actions">

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

        <AddContactModal 
          isOpen={isAddLeadOpen} 
          onClose={() => setIsAddLeadOpen(false)} 
          onAdd={handleAddContact}
        />

        <div className="growth-watermark">
          <h2>GROWTH</h2>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
