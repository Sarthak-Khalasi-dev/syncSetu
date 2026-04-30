import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  User, 
  Building2, 
  Mail, 
  MessageSquare, 
  ChevronDown,
  Filter
} from 'lucide-react';
import { useState } from 'react';

const AddContactModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    business: '',
    email: '',
    whatsapp: '',
    stage: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="modal-overlay" onClick={onClose}>
        <motion.div 
          className="premium-modal"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-inner">
            <div className="modal-header-section">
              <h2>Add Contact</h2>
              <p>Grow your network with meaningful details.</p>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-grid">
                <div className="form-group-premium">
                  <label>Full Name</label>
                  <div className="input-with-icon">
                    <User size={18} className="field-icon" />
                    <input 
                      type="text" 
                      placeholder="e.g. Advait Malhotra" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="form-group-premium">
                  <label>Business Name</label>
                  <div className="input-with-icon">
                    <Building2 size={18} className="field-icon" />
                    <input 
                      type="text" 
                      placeholder="e.g. Bangalore Tech Hub" 
                      value={formData.business}
                      onChange={(e) => setFormData({...formData, business: e.target.value})}
                    />
                  </div>
                </div>

                <div className="form-group-premium">
                  <label>Email Address</label>
                  <div className="input-with-icon">
                    <Mail size={18} className="field-icon" />
                    <input 
                      type="email" 
                      placeholder="advait.m@syncsetu.in" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>

                <div className="form-group-premium">
                  <label>WhatsApp Number</label>
                  <div className="input-with-icon">
                    <div className="prefix">
                       <MessageSquare size={16} />
                       <span>+91</span>
                    </div>
                    <input 
                      type="text" 
                      className="with-prefix"
                      placeholder="98765 43210" 
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div className="form-group-premium full-width">
                <label>Lead Stage</label>
                <div className="input-with-icon select-wrapper">
                  <Filter size={18} className="field-icon" />
                  <select 
                    value={formData.stage}
                    onChange={(e) => setFormData({...formData, stage: e.target.value})}
                  >
                    <option value="">Select Stage</option>
                    <option value="NEW">New</option>
                    <option value="CONTACTED">Contacted</option>
                    <option value="INTERESTED">Interested</option>
                    <option value="CLOSED">Closed/Won</option>
                  </select>
                  <ChevronDown size={18} className="select-arrow" />
                </div>
              </div>

              <div className="modal-actions-premium">
                <button type="button" className="btn-text-cancel" onClick={onClose}>Cancel</button>
                <button type="submit" className="btn-add-submit">Add Contact</button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AddContactModal;
