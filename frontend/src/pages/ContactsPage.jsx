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

import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import TopHeader from '../components/TopHeader';
import AddContactModal from '../components/AddContactModal';

const ContactsPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("ALL");

  const [contactsData, setContactsData] = useState([
    {
      id: 1,
      name: "Arjun Mehta",
      role: "CTO, Vertex Infotech",
      location: "Mumbai, MH",
      status: "NEW",
      statusType: "green",
      value: "4,50,000",
      time: "2 hours ago",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      id: 2,
      name: "Priya Sharma",
      role: "Director, Green Horizons",
      location: "Bangalore, KA",
      status: "FOLLOW-UP",
      statusType: "blue",
      value: "12,20,000",
      time: "Yesterday",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg"
    },
    {
      id: 3,
      name: "Rohan Das",
      role: "Founder, Bloom Media",
      location: "New Delhi, DL",
      status: "WON",
      statusType: "teal",
      value: "8,00,000",
      time: "3 days ago",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg"
    },
    {
      id: 4,
      name: "Ananya Iyer",
      role: "VP Operations, Logistics Pro",
      location: "Chennai, TN",
      status: "FOLLOW-UP",
      statusType: "blue",
      value: "2,10,000",
      time: "5 hours ago",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      id: 5,
      name: "Vikram Singh",
      role: "Managing Partner, Singh & Co",
      location: "Gurugram, HR",
      status: "LOST",
      statusType: "red",
      value: "18,50,000",
      time: "1 week ago",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg"
    }
  ]);

  const filterOptions = [
    { label: "All Contacts", value: "ALL" },
    { label: "New Leads", value: "NEW" },
    { label: "Following-up", value: "FOLLOW-UP" },
    { label: "Won Deals", value: "WON" },
    { label: "Lost Deals", value: "LOST" }
  ];

  const handleAddContact = (formData) => {
    const newContact = {
      id: Date.now(),
      name: formData.name,
      role: formData.business || "Independent Professional",
      location: "India Region",
      status: formData.stage || "NEW",
      statusType: formData.stage === "CLOSED" || formData.stage === "WON" ? "teal" : 
                  formData.stage === "FOLLOW-UP" ? "blue" : "green",
      value: "0",
      time: "Just now",
      avatar: `https://avatar.iran.liara.run/public/${Math.floor(Math.random() * 50)}`
    };

    setContactsData([newContact, ...contactsData]);
  };

  const filteredContacts = contactsData.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         contact.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         contact.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = statusFilter === "ALL" || contact.status === statusFilter;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="page-content-wrapper">

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
              className="performance-widget outline-card"
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
              className="followup-reminder-widget"
            >
              <div className="reminder-content">
                <h3>You have 12 follow-ups pending today.</h3>
                <p>Prioritize your Bangalore tech leads for high conversion.</p>
                <button className="btn-view-schedule" onClick={() => navigate('/follow-ups')}>View Schedule</button>
              </div>
              <div className="widget-watermark">4</div>
            </motion.div>
          </div>

          <div className="contacts-table-container outline-card">
            <table className="contacts-table">
              <thead>
                <tr>
                  <th>CONTACT NAME</th>
                  <th>LOCATION</th>
                  <th>STATUS</th>
                  <th>VALUE</th>
                  <th>LAST ACTIVITY</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence mode="popLayout">
                  {filteredContacts.map((contact, idx) => (
                    <motion.tr 
                      key={contact.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <td>
                        <div className="contact-cell">
                          <img src={contact.avatar} alt={contact.name} className="table-avatar" />
                          <div className="contact-details">
                            <span className="name">{contact.name}</span>
                            <span className="role">{contact.role}</span>
                          </div>
                        </div>
                      </td>
                      <td className="location-cell">{contact.location}</td>
                      <td>
                        <span className={`status-pill pill-${contact.statusType}`}>
                          {contact.status}
                        </span>
                      </td>
                      <td className="value-cell">₹{contact.value}</td>
                      <td className="time-cell">{contact.time}</td>
                      <td>
                        <button className="action-btn-more"><MoreVertical size={16} /></button>
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
