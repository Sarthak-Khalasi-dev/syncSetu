import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

const CallContext = createContext();

export const CallProvider = ({ children }) => {
  const [activeCall, setActiveCall] = useState(null); // 'voice', 'video', null
  const [callContact, setCallContact] = useState(null);
  const [callStatus, setCallStatus] = useState("Calling...");
  const [callTimer, setCallTimer] = useState(0);
  const timerRef = useRef(null);

  const startCall = (contact, type = 'voice') => {
    setCallContact(contact);
    setActiveCall(type);
    setCallStatus("Calling...");
    setCallTimer(0);
  };

  const endCall = () => {
    setActiveCall(null);
    // Note: We could log history here if we wanted it to be global
  };

  useEffect(() => {
    if (activeCall) {
      const ringTimer = setTimeout(() => setCallStatus("Ringing..."), 1500);
      const connectTimer = setTimeout(() => {
        setCallStatus("00:00");
        timerRef.current = setInterval(() => {
          setCallTimer(prev => prev + 1);
        }, 1000);
      }, 4000);

      return () => {
        clearTimeout(ringTimer);
        clearTimeout(connectTimer);
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }
  }, [activeCall]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (callTimer > 0) {
      setCallStatus(formatTime(callTimer));
    }
  }, [callTimer]);

  return (
    <CallContext.Provider value={{ 
      activeCall, 
      callContact, 
      callStatus, 
      startCall, 
      endCall,
      callTimer
    }}>
      {children}
    </CallContext.Provider>
  );
};

export const useCall = () => useContext(CallContext);
