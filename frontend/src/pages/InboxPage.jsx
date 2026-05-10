import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Phone, 
  Video, 
  MoreVertical, 
  Plus, 
  Smile, 
  Send,
  User,
  CheckCheck,
  Paperclip,
  ChevronLeft,
  Inbox,
  Menu,
  X,
  Mic,
  MicOff,
  Camera,
  VideoOff,
  Download,
  Volume2,
  VolumeX,
  Trash2,
  BellOff,
  UserCircle,
  Image as ImageIcon
} from 'lucide-react';
import EmojiPicker from 'emoji-picker-react';
import { useCall } from '../context/CallContext';
import { useOutletContext } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const InboxPage = () => {
  const { toggleSidebar } = useOutletContext() || {};
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState(1);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Global Call Context
  const { 
    activeCall: globalActiveCall, 
    callStatus: globalCallStatus, 
    startCall, 
    endCall 
  } = useCall();

  // Call Utilities States
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);

  const conversations = [
    {
      id: 1,
      name: "Ananya Sharma",
      title: "Director, Zenith Architecture",
      lastMsg: "Yes, the Mumbai project timeline looks...",
      time: "JUST NOW",
      badge: "NEW",
      badgeType: "new",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      online: true,
      pinned: true
    },
    {
      id: 2,
      name: "Rohan Verma",
      title: "Founder, Bloom Media",
      lastMsg: "Sent you the updated quote for Bengaluru site.",
      time: "14:20",
      badge: "WON",
      badgeType: "won",
      initials: "RV",
      online: false
    },
    {
      id: 3,
      name: "Arjun Mehta",
      title: "CTO, Vertex Infotech",
      lastMsg: "I'll check with the team and get back.",
      time: "YESTERDAY",
      badge: "FOLLOW-UP",
      badgeType: "follow-up",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      online: true
    },
    {
      id: 4,
      name: "Priya Kapoor",
      title: "Creative Lead, Urban Studio",
      lastMsg: "Thank you for the presentation.",
      time: "2D AGO",
      initials: "PK",
      online: false
    }
  ];

  const chatMessages = [
    {
      id: 1,
      text: "Hi Alex, I reviewed the latest designs for the Pune residential wing. We need to tweak the lobby entrance layout.",
      time: "10:12 AM",
      type: "received"
    },
    {
      id: 2,
      text: "Good morning Ananya! Understood. I've noted that down. Do you have a specific reference in mind or should I propose a few alternatives?",
      time: "10:15 AM",
      type: "sent",
      status: "read"
    },
    {
      id: 3,
      text: "Yes, the Mumbai project timeline looks feasible but let's confirm the contractor availability first.",
      time: "11:04 AM",
      type: "received"
    }
  ];

  const [messages, setMessages] = useState(chatMessages);
  const activeContact = conversations.find(c => c.id === activeTab);

  const filteredConversations = conversations.filter(conv => 
    conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isFirstRender = useRef(true);

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

  // Simulate typing indicator when switching contacts
  useEffect(() => {
    if (activeTab) {
      setIsTyping(true);
      const timer = setTimeout(() => setIsTyping(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [activeTab]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg = {
      id: Date.now(),
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: "sent",
      status: "sent"
    };

    setMessages([...messages, newMsg]);
    setInputText("");
    
    setTimeout(() => {
      setMessages(prev => prev.map(m => m.id === newMsg.id ? {...m, status: "read"} : m));
    }, 2000);
  };

  const onEmojiClick = (emojiObject) => {
    setInputText(prev => prev + emojiObject.emoji);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const newMsg = {
        id: Date.now(),
        text: file.type.startsWith('image/') ? null : `File: ${file.name}`,
        image: file.type.startsWith('image/') ? event.target.result : null,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: "sent",
        status: "sent"
      };
      setMessages([...messages, newMsg]);
    };
    reader.readAsDataURL(file);
  };

  // Call History Logging (Local to Inbox)
  const prevActiveCall = useRef(globalActiveCall);
  useEffect(() => {
    if (prevActiveCall.current && !globalActiveCall) {
      // Call just ended
      const callTypeLabel = prevActiveCall.current === 'video' ? 'Video' : 'Voice';
      const isMissed = globalCallStatus === 'Ringing...';
      
      const historyMsg = {
        id: Date.now(),
        text: isMissed ? `Missed ${callTypeLabel} Call` : `${callTypeLabel} Call, ${globalCallStatus}`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: "system",
        callType: prevActiveCall.current,
        isMissed: isMissed
      };
      
      setMessages(prev => [...prev, historyMsg]);
    }
    prevActiveCall.current = globalActiveCall;
  }, [globalActiveCall, globalCallStatus]);

  return (
    <div className="page-content-wrapper">

      <main className="inbox-main-content single-view-mode">
        {/* Column 2: Conversations List - Only show if NO active contact is selected */}
        {!activeTab && (
          <section className="inbox-conversations-column premium-container full-width">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inbox-col-header"
          >
            <div className="inbox-header-top">
              <button className="mobile-menu-toggle" onClick={toggleSidebar}>
                <Menu size={24} />
              </button>
              <h1 className="inbox-title">Inbox</h1>
              <div className="inbox-count-badge">{conversations.length}</div>
            </div>
            <div className="inbox-search-container">
              <Search size={18} className="inbox-search-icon" />
              <input 
                type="text" 
                placeholder="Search conversations..." 
                className="inbox-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </motion.div>

          <div className="inbox-list-scrollable">
            {filteredConversations.length > 0 ? (
              filteredConversations.map((conv, index) => (
                <motion.div 
                  key={conv.id} 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`inbox-item ${activeTab === conv.id ? 'active' : ''} ${conv.pinned ? 'pinned' : ''}`}
                  onClick={() => setActiveTab(conv.id)}
                >
                  <div className="inbox-item-avatar-section">
                    {conv.avatar ? (
                      <img src={conv.avatar} alt={conv.name} className="inbox-item-avatar" />
                    ) : (
                      <div className="inbox-item-avatar-placeholder">{conv.initials}</div>
                    )}
                    {conv.online && <div className="online-indicator-dot"></div>}
                  </div>
                  <div className="inbox-item-details">
                    <div className="inbox-item-top-row">
                      <span className="inbox-item-name">{conv.name}</span>
                      <span className="inbox-item-time">{conv.time}</span>
                    </div>
                    <div className="inbox-item-snippet-row">
                      <p className="inbox-item-snippet">{conv.lastMsg}</p>
                      {conv.pinned && <div className="pin-icon">📍</div>}
                    </div>
                    {conv.badge && (
                      <div className={`inbox-item-badge badge-${conv.badgeType}`}>
                        {conv.badge}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="inbox-search-empty-state"
              >
                <div className="empty-search-card">
                  <Search size={40} className="empty-search-icon" />
                  <h3>No matches found</h3>
                  <p>We couldn't find anyone matching "{searchQuery}"</p>
                  <button className="btn-clear-search" onClick={() => setSearchQuery("")}>Clear Search</button>
                </div>
              </motion.div>
            )}
          </div>
          </section>
        )}

        {/* Column 3: Chat Window - Only show if an active contact is selected */}
        {activeTab && (
          <section className="inbox-chat-column active full-width">
          <AnimatePresence mode="wait">
            {activeContact ? (
              <motion.div 
                key={activeContact.id}
                initial={{ opacity: 0, scale: 0.99 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.99 }}
                transition={{ duration: 0.3 }}
                className="chat-window-inner premium-container"
                style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
              >
                <header className="chat-header-v2">
                  <button className="back-to-inbox-btn" onClick={() => setActiveTab(null)}>
                    <ChevronLeft size={24} />
                    <span>Back</span>
                  </button>
                  <div className="chat-header-user">
                    <div className="chat-header-avatar-container">
                      {activeContact.avatar ? (
                        <img src={activeContact.avatar} alt={activeContact.name} className="chat-header-avatar" />
                      ) : (
                        <div className="chat-header-avatar-placeholder">{activeContact.initials}</div>
                      )}
                      {activeContact.online && <div className="chat-header-online-dot"></div>}
                    </div>
                    <div className="chat-header-info">
                      <h3 className="chat-header-name">{activeContact.name}</h3>
                      <div className="chat-header-status-row">
                        <span className={`status-dot ${activeContact.online ? 'online' : 'offline'}`}></span>
                        <p className="chat-header-role">{activeContact.online ? 'Online' : 'Last seen 2h ago'}</p>
                      </div>
                    </div>
                  </div>
                  <div className="chat-header-actions-v2">
                    <motion.button 
                      whileHover={{ scale: 1.1 }} 
                      className="chat-action-btn"
                      onClick={() => startCall(activeContact, 'voice')}
                    >
                      <Phone size={20} />
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.1 }} 
                      className="chat-action-btn"
                      onClick={() => startCall(activeContact, 'video')}
                    >
                      <Video size={20} />
                    </motion.button>
                    <div className="menu-container-relative">
                      <motion.button 
                        whileHover={{ scale: 1.1 }} 
                        className={`chat-action-btn ${isMenuOpen ? 'active' : ''}`}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                      >
                        <MoreVertical size={20} />
                      </motion.button>
                      <AnimatePresence>
                        {isMenuOpen && (
                          <motion.div 
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="three-dots-dropdown"
                          >
                            <div className="dropdown-item"><UserCircle size={16} /> View Profile</div>
                            <div className="dropdown-item"><BellOff size={16} /> Mute Notifications</div>
                            <div className="dropdown-item danger" onClick={() => setMessages([])}><Trash2 size={16} /> Clear Chat</div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </header>

                <div className="chat-content-v2">
                  <div className="chat-date-separator">
                    <span className="date-tag">TODAY</span>
                  </div>

                  <div className="chat-messages-container">
                    {messages.map((msg) => (
                      <div key={msg.id} className={`chat-message-row ${msg.type}`}>
                        {msg.type === 'system' ? (
                          <div className="chat-system-message">
                            <div className="system-message-inner">
                              {msg.callType === 'video' ? <Video size={14} /> : <Phone size={14} />}
                              <span>{msg.text}</span>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="chat-bubble-v2">
                              {msg.image ? (
                                <img src={msg.image} alt="uploaded" className="chat-image-attachment" />
                              ) : (
                                <p>{msg.text}</p>
                              )}
                            </div>
                            <div className="chat-message-info">
                              <span className="chat-message-time">{msg.time}</span>
                              {msg.type === 'sent' && (
                                <CheckCheck size={14} className={`msg-status-icon ${msg.status === 'read' ? 'read' : ''}`} />
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                    
                    {isTyping && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="chat-message-row received"
                      >
                        <div className="chat-bubble-v2 typing-bubble">
                          <div className="typing-dots">
                            <span></span><span></span><span></span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                    <div ref={chatEndRef} />
                  </div>
                </div>

                <footer className="chat-footer-v2">
                  <div className="chat-footer-inner">
                    <input 
                      type="file" 
                      hidden 
                      ref={fileInputRef} 
                      onChange={handleFileUpload}
                      accept="image/*,application/pdf"
                    />
                    <motion.button 
                      whileHover={{ scale: 1.1 }} 
                      className="footer-action-btn"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Paperclip size={20} />
                    </motion.button>
                    <div className="footer-input-wrapper">
                      <input 
                        type="text" 
                        placeholder="Type a message..." 
                        className="footer-text-input"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(e)}
                      />
                      <div className="emoji-picker-anchor">
                        <motion.button 
                          whileHover={{ scale: 1.1 }} 
                          className={`footer-emoji-btn ${isEmojiOpen ? 'active' : ''}`}
                          onClick={() => setIsEmojiOpen(!isEmojiOpen)}
                        >
                          <Smile size={22} />
                        </motion.button>
                        {isEmojiOpen && (
                          <div className="emoji-picker-container-v2">
                            <EmojiPicker 
                              onEmojiClick={onEmojiClick}
                              theme="auto"
                              searchDisabled={false}
                              skinTonesDisabled={true}
                              width={320}
                              height={400}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="footer-send-btn" 
                      onClick={handleSendMessage}
                    >
                      <Send size={20} />
                    </motion.button>
                  </div>
                </footer>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </section>
      )}
    </main>

      {/* Global Call Overlay is now handled at the App level */}
    </div>
  );
};

export default InboxPage;



