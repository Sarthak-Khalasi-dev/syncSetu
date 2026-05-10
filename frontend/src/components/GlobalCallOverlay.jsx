import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mic, MicOff, Camera, VideoOff, Volume2, VolumeX, CheckCheck, Download } from 'lucide-react';
import { useCall } from '../context/CallContext';

const GlobalCallOverlay = () => {
  const { activeCall, callContact, callStatus, endCall } = useCall();
  
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);

  if (!activeCall || !callContact) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="whatsapp-call-overlay"
      >
        <div className="call-bg-gradient"></div>
        
        <div className="call-content">
          <div className="call-header-info">
            <div className="call-lock-status">
              <CheckCheck size={12} /> End-to-end encrypted
            </div>
            <h1 className="caller-name">{callContact.name}</h1>
            <p className="call-status">{callStatus}</p>
          </div>

          <div className="caller-avatar-container">
            <div className={`caller-avatar-wrapper ${callStatus === 'Ringing...' ? 'ringing' : ''}`}>
              <img src={callContact.avatar || 'https://randomuser.me/api/portraits/lego/1.jpg'} alt={callContact.name} />
            </div>
          </div>

          <div className="call-actions-footer">
            <div className="call-utility-btns">
              <button 
                className={`util-btn ${isMuted ? 'active' : ''}`}
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? <MicOff size={22} /> : <Mic size={22} />}
              </button>
              <button 
                className={`util-btn ${isVideoOff ? 'active' : ''}`}
                onClick={() => setIsVideoOff(!isVideoOff)}
              >
                {isVideoOff ? <VideoOff size={22} /> : <Camera size={22} />}
              </button>
              <button 
                className={`util-btn ${!isSpeakerOn ? 'disabled' : ''}`}
                onClick={() => setIsSpeakerOn(!isSpeakerOn)}
              >
                {isSpeakerOn ? <Volume2 size={22} /> : <VolumeX size={22} />}
              </button>
            </div>
            
            <div className="main-call-controls">
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="end-call-btn" 
                onClick={endCall}
              >
                <X size={28} />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default GlobalCallOverlay;
