import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  User, 
  Building2, 
  Mail, 
  MessageSquare, 
  ChevronDown,
  Filter,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';

const AddContactModal = ({ isOpen, onClose, onAdd }) => {
  const [step, setStep] = useState(1);

  const formik = useFormik({
    initialValues: {
      name: '',
      business: '',
      email: '',
      whatsapp: '',
      stage: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      business: Yup.string(),
      email: Yup.string().email('Invalid email address'),
      whatsapp: Yup.string().matches(/^[0-9]{10}$/, 'Must be exactly 10 digits').required('WhatsApp is required'),
      stage: Yup.string()
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        await onAdd(values);
        toast.success('Contact added successfully!');
        resetForm();
        setStep(1);
        onClose();
      } catch (err) {
        toast.error('Failed to add contact');
      }
    }
  });

  if (!isOpen) return null;

  const handleNext = async () => {
    // Basic step validation
    const errors = await formik.validateForm();
    if (step === 1 && errors.name) {
      formik.setFieldTouched('name', true);
      toast.error('Please enter a valid name');
      return;
    }
    if (step === 2 && errors.whatsapp) {
      formik.setFieldTouched('whatsapp', true);
      toast.error('Please enter a valid 10-digit WhatsApp number');
      return;
    }
    setStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    setStep((prev) => prev - 1);
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

            <form onSubmit={formik.handleSubmit} className="modal-form">
              <div className="step-indicator mb-6 flex gap-2 justify-center">
                <div className={`h-2 flex-1 rounded-full ${step >= 1 ? 'bg-teal-600' : 'bg-gray-200'}`}></div>
                <div className={`h-2 flex-1 rounded-full ${step >= 2 ? 'bg-teal-600' : 'bg-gray-200'}`}></div>
                <div className={`h-2 flex-1 rounded-full ${step >= 3 ? 'bg-teal-600' : 'bg-gray-200'}`}></div>
              </div>

              {step === 1 && (
                <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="form-grid">
                  <div className="form-group-premium">
                    <label>Full Name *</label>
                    <div className={`input-with-icon ${formik.touched.name && formik.errors.name ? 'border-red-500' : ''}`}>
                      <User size={18} className="field-icon" />
                      <input 
                        type="text" 
                        name="name"
                        placeholder="e.g. Advait Malhotra" 
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </div>
                    {formik.touched.name && formik.errors.name && <div className="text-red-500 text-xs mt-1">{formik.errors.name}</div>}
                  </div>

                  <div className="form-group-premium">
                    <label>Business Name</label>
                    <div className="input-with-icon">
                      <Building2 size={18} className="field-icon" />
                      <input 
                        type="text" 
                        name="business"
                        placeholder="e.g. Bangalore Tech Hub" 
                        value={formik.values.business}
                        onChange={formik.handleChange}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="form-grid">
                  <div className="form-group-premium">
                    <label>Email Address</label>
                    <div className={`input-with-icon ${formik.touched.email && formik.errors.email ? 'border-red-500' : ''}`}>
                      <Mail size={18} className="field-icon" />
                      <input 
                        type="email" 
                        name="email"
                        placeholder="advait.m@syncsetu.in" 
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </div>
                    {formik.touched.email && formik.errors.email && <div className="text-red-500 text-xs mt-1">{formik.errors.email}</div>}
                  </div>

                  <div className="form-group-premium">
                    <label>WhatsApp Number *</label>
                    <div className={`input-with-icon ${formik.touched.whatsapp && formik.errors.whatsapp ? 'border-red-500' : ''}`}>
                      <div className="prefix">
                         <MessageSquare size={16} />
                         <span>+91</span>
                      </div>
                      <input 
                        type="text" 
                        name="whatsapp"
                        className="with-prefix"
                        placeholder="98765 43210" 
                        value={formik.values.whatsapp}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </div>
                    {formik.touched.whatsapp && formik.errors.whatsapp && <div className="text-red-500 text-xs mt-1">{formik.errors.whatsapp}</div>}
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="form-group-premium full-width">
                  <label>Lead Stage</label>
                  <div className="input-with-icon select-wrapper">
                    <Filter size={18} className="field-icon" />
                    <select 
                      name="stage"
                      value={formik.values.stage}
                      onChange={formik.handleChange}
                    >
                      <option value="">Select Stage</option>
                      <option value="NEW">New</option>
                      <option value="CONTACTED">Contacted</option>
                      <option value="INTERESTED">Interested</option>
                      <option value="CLOSED">Closed/Won</option>
                    </select>
                    <ChevronDown size={18} className="select-arrow" />
                  </div>
                </motion.div>
              )}

              <div className="modal-actions-premium mt-8 flex justify-between items-center">
                {step > 1 ? (
                  <button type="button" className="btn-text-cancel flex items-center gap-2" onClick={handlePrev}>
                    <ArrowLeft size={16} /> Back
                  </button>
                ) : (
                  <button type="button" className="btn-text-cancel" onClick={onClose}>Cancel</button>
                )}
                
                {step < 3 ? (
                  <button type="button" className="btn-add-submit flex items-center gap-2" onClick={handleNext}>
                    Next <ArrowRight size={16} />
                  </button>
                ) : (
                  <button type="submit" className="btn-add-submit flex items-center gap-2" disabled={formik.isSubmitting}>
                    {formik.isSubmitting ? 'Adding...' : 'Add Contact'}
                  </button>
                )}
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AddContactModal;
