import React, { useState } from 'react';
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
  Plus,
  HelpCircle,
  MoreHorizontal,
  CheckCircle2,
  Clock,
  IndianRupee,
  X
} from 'lucide-react';

const PipelinePage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const [pipelineData, setPipelineData] = useState([
    {
      id: "col-1",
      title: "NEW",
      count: 3,
      cards: [
        { id: 1, label: "INBOUND", name: "Manoj Gupta", subtitle: "Residential Property Inquiry", value: "85,000", avatar: "https://randomuser.me/api/portraits/men/1.jpg" },
        { id: 2, label: "LEAD", name: "Ananya Sharma", subtitle: "Corporate Office Lease", value: "1,20,000", status: "Overdue", statusColor: "#ef4444" }
      ]
    },
    {
      id: "col-2",
      title: "CONTACTED",
      count: 2,
      cards: [
        { id: 3, label: "WHATSAPP", name: "Vikram Seth", subtitle: "Investment Consultation", value: "45,000", meta: "2" },
        { id: 4, label: "CALL SCHEDULED", name: "Priya Nair", subtitle: "Villa Renovation Package", value: "2,10,000", avatar: "https://randomuser.me/api/portraits/women/2.jpg" }
      ]
    },
    {
      id: "col-3",
      title: "INTERESTED",
      count: 1,
      cards: [
        { id: 5, label: "HIGH INTENT", name: "Rajesh Malhotra", subtitle: "Penthouse Site Visit Done", value: "5,50,000", metaText: "Waiting on KYC" }
      ]
    },
    {
      id: "col-4",
      title: "CLOSED",
      count: 4,
      cards: [
        { id: 6, label: "WON", name: "Deepak Verma", subtitle: "Retail Space Lease", value: "90,000", completed: true },
        { id: 7, label: "WON", name: "Sunita Kapoor", subtitle: "Interior Design Lead", value: "1,75,000", completed: true }
      ]
    }
  ]);

  return (
    <div className="dashboard-container">
      {/* Sidebar - Shared Design */}
      <aside className="sidebar">
        <div className="sidebar-logo">SyncSetu</div>
        <nav className="sidebar-nav">
          <a onClick={() => navigate('/dashboard')} className="nav-item cursor-pointer">
            <LayoutGrid size={18} /> Dashboard
          </a>
          <a className="nav-item active cursor-pointer">
            <TrendingUp size={18} /> Pipeline
          </a>
          <a className="nav-item cursor-pointer">
            <BookUser size={18} /> Contacts
          </a>
          <a className="nav-item cursor-pointer">
            <Inbox size={18} /> Inbox
          </a>
          <a className="nav-item cursor-pointer">
            <BellRing size={18} /> Follow-ups
          </a>
          <a className="nav-item cursor-pointer">
            <Users size={18} /> Team
          </a>
          <a className="nav-item cursor-pointer">
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

      {/* Main Content Area */}
      <main className="main-content pipeline-content-wrapper">
        <header className="pipeline-header">
          <div className="header-left">
            <h1 className="page-title">Pipeline Overview</h1>
            <div className="pipeline-search-bar">
              <Search size={18} className="search-icon" />
              <input 
                type="text" 
                placeholder="Search deals..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="header-right">
            <button className="icon-btn"><Bell size={20} /></button>
            <div className="forecast-display">
              <span className="label">Forecast</span>
              <span className="amount">₹ 4,28,000</span>
            </div>
          </div>
        </header>

        {/* Scrollable Board */}
        <div className="pipeline-scroll-area">
          <motion.div 
            className="pipeline-board-layout"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {pipelineData.map((column, colIdx) => (
              <motion.div 
                key={column.id} 
                className="kanban-column"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: colIdx * 0.1 }}
              >
                <div className="column-header">
                  <div className="title-box">
                    <div className="status-dot"></div>
                    <h3>{column.title}</h3>
                    <span className="count-pill">{column.count}</span>
                  </div>
                  <Plus size={18} className="add-deal-icon" />
                </div>

                <div className="column-cards-list">
                  <AnimatePresence>
                    {column.cards.map((card, cardIdx) => (
                      <motion.div 
                        key={card.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="pipeline-card"
                      >
                        <div className="card-top">
                          <span className={`card-label label-${card.label.toLowerCase().replace(/\s+/g, '-')}`}>
                            {card.label}
                          </span>
                          <MoreHorizontal size={14} className="more-btn" />
                        </div>
                        <h4 className="card-person">{card.name}</h4>
                        <p className="card-desc">{card.subtitle}</p>
                        
                        <div className="card-bottom">
                          <div className="card-price">
                            <IndianRupee size={12} />
                            <span>{card.value}</span>
                          </div>
                          <div className="card-icons">
                            {card.avatar && <img src={card.avatar} className="avatar-mini" alt="contact" />}
                            {card.meta && <span className="meta-badge"><Users size={12} /> {card.meta}</span>}
                            {card.status && <span className="status-badge red"><Clock size={12} /> {card.status}</span>}
                            {card.metaText && <span className="meta-text">{card.metaText}</span>}
                            {card.completed && <CheckCircle2 size={16} className="won-icon" />}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom Widgets - Fixed to Bottom */}
        <footer className="pipeline-footer-stats">
          <div className="stats-card win-rate">
            <div className="stats-label">WIN RATE</div>
            <div className="stats-main">
              <h2>68%</h2>
              <div className="progress-ring">
                <svg width="40" height="40">
                  <circle cx="20" cy="20" r="16" stroke="#e2ece8" strokeWidth="4" fill="none" />
                  <circle cx="20" cy="20" r="16" stroke="#125143" strokeWidth="4" fill="none" 
                          strokeDasharray="100.5" strokeDashoffset={100.5 - (100.5 * 0.68)} strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </div>

          <div className="stats-card momentum-banner">
            <div className="banner-text">
              <h3>Weekly Momentum</h3>
              <p>You have 4 deals approaching the closing date this week.</p>
            </div>
            <button className="schedule-btn">View Schedule</button>
          </div>
        </footer >

        <button className="global-fab">
          <Plus size={28} />
        </button>
      </main>
    </div>
  );
};

export default PipelinePage;
