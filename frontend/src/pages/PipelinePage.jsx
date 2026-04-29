import { useState, useMemo } from 'react';
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
  X,
  ArrowRight,
  Trash2,
  Edit3,
  Link as LinkIcon
} from 'lucide-react';

const PipelinePage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedColId, setSelectedColId] = useState("col-1");
  const [editingCardId, setEditingCardId] = useState(null);
  const [newDeal, setNewDeal] = useState({ name: "", subtitle: "", value: "", label: "LEAD" });
  const [activeMenuId, setActiveMenuId] = useState(null);

  const [pipelineData, setPipelineData] = useState([
    {
      id: "col-1",
      title: "NEW",
      count: 2,
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
      count: 2,
      cards: [
        { id: 6, label: "WON", name: "Deepak Verma", subtitle: "Retail Space Lease", value: "90,000", completed: true },
        { id: 7, label: "WON", name: "Sunita Kapoor", subtitle: "Interior Design Lead", value: "1,75,000", completed: true }
      ]
    }
  ]);

  const totalForecast = useMemo(() => {
    let total = 0;
    pipelineData.forEach(col => {
      col.cards.forEach(card => {
        const val = parseInt(card.value.toString().replace(/[^0-9]/g, "")) || 0;
        total += val;
      });
    });
    return total.toLocaleString("en-IN");
  }, [pipelineData]);

  const openAddModal = (colId = "col-1") => {
    setIsEditMode(false);
    setSelectedColId(colId);
    setNewDeal({ name: "", subtitle: "", value: "", label: "LEAD" });
    setIsModalOpen(true);
  };

  const openEditModal = (card, colId) => {
    setIsEditMode(true);
    setSelectedColId(colId);
    setEditingCardId(card.id);
    setNewDeal({ name: card.name, subtitle: card.subtitle, value: card.value, label: card.label });
    setIsModalOpen(true);
    setActiveMenuId(null);
  };

  const handleSaveDeal = (e) => {
    e.preventDefault();
    if (!newDeal.name || !newDeal.value) return;

    if (isEditMode) {
      setPipelineData(prev => prev.map(col => {
        if (col.id === selectedColId) {
          return {
            ...col,
            cards: col.cards.map(card => card.id === editingCardId ? { ...card, ...newDeal } : card)
          };
        }
        return col;
      }));
    } else {
      const isClosedCol = selectedColId === "col-4";
      const newEntry = {
        id: Date.now(),
        ...newDeal,
        completed: isClosedCol,
        label: isClosedCol ? "WON" : newDeal.label
      };

      setPipelineData(prev => prev.map(col => {
        if (col.id === selectedColId) {
          return {
            ...col,
            count: col.count + 1,
            cards: [newEntry, ...col.cards]
          };
        }
        return col;
      }));
    }

    setNewDeal({ name: "", subtitle: "", value: "", label: "LEAD" });
    setIsModalOpen(false);
  };

  const moveNext = (card, currentColId) => {
    const colOrder = ["col-1", "col-2", "col-3", "col-4"];
    const currentIndex = colOrder.indexOf(currentColId);
    if (currentIndex >= colOrder.length - 1) return;

    const nextColId = colOrder[currentIndex + 1];
    const updatedCard = { 
      ...card, 
      completed: nextColId === "col-4",
      label: nextColId === "col-4" ? "WON" : card.label
    };

    setPipelineData(prev => prev.map(col => {
      if (col.id === currentColId) {
        return { ...col, count: col.count - 1, cards: col.cards.filter(c => c.id !== card.id) };
      }
      if (col.id === nextColId) {
        return { ...col, count: col.count + 1, cards: [updatedCard, ...col.cards] };
      }
      return col;
    }));
  };

  const deleteDeal = (cardId, colId) => {
    setPipelineData(prev => prev.map(col => {
      if (col.id === colId) {
        return { ...col, count: col.count - 1, cards: col.cards.filter(c => c.id !== cardId) };
      }
      return col;
    }));
    setActiveMenuId(null);
  };

  const copyDealLink = (card) => {
    const dummyLink = `${window.location.origin}/pipeline/deal/${card.id}`;
    window.navigator.clipboard.writeText(dummyLink);
    setActiveMenuId(null);
  };

  return (
    <div className="dashboard-container" onClick={() => setActiveMenuId(null)}>
      <aside className="sidebar">
        <div className="sidebar-logo">SyncSetu</div>
        <nav className="sidebar-nav">
          <a onClick={() => navigate("/dashboard")} className="nav-item cursor-pointer">
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
            <button className="icon-btn" onClick={(e) => e.stopPropagation()}><Bell size={20} /></button>
            <div className="forecast-display">
              <span className="label">Dynamic Forecast</span>
              <span className="amount">₹ {totalForecast}</span>
            </div>
          </div>
        </header>

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
                  <Plus size={18} className="add-deal-icon" onClick={(e) => { e.stopPropagation(); openAddModal(column.id); }} />
                </div>

                <div className="column-cards-list">
                  <AnimatePresence>
                    {column.cards.map((card, cardIdx) => (
                      <motion.div 
                        key={card.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="pipeline-card"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="card-top">
                          <span className={`card-label label-${card.label.toLowerCase().replace(/\s+/g, "-")}`}>
                            {card.label}
                          </span>
                          
                          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginLeft: "auto" }}>
                            {column.id !== "col-4" && (
                              <button 
                                className="move-btn-mini" 
                                title="Move to next stage"
                                onClick={() => moveNext(card, column.id)}
                              >
                                <ArrowRight size={14} />
                              </button>
                            )}
                            
                            <div className="card-menu-wrapper" style={{ position: "relative" }}>
                                <MoreHorizontal 
                                  size={14} 
                                  className="more-btn" 
                                  style={{ cursor: "pointer" }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveMenuId(activeMenuId === card.id ? null : card.id);
                                  }}
                                />
                                
                                <AnimatePresence>
                                  {activeMenuId === card.id && (
                                    <motion.div 
                                      initial={{ opacity: 0, scale: 0.9, y: -10 }}
                                      animate={{ opacity: 1, scale: 1, y: 0 }}
                                      className="action-menu"
                                    >
                                      <button className="menu-item" onClick={() => openEditModal(card, column.id)}>
                                        <Edit3 size={14} /> Edit Deal
                                      </button>
                                      <button className="menu-item" onClick={() => copyDealLink(card)}>
                                        <LinkIcon size={14} /> Copy Link
                                      </button>
                                      <div style={{ height: "1px", background: "#f1f4f3", margin: "4px 0" }}></div>
                                      <button 
                                        className="menu-item delete"
                                        onClick={() => deleteDeal(card.id, column.id)}
                                      >
                                        <Trash2 size={14} /> Delete Deal
                                      </button>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                            </div>
                          </div>
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
        </footer>

        <button className="global-fab" onClick={(e) => { e.stopPropagation(); openAddModal("col-1"); }}>
          <Plus size={28} />
        </button>

        <AnimatePresence>
          {isModalOpen && (
            <div className="modal-overlay">
              <motion.div 
                className="modal-content"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="modal-header">
                  <h2>{isEditMode ? "Edit Deal" : "Create New Deal"}</h2>
                  <button onClick={() => setIsModalOpen(false)} className="close-btn">
                    <X size={24} />
                  </button>
                </div>
                <form onSubmit={handleSaveDeal} className="add-lead-form">
                  <div className="form-group">
                    <label>Lead Name</label>
                    <input 
                      type="text" 
                      value={newDeal.name}
                      onChange={(e) => setNewDeal({...newDeal, name: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Opportunity Detail</label>
                    <input 
                      type="text" 
                      value={newDeal.subtitle}
                      onChange={(e) => setNewDeal({...newDeal, subtitle: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Deal Value (₹)</label>
                    <input 
                      type="text" 
                      value={newDeal.value}
                      onChange={(e) => setNewDeal({...newDeal, value: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Source Label</label>
                    <select 
                      className="modal-select"
                      value={newDeal.label}
                      onChange={(e) => setNewDeal({...newDeal, label: e.target.value})}
                    >
                      <option value="LEAD">LEAD</option>
                      <option value="INBOUND">INBOUND</option>
                      <option value="WHATSAPP">WHATSAPP</option>
                      <option value="HIGH INTENT">HIGH INTENT</option>
                      <option value="WON">WON</option>
                    </select>
                  </div>
                  <div className="modal-footer">
                    <button type="button" onClick={() => setIsModalOpen(false)} className="btn-cancel">Cancel</button>
                    <button type="submit" className="btn-save">
                      {isEditMode ? "Update Deal" : "Save Deal"}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default PipelinePage;
