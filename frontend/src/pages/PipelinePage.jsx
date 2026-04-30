import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TopHeader from '../components/TopHeader';
import AddContactModal from '../components/AddContactModal';
import {
  MoreHorizontal,
  CheckCircle2,
  Clock,
  IndianRupee,
  ArrowRight,
  Trash2,
  Link as LinkIcon,
  Users,
  Plus
} from 'lucide-react';

const PipelinePage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedColId, setSelectedColId] = useState("col-1");
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

  const winRate = useMemo(() => {
    let total = 0;
    let won = 0;
    pipelineData.forEach(col => {
      total += col.cards.length;
      if (col.id === "col-4") won += col.cards.length;
    });
    return total === 0 ? 0 : Math.round((won / total) * 100);
  }, [pipelineData]);

  const totalForecast = useMemo(() => {
    let total = 0;
    pipelineData.forEach(col => {
      col.cards.forEach(card => {
        const name = card.name || "";
        const subtitle = card.subtitle || "";
        const matchesSearch = name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             subtitle.toLowerCase().includes(searchQuery.toLowerCase());
        
        if (matchesSearch) {
          const val = parseInt((card.value || "0").toString().replace(/[^0-9]/g, "")) || 0;
          total += val;
        }
      });
    });
    return total.toLocaleString("en-IN");
  }, [pipelineData, searchQuery]);

  const openAddModal = (colId = "col-1") => {
    setSelectedColId(colId);
    setIsModalOpen(true);
  };

  const handleAddDealSubmit = (formData) => {
    const isClosedCol = formData.stage === "CLOSED" || selectedColId === "col-4";
    const actualColId = formData.stage ? 
      (formData.stage === "NEW" ? "col-1" : 
       formData.stage === "CONTACTED" ? "col-2" : 
       formData.stage === "INTERESTED" ? "col-3" : "col-4") 
      : selectedColId;

    const newEntry = {
      id: Date.now(),
      name: formData.name,
      subtitle: formData.business || "Added via Pipeline",
      value: "0", 
      label: formData.stage || "LEAD",
      completed: isClosedCol
    };

    setPipelineData(prev => prev.map(col => {
      if (col.id === actualColId) {
        return {
          ...col,
          count: col.count + 1,
          cards: [newEntry, ...col.cards]
        };
      }
      return col;
    }));
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
    <div className="page-content-wrapper" onClick={() => setActiveMenuId(null)}>

      <main className="main-content pipeline-content-wrapper">
        <TopHeader 
          title="Pipeline" 
          searchPlaceholder="Search deals..."
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <div className="pipeline-scroll-area">
          <div className="pipeline-forecast-floating">
             <span className="label">Forecast</span>
             <span className="amount">₹ {totalForecast}</span>
          </div>

          <motion.div 
            className="pipeline-board-layout"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {pipelineData.map((column, colIdx) => {
              const filteredCards = column.cards.filter(card => {
                const name = card.name || "";
                const subtitle = card.subtitle || "";
                return name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       subtitle.toLowerCase().includes(searchQuery.toLowerCase());
              });
              
              return (
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
                      <span className="count-pill">{filteredCards.length}</span>
                    </div>
                    <Plus size={18} className="add-deal-icon" onClick={(e) => { e.stopPropagation(); openAddModal(column.id); }} />
                  </div>

                  <div className="column-cards-list">
                    <AnimatePresence>
                      {filteredCards.map((card, cardIdx) => (
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
              );
            })}
          </motion.div>
        </div>

        <footer className="pipeline-footer-stats">
          <div className="stats-card win-rate">
            <div className="stats-label">WIN RATE</div>
            <div className="stats-main">
              <h2>{winRate}%</h2>
              <div className="progress-ring">
                <svg width="40" height="40">
                  <circle cx="20" cy="20" r="16" stroke="#e2ece8" strokeWidth="4" fill="none" />
                  <circle cx="20" cy="20" r="16" stroke="#125143" strokeWidth="4" fill="none" 
                          strokeDasharray="100.5" strokeDashoffset={100.5 - (100.5 * (winRate / 100))} strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </div>

          <div className="stats-card momentum-banner">
            <div className="banner-text">
              <h3>Weekly Momentum</h3>
              <p>You have 4 deals approaching the closing date this week.</p>
            </div>
            <button className="schedule-btn" onClick={() => navigate('/follow-ups')}>View Schedule</button>
          </div>
        </footer>

        <button className="global-fab" onClick={(e) => { e.stopPropagation(); openAddModal("col-1"); }}>
          <Plus size={28} />
        </button>

        <AddContactModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAdd={handleAddDealSubmit}
        />
      </main>
    </div>
  );
};

export default PipelinePage;
