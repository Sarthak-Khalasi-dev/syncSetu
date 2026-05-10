import { motion } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  FileText, 
  MoreVertical, 
  Plus, 
  Search,
  Bell,
  Calendar,
  Filter,
  MessageSquare
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import TopHeader from '../components/TopHeader';
import { useState } from 'react';
import { useCall } from '../context/CallContext';

const FollowUpsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { startCall } = useCall();
  const overdueLarge = {
    name: "Rajesh Malhotra",
    status: "OVERDUE 2 DAYS",
    description: "Negotiation stalled on the Mumbai Terminal Project. Needs a personal check-in regarding the new environmental compliance clause.",
    avatars: ["https://randomuser.me/api/portraits/men/32.jpg", "https://randomuser.me/api/portraits/women/44.jpg", "https://randomuser.me/api/portraits/men/45.jpg"]
  };

  const overdueSmall = [
    {
      id: 1,
      name: "Ananya Iyer",
      type: "Email follow-up",
      snippet: "Proposal for Tech Hub Bangalore...",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
      icon: Mail,
      color: "#f56565"
    },
    {
      id: 2,
      name: "Kiran Gupta",
      type: "Contract Review",
      snippet: "Review legal feedback on GST...",
      icon: FileText,
      color: "#4299e1",
      isIcon: true
    }
  ];

  const focusCards = [
    {
      id: 1,
      name: "Vikram Singh",
      type: "WHATSAPP",
      snippet: "Confirm site visit for the Jaipur Heritage renovation. He prefers morning slots.",
      lastContact: "Last contact 4h ago",
      icon: MessageSquare,
      color: "#48bb78"
    },
    {
      id: 2,
      name: "Priya Sharma",
      type: "PREPARATION",
      snippet: "Gather portfolio samples for the textile export contract discussion at 4 PM.",
      time: "16:00 IST",
      icon: FileText,
      color: "#4299e1"
    },
    {
      id: 3,
      name: "Dev Adani",
      type: "NEW LEAD",
      snippet: "Initial discovery call. Inbound inquiry regarding cloud infrastructure for Delhi office.",
      tags: ["TECH", "HIGH-VALUE"],
      color: "#1b6855"
    }
  ];

  const upcoming = [
    {
      id: 1,
      name: "Sanjay Mehra",
      initials: "SM",
      description: "Quarterly performance review of logistics partner",
      day: "Tomorrow",
      time: "Aug 24, 11:30 AM",
      status: "SCHEDULED"
    },
    {
      id: 2,
      name: "Deepa Kulkarni",
      initials: "DK",
      description: "Send updated quotation for software licenses",
      day: "Monday",
      time: "Aug 26, 09:00 AM",
      status: "TO-DO"
    },
    {
      id: 3,
      name: "Rohan Parekh",
      initials: "RP",
      description: "Post-demo feedback follow-up call",
      day: "Monday",
      time: "Aug 26, 02:00 PM",
      status: "SCHEDULED"
    }
  ];

  return (
    <div className="page-content-wrapper">

      <main className="main-content follow-ups-layout">
        <TopHeader 
          title="Follow-ups" 
          searchPlaceholder="Search tasks or contacts..."
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <section className="follow-ups-content-scroll">
          <div className="section-intro">
            <h1 className="section-title">Overdue</h1>
            <p className="section-subtitle">Immediate attention required for these relationships.</p>
            <div className="critical-badge">3 CRITICAL</div>
          </div>

          <div className="overdue-grid">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="overdue-card-large premium-container"
            >
              <div className="card-tag overdue">OVERDUE 2 DAYS</div>
              <div className="card-header-row">
                <h2 className="card-name-large">{overdueLarge.name}</h2>
                <div className="call-icon-wrapper">
                  <Phone size={20} />
                </div>
              </div>
              <p className="card-desc">{overdueLarge.description}</p>
              <div className="card-footer-row">
                <div className="avatar-group">
                  {overdueLarge.avatars.map((av, i) => (
                    <img key={i} src={av} alt="Team" className="group-avatar" />
                  ))}
                  <div className="group-more">+2</div>
                </div>
                <button 
                  className="btn-call-now"
                  onClick={() => startCall({
                    name: overdueLarge.name,
                    avatar: overdueLarge.avatars[0]
                  }, 'voice')}
                >
                  Call Now
                </button>
              </div>
            </motion.div>

            <div className="overdue-column-small">
              {overdueSmall.map((item, index) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="overdue-card-small premium-container"
                >
                  <div className="small-card-avatar-section">
                    {item.avatar ? (
                      <img src={item.avatar} alt={item.name} className="small-card-avatar" />
                    ) : (
                      <div className="small-card-icon-placeholder" style={{ backgroundColor: '#ebf8ff' }}>
                        <item.icon size={20} style={{ color: item.color }} />
                      </div>
                    )}
                  </div>
                  <div className="small-card-info">
                    <span className="small-card-type" style={{ color: item.color }}>{item.type}</span>
                    <h3 className="small-card-name">{item.name}</h3>
                    <p className="small-card-snippet">{item.snippet}</p>
                  </div>
                  <Plus size={18} className="small-card-plus" />
                </motion.div>
              ))}
            </div>
          </div>

          <div className="section-divider-row">
            <h2 className="section-title">Today's Focus</h2>
            <div className="focus-actions">
              <Filter size={18} className="action-icon" />
              <Calendar size={18} className="action-icon" />
            </div>
          </div>

          <div className="focus-grid">
            {focusCards.map((card, index) => (
              <motion.div 
                key={card.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="focus-card premium-container"
              >
                <div className="focus-card-top">
                  <div className="focus-tag" style={{ color: card.color, backgroundColor: `${card.color}15` }}>
                    {card.type}
                  </div>
                  {card.icon && <card.icon size={20} className="focus-card-icon" />}
                </div>
                <h3 className="focus-card-name">{card.name}</h3>
                <p className="focus-card-snippet">{card.snippet}</p>
                
                <div className="focus-card-footer">
                  {card.lastContact && (
                    <div className="footer-status-pill">
                      <MessageSquare size={14} />
                      <span>{card.lastContact}</span>
                    </div>
                  )}
                  {card.time && (
                    <div className="footer-time-pill">
                      <Calendar size={14} />
                      <span>{card.time}</span>
                    </div>
                  )}
                  {card.tags && (
                    <div className="footer-tags">
                      {card.tags.map(tag => (
                        <span key={tag} className="tag-pill">{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          <h2 className="section-title upcoming-title">Upcoming</h2>
          <div className="upcoming-list">
            {upcoming.map((item, index) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="upcoming-item premium-lead-item"
              >
                <div className="upcoming-avatar-placeholder">{item.initials}</div>
                <div className="upcoming-info">
                  <h3 className="upcoming-name">{item.name}</h3>
                  <p className="upcoming-desc">{item.description}</p>
                </div>
                <div className="upcoming-time-section">
                  <span className="upcoming-day">{item.day}</span>
                  <span className="upcoming-full-time">{item.time}</span>
                </div>
                <div className="upcoming-status-pill">
                  {item.status}
                </div>
                <MoreVertical size={20} className="upcoming-more" />
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default FollowUpsPage;
