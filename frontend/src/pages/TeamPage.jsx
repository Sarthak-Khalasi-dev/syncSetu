import { motion } from 'framer-motion';
import { 
  Search, 
  Bell, 
  MoreVertical, 
  Plus, 
  ChevronDown,
  Activity,
  AlertTriangle,
  CheckCircle,
  MessageSquare,
  Users
} from 'lucide-react';
import Sidebar from '../components/Sidebar';

const TeamPage = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Arjun Mehta",
      role: "TEAM OWNER",
      status: "CONNECTED",
      statusType: "success",
      progress: 85,
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      verified: true
    },
    {
      id: 2,
      name: "Priya Sharma",
      role: "SALES EXECUTIVE",
      status: "CONNECTED",
      statusType: "success",
      progress: 70,
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      verified: true
    },
    {
      id: 3,
      name: "Rohan Gupta",
      role: "SALES LEAD",
      status: "DISCONNECTED",
      statusType: "danger",
      progress: 45,
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      error: true
    },
    {
      id: 4,
      name: "Ananya Iyer",
      role: "ADMIN",
      status: "CONNECTED",
      statusType: "success",
      progress: 60,
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
      verified: true
    }
  ];

  const alerts = [
    {
      id: 1,
      title: "Rohan's QR Expired",
      desc: "Re-authentication required for Rohan Gupta's WhatsApp session.",
      type: "warning",
      icon: AlertTriangle
    },
    {
      id: 2,
      title: "New Admin Verified",
      desc: "Ananya Iyer successfully verified her organizational credentials.",
      type: "success",
      icon: CheckCircle
    }
  ];

  return (
    <div className="page-content-wrapper">

      <main className="team-main-content">
        <header className="team-header-v2">
          <div className="header-left">
            <h1 className="team-title-main">Team Management</h1>
            <p className="team-subtitle-main">Manage your collective conversation and WhatsApp statuses.</p>
          </div>
          <div className="header-right">
            <div className="team-search-bar">
              <Search size={18} className="search-icon-muted" />
              <input type="text" placeholder="Search team members..." />
            </div>
            <button className="icon-btn-header"><Bell size={20} /></button>
          </div>
        </header>

        <div className="team-content-layout">
          {/* Main List Section */}
          <section className="team-list-section">
            <div className="list-header-row">
              <h2 className="list-title">Regional Sales Force</h2>
              <div className="member-count-tag">8 MEMBERS</div>
            </div>

            <div className="team-members-list">
              {teamMembers.map((member, index) => (
                <motion.div 
                  key={member.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="member-item-card"
                >
                  <div className="member-avatar-wrapper">
                    <img src={member.avatar} alt={member.name} className="member-avatar-img" />
                    {member.verified && (
                      <div className="status-indicator-mini success">
                        <CheckCircle size={10} fill="currentColor" strokeWidth={3} />
                      </div>
                    )}
                    {member.error && (
                      <div className="status-indicator-mini danger">
                        <Activity size={10} fill="currentColor" strokeWidth={3} />
                      </div>
                    )}
                  </div>

                  <div className="member-info-col">
                    <h3 className="member-name-v2">{member.name}</h3>
                    <span className="member-role-v2">{member.role}</span>
                  </div>

                  <div className="member-status-col">
                    <span className="status-label-v2">WhatsApp Status</span>
                    <div className={`status-pill-v2 ${member.statusType}`}>
                      {member.status}
                    </div>
                  </div>

                  <div className="member-progress-col">
                    <div className="progress-bar-v2">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${member.progress}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className={`progress-fill-v2 ${member.statusType}`}
                      ></motion.div>
                    </div>
                  </div>

                  <button className="member-more-btn">
                    <MoreVertical size={20} />
                  </button>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Sidebar Section */}
          <aside className="team-side-panel">
            {/* Quick Add Card */}
            <div className="side-card quick-add-card">
              <h2 className="side-card-title">Quick Add</h2>
              <p className="side-card-desc">Instantly add a new sales representative or admin to your SyncSetu network.</p>
              
              <div className="quick-add-form">
                <div className="input-group-v2">
                  <label>FULL NAME</label>
                  <input type="text" placeholder="e.g. Vikram Seth" />
                </div>
                <div className="input-group-v2">
                  <label>ROLE</label>
                  <div className="select-wrapper-v2">
                    <span>Sales</span>
                    <ChevronDown size={18} />
                  </div>
                </div>
                <button className="btn-send-invitation">Send Invitation</button>
              </div>
            </div>

            {/* Network Health Card */}
            <div className="side-card health-card">
              <div className="health-header">
                <h2 className="side-card-title">Network Health</h2>
              </div>
              
              <div className="health-stats-top">
                <span className="stat-label">Active Connections</span>
                <span className="stat-value">88%</span>
              </div>
              <div className="health-progress-bar">
                <div className="health-progress-fill" style={{ width: '88%' }}></div>
              </div>

              <div className="health-stats-grid">
                <div className="health-stat-box">
                  <span className="box-value">12.4k</span>
                  <span className="box-label">Messages Sent</span>
                </div>
                <div className="health-stat-box">
                  <span className="box-value">~4m</span>
                  <span className="box-label">Response Time</span>
                </div>
              </div>
            </div>

            {/* System Alerts */}
            <div className="side-card alerts-card">
              <h2 className="side-card-title">System Alerts</h2>
              <div className="alerts-list">
                {alerts.map((alert) => (
                  <div key={alert.id} className="alert-item-v2">
                    <div className={`alert-icon-box ${alert.type}`}>
                      <alert.icon size={18} />
                    </div>
                    <div className="alert-text-v2">
                      <h4 className="alert-title-v2">{alert.title}</h4>
                      <p className="alert-desc-v2">{alert.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* Floating Broadcast Button */}
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-broadcast-floating"
        >
          <MessageSquare size={20} />
          <span>Broadcast Message</span>
        </motion.button>
      </main>
    </div>
  );
};

export default TeamPage;
