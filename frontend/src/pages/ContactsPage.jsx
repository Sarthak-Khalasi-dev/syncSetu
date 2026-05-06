import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  MoreVertical,
  UserPlus2,
  ChevronLeft,
  ChevronRight,
  TrendingUp as TrendingIcon,
  Search
} from 'lucide-react';

import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import TopHeader from '../components/TopHeader';
import AddContactModal from '../components/AddContactModal';
import api from '../services/api';

const ContactsPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [contactsData, setContactsData] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [activeMenuId, setActiveMenuId] = useState(null);

  const filterOptions = [
    { label: "All Contacts", value: "ALL" },
    { label: "New Leads", value: "Lead" },
    { label: "Active Clients", value: "Active" },
    { label: "In Negotiation", value: "Negotiation" },
    { label: "Closed / Won", value: "Closed" }
  ];

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await api.get('/contacts');
        setContactsData(res.data.data);
      } catch (err) {
        console.error('Error fetching contacts:', err);
      }
    };
    fetchContacts();
  }, []);

  const handleAddContact = async (formData) => {
    try {
      const newContact = {
        name: formData.name,
        role: formData.business || "Independent Professional",
        location: "India Region",
        status: formData.stage || "Lead",
        email: formData.email || "",
        phone: formData.whatsapp || "",
        value: 0, 
      };

      const res = await api.post('/contacts', newContact);
      setContactsData(prev => [res.data.data, ...prev]);
      setIsModalOpen(false);
    } catch (err) {
      console.error('Error adding contact:', err);
    }
  };

  const handleDeleteContact = async (id) => {
    try {
      await api.delete(`/contacts/${id}`);
      setContactsData(prev => prev.filter(c => (c._id || c.id) !== id));
      setActiveMenuId(null);
    } catch (err) {
      console.error('Error deleting contact:', err);
    }
  };

  const handleWhatsAppAction = (phone) => {
    if (!phone) return;
    const cleanPhone = phone.replace(/\D/g, '');
    window.open(`https://wa.me/${cleanPhone}`, '_blank');
    setActiveMenuId(null);
  };

  const filteredContacts = contactsData.filter(contact => {
    const name = contact.name || "";
    const role = contact.role || "";
    const location = contact.location || "";
    
    const matchesSearch = name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = statusFilter === "ALL" || contact.status === statusFilter;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="page-content-wrapper" onClick={() => setActiveMenuId(null)}>

      <main className="main-content contacts-layout">
        <TopHeader 
          title="Contacts" 
          searchPlaceholder="Search leads in Mumbai, Delhi, Bangalore..."
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          showFilter={true}
          activeFilter={statusFilter}
          onFilterChange={setStatusFilter}
          filterOptions={filterOptions}
        />

        <div className="contacts-content-scroll">
          <div className="contacts-hero-section">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="performance-widget premium-container"
            >
              <div className="widget-header">
                <span className="tiny-label">PERFORMANCE</span>
                <h2>Lead Conversion Rate</h2>
              </div>
              <div className="performance-data">
                <div className="rate-value">
                  <span className="big-number">64.2%</span>
                  <span className="trend-label positive">
                    <TrendingIcon size={14} /> +12% vs last month
                  </span>
                </div>
                <div className="mini-bar-chart">
                  <div className="chart-bar" style={{ height: '30%' }}></div>
                  <div className="chart-bar" style={{ height: '50%' }}></div>
                  <div className="chart-bar" style={{ height: '40%' }}></div>
                  <div className="chart-bar highlight" style={{ height: '80%' }}></div>
                  <div className="chart-bar" style={{ height: '45%' }}></div>
                  <div className="chart-bar" style={{ height: '65%' }}></div>
                  <div className="chart-bar active" style={{ height: '90%' }}></div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="followup-reminder-widget premium-container"
            >
              <div className="reminder-content">
                <h3>You have 12 follow-ups pending today.</h3>
                <p>Prioritize your Bangalore tech leads for high conversion.</p>
                <button className="btn-view-schedule" onClick={() => navigate('/follow-ups')}>View Schedule</button>
              </div>
              <div className="widget-watermark">4</div>
            </motion.div>
          </div>

          <div className="contacts-table-container premium-container">
            <table className="contacts-table">
              <thead>
                <tr>
                  <th>CONTACT NAME</th>
                  <th className="hide-mobile">LOCATION</th>
                  <th>STATUS</th>
                  <th className="hide-mobile">VALUE</th>
                  <th className="hide-mobile">LAST ACTIVITY</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence mode="popLayout">
                  {filteredContacts.map((contact, idx) => (
                    <motion.tr 
                      key={contact._id || contact.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <td>
                        <div className="contact-cell">
                          <img src={contact.avatar || 'https://randomuser.me/api/portraits/lego/1.jpg'} alt={contact.name} className="table-avatar" />
                          <div className="contact-details">
                            <span className="name">{contact.name}</span>
                            <span className="role">{contact.role}</span>
                          </div>
                        </div>
                      </td>
                      <td className="location-cell hide-mobile">{contact.location}</td>
                      <td>
                        <span className={`status-pill pill-${contact.statusType || (contact.status === 'WON' ? 'teal' : contact.status === 'FOLLOW-UP' ? 'blue' : contact.status === 'LOST' ? 'red' : 'green')}`}>
                          {contact.status}
                        </span>
                      </td>
                      <td className="value-cell hide-mobile">₹{contact.value}</td>
                      <td className="time-cell hide-mobile">{contact.time}</td>
                      <td>
                        <div className="action-menu-container" style={{ position: 'relative' }}>
                          <button 
                            className={`action-btn-more ${activeMenuId === (contact._id || contact.id) ? 'active' : ''}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveMenuId(activeMenuId === (contact._id || contact.id) ? null : (contact._id || contact.id));
                            }}
                          >
                            <MoreVertical size={16} />
                          </button>
                          
                          <AnimatePresence>
                            {activeMenuId === (contact._id || contact.id) && (
                              <motion.div 
                                initial={{ opacity: 0, scale: 0.9, y: -10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: -10 }}
                                className="contact-action-dropdown premium-container"
                              >
                                <button className="menu-item" onClick={() => navigate(`/contacts/${contact._id || contact.id}`)}>
                                  View Profile
                                </button>
                                <button className="menu-item" onClick={() => handleWhatsAppAction(contact.phone)}>
                                  WhatsApp Chat
                                </button>
                                <div className="menu-divider"></div>
                                <button 
                                  className="menu-item delete" 
                                  onClick={() => handleDeleteContact(contact._id || contact.id)}
                                >
                                  Delete Contact
                                </button>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>

            {filteredContacts.length === 0 && (
              <div className="empty-table-state">
                <Search size={40} />
                <p>No contacts found matching your search/filter.</p>
                <button className="btn-reset" style={{ marginTop: '12px', fontSize: '14px' }} onClick={() => { setStatusFilter("ALL"); setSearchQuery(""); }}>Clear All Filters</button>
              </div>
            )}

            <div className="table-footer">
              <div className="pagination-info">
                Showing {filteredContacts.length} of {contactsData.length} leads
              </div>
              <div className="pagination-controls">
                <button className="page-btn"><ChevronLeft size={16} /></button>
                <button className={`page-btn ${activePage === 1 ? 'active' : ''}`} onClick={() => setActivePage(1)}>1</button>
                <button className="page-btn" onClick={() => setActivePage(2)}>2</button>
                <button className="page-btn" onClick={() => setActivePage(3)}>3</button>
                <button className="page-btn"><ChevronRight size={16} /></button>
              </div>
            </div>
          </div>
        </div>

        <button className="btn-add-contact-fab" onClick={() => setIsModalOpen(true)}>
          <UserPlus2 size={24} />
        </button>

        <AddContactModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAdd={handleAddContact}
        />
      </main>
    </div>
  );
};

export default ContactsPage;
