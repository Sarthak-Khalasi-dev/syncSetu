import { motion } from 'framer-motion';
import { 
  Search, 
  Bell, 
  Globe, 
  Image as ImageIcon, 
  MessageSquare, 
  Settings as SettingsIcon,
  BellRing,
  Palette,
  ShieldCheck,
  CreditCard,
  Users,
  ChevronRight,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import TopHeader from '../components/TopHeader';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const SettingsPage = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'system');
  const [searchQuery, setSearchQuery] = useState("");
  const [workspaceLogo, setWorkspaceLogo] = useState(null);

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file');
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        toast.error('File size must be less than 2MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setWorkspaceLogo(reader.result);
        toast.success('Logo uploaded successfully');
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerLogoUpload = () => {
    document.getElementById('logo-upload-input').click();
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    window.dispatchEvent(new CustomEvent('themeChange', { detail: newTheme }));
  };

  return (
    <div className="page-content-wrapper">

      <main className="main-content settings-layout">
        <TopHeader 
          title="Settings" 
          searchPlaceholder="Search settings..."
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <div className="settings-content-scroll">
          {/* Upper Section */}
          <div className="settings-top-grid">
            {/* Workspace Settings */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="settings-card workspace-settings premium-container"
            >
              <div className="card-header-row">
                <div className="card-title-group">
                  <h2 className="card-title-v2">Workspace Settings</h2>
                  <p className="card-subtitle-v2">Manage your global instance and collaborative environment.</p>
                </div>
                <div className="status-badge-v2 active">ACTIVE</div>
              </div>

              <div className="form-grid-v2">
                <div className="input-group-v3">
                  <label>WORKSPACE NAME</label>
                  <input type="text" defaultValue="Sterling & Co. SyncSetu" />
                </div>
                <div className="input-group-v3">
                  <label>PRIMARY DOMAIN</label>
                  <input type="text" defaultValue="sterling.syncsetu.crm" />
                </div>
              </div>

              <div className="workspace-logo-section">
                <label>WORKSPACE LOGO</label>
                <div className="logo-upload-box">
                  <div className="logo-icon-wrapper">
                    {workspaceLogo ? (
                      <img src={workspaceLogo} alt="Workspace Logo" className="uploaded-logo-preview" />
                    ) : (
                      <ImageIcon size={24} className="logo-icon" />
                    )}
                  </div>
                  <div className="logo-info">
                    <span className="logo-name">{workspaceLogo ? 'Custom Identity' : 'Company Identity'}</span>
                    <span className="logo-meta">SVG, PNG or JPG (max. 800×400px)</span>
                  </div>
                  <input 
                    type="file" 
                    id="logo-upload-input" 
                    hidden 
                    accept="image/*"
                    onChange={handleLogoChange}
                  />
                  <button className="btn-replace-logo" onClick={triggerLogoUpload}>Replace</button>
                </div>
              </div>

              <div className="card-actions-v2">
                <button className="btn-discard">Discard</button>
                <button className="btn-save-changes">Save Changes</button>
              </div>
            </motion.section>

            {/* WhatsApp Integration Card */}
            <motion.aside 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="settings-card whatsapp-connection-card"
            >
              <div className="whatsapp-card-icon">
                <MessageSquare size={28} />
              </div>
              <h2 className="card-title-v2 text-white">WhatsApp Connection</h2>
              <p className="whatsapp-card-desc">
                Synchronize your customer conversations directly into the CRM threads.
              </p>

              <div className="whatsapp-status-box">
                <div className="status-indicator-row">
                  <div className="status-dot-v2 pulse"></div>
                  <div className="status-info-v2">
                    <span className="status-label-v3">STATUS:</span>
                    <span className="status-text-v3">CONNECTED</span>
                  </div>
                </div>
                <div className="authenticated-phone">
                  <span className="phone-label">Authenticated Phone</span>
                  <span className="phone-value">+1 (555) 012-3456</span>
                </div>
              </div>

              <button className="btn-manage-integration">
                Manage Integration
              </button>
            </motion.aside>
          </div>

          {/* Middle Grid (Notifications, Appearance, Security) */}
          <div className="settings-middle-grid">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="settings-card-mini premium-container"
            >
              <div className="mini-card-icon-box"><BellRing size={20} /></div>
              <h3 className="mini-card-title">Notifications</h3>
              <p className="mini-card-desc">Control how and when you receive relationship updates.</p>
              
              <div className="mini-card-settings">
                <div className="toggle-row">
                  <span>Desktop Alerts</span>
                  <div className="toggle-v2 active"></div>
                </div>
                <div className="toggle-row">
                  <span>Email Summary</span>
                  <div className="toggle-v2"></div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="settings-card-mini premium-container"
            >
              <div className="mini-card-icon-box"><Palette size={20} /></div>
              <h3 className="mini-card-title">Appearance</h3>
              <p className="mini-card-desc">Choose the visual aesthetic of your digital workspace.</p>
              
              <div className="appearance-toggle">
                <div 
                  className={`theme-option ${theme === 'light' ? 'active' : ''}`}
                  onClick={() => handleThemeChange('light')}
                >
                  Light
                </div>
                <div 
                  className={`theme-option ${theme === 'dark' ? 'active' : ''}`}
                  onClick={() => handleThemeChange('dark')}
                >
                  Dark
                </div>
                <div 
                  className={`theme-option ${theme === 'system' ? 'active' : ''}`}
                  onClick={() => handleThemeChange('system')}
                >
                  System
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="settings-card-mini premium-container"
            >
              <div className="mini-card-icon-box"><ShieldCheck size={20} /></div>
              <h3 className="mini-card-title">Security</h3>
              <p className="mini-card-desc">Manage authentication and data protection protocols.</p>
              
              <div className="security-action-row">
                <span>Setup 2FA</span>
                <ChevronRight size={18} />
              </div>
              <div className="security-meta">
                <span className="meta-label">LAST LOGIN</span>
                <span className="meta-value">Paris, FR • 14:02 PM Today</span>
              </div>
            </motion.div>
          </div>

          {/* Bottom Grid (Subscription, Team) */}
          <div className="settings-bottom-grid">
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="settings-card-long subscription-card premium-container"
            >
              <div className="sub-header">
                <h3 className="mini-card-title">Subscription</h3>
                <div className="sub-price">
                  <span className="price-val">$249</span>
                  <span className="price-period">/ month</span>
                </div>
                <p className="sub-plan-name">Premium Enterprise Plan</p>
              </div>

              <ul className="sub-features">
                <li><CheckCircle2 size={16} className="feat-icon" /> Unlimited Contacts</li>
                <li><CheckCircle2 size={16} className="feat-icon" /> AI Thread Analysis</li>
              </ul>

              <button className="btn-view-invoices">View Invoices</button>
            </motion.section>

            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="settings-card-long team-seats-card premium-container"
            >
              <h3 className="mini-card-title">Team Members</h3>
              <p className="mini-card-desc">You have 8 active seats out of 12 available.</p>
              
              <div className="team-avatar-group-v2">
                <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Member" />
                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Member" />
                <img src="https://randomuser.me/api/portraits/women/65.jpg" alt="Member" />
                <img src="https://randomuser.me/api/portraits/men/45.jpg" alt="Member" />
                <div className="more-seats">+4</div>
              </div>

              <div className="team-footer-row">
                <div className="collab-info">
                  <span className="collab-label">COLLABORATORS</span>
                  <span className="collab-value">Active & Authenticated</span>
                </div>
                <button className="btn-manage-team-v2">Manage Team</button>
              </div>
            </motion.section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;
