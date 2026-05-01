import { motion, AnimatePresence } from 'framer-motion';
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
import TopHeader from '../components/TopHeader';
import { useState } from 'react';

const TeamPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [isBroadcastModalOpen, setIsBroadcastModalOpen] = useState(false);
  const [broadcastText, setBroadcastText] = useState("");
  const [selectedRole, setSelectedRole] = useState("Sales");
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [newMemberName, setNewMemberName] = useState("");
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

      <main className="main-content team-layout">
        <TopHeader 
          title="Team Management" 
          searchPlaceholder="Search team members..."
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <div className="team-content-scroll">
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
                  className="member-item-card premium-lead-item"
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

                  <button className="member-more-btn" onClick={(e) => {
                    e.stopPropagation();
                    setActiveMenuId(activeMenuId === member.id ? null : member.id);
                  }}>
                    <MoreVertical size={20} />
                    
                    <AnimatePresence>
                      {activeMenuId === member.id && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.9, y: -10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.9, y: -10 }}
                          className="member-action-dropdown premium-container"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="dropdown-item" onClick={() => setActiveMenuId(null)}>
                            <Users size={16} /> View Profile
                          </div>
                          <div className="dropdown-item" onClick={() => setActiveMenuId(null)}>
                            <Activity size={16} /> Sync WhatsApp
                          </div>
                          <div className="dropdown-divider"></div>
                          <div className="dropdown-item danger" onClick={() => setActiveMenuId(null)}>
                            <AlertTriangle size={16} /> Reset Session
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Sidebar Section */}
          <aside className="team-side-panel">
            {/* Quick Add Card */}
            <div className="side-card quick-add-card premium-container">
              <h2 className="side-card-title">Quick Add</h2>
              <p className="side-card-desc">Instantly add a new sales representative or admin to your SyncSetu network.</p>
              
              <div className="quick-add-form">
                <div className="input-group-v2">
                  <label>FULL NAME</label>
                  <input type="text" placeholder="e.g. Vikram Seth" />
                </div>
                <div className="input-group-v2">
                  <label>ROLE</label>
                  <div 
                    className="select-wrapper-v2" 
                    onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                    style={{ position: 'relative', cursor: 'pointer' }}
                  >
                    <span>{selectedRole}</span>
                    <ChevronDown size={18} />
                    
                    <AnimatePresence>
                      {isRoleDropdownOpen && (
                        <motion.div 
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 5 }}
                          className="role-select-dropdown"
                        >
                          {["Sales", "Admin", "Manager", "Owner"].map(role => (
                            <div 
                              key={role} 
                              className="role-option"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedRole(role);
                                setIsRoleDropdownOpen(false);
                              }}
                            >
                              {role}
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
                <button className="btn-send-invitation" onClick={() => alert("Invitation sent to the new member!")}>Send Invitation</button>
              </div>
            </div>

            {/* Network Health Card */}
            <div className="side-card health-card premium-container">
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
            <div className="side-card alerts-card premium-container">
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
          onClick={() => setIsBroadcastModalOpen(true)}
        >
          <MessageSquare size={20} />
          <span>Broadcast Message</span>
        </motion.button>

        {/* Broadcast Modal */}
        <AnimatePresence>
          {isBroadcastModalOpen && (
            <div className="modal-overlay-v2" onClick={() => setIsBroadcastModalOpen(false)}>
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="broadcast-modal-premium"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="modal-header-v2">
                  <div className="modal-header-left">
                    <div className="icon-badge-v2">
                      <MessageSquare size={20} className="text-teal" />
                    </div>
                    <div>
                      <h3>Broadcast Message</h3>
                      <p>Send a global update to the entire sales force.</p>
                    </div>
                  </div>
                  <button className="close-btn-v2" onClick={() => setIsBroadcastModalOpen(false)}>×</button>
                </div>
                
                <div className="modal-body-v2">
                  <div className="target-indicator">
                    <div className="target-pill">
                      <Users size={14} /> 8 Recipients
                    </div>
                    <div className="target-pill">
                      <CheckCircle size={14} /> All Regions
                    </div>
                  </div>
                  
                  <textarea 
                    className="broadcast-textarea" 
                    placeholder="Type your announcement here..."
                    value={broadcastText}
                    onChange={(e) => setBroadcastText(e.target.value)}
                  ></textarea>
                  
                  <div className="broadcast-options">
                    <div className="option-item">
                      <input type="checkbox" id="urgent" />
                      <label htmlFor="urgent">Mark as high priority</label>
                    </div>
                    <div className="option-item">
                      <input type="checkbox" id="receipt" defaultChecked />
                      <label htmlFor="receipt">Request read receipts</label>
                    </div>
                  </div>
                </div>
                
                <div className="modal-footer-v2">
                  <button className="btn-cancel-v2" onClick={() => setIsBroadcastModalOpen(false)}>Cancel</button>
                  <button 
                    className="btn-send-broadcast" 
                    onClick={() => {
                      alert("Broadcast sent successfully!");
                      setIsBroadcastModalOpen(false);
                      setBroadcastText("");
                    }}
                  >
                    Deploy Broadcast
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default TeamPage;
