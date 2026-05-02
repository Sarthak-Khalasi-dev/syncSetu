import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, User } from 'lucide-react';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const LoginPage = () => {
  const navigate = useNavigate();
  const [loginMode, setLoginMode] = React.useState('login'); // login, whatsapp, otp
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [otp, setOtp] = React.useState(['', '', '', '', '', '']);

  const handleSendOTP = () => {
    if (phoneNumber.length === 10) {
      setLoginMode('otp');
    }
  };

  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleVerifyOTP = () => {
    const otpValue = otp.join('');
    if (otpValue.length === 6) {
      navigate('/dashboard');
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().min(6, 'Must be at least 6 characters').required('Required'),
    }),
    onSubmit: values => {
      navigate('/dashboard');
    },
  });

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="layout-container"
    >
      {/* Left Side: Mockup Visuals */}
      <div className="split-left">
        <div className="ui-mockup-wrapper-framer">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="main-card premium-glass"
          >
            <div className="header-row">
              <div className="icon-box-glow">
                <MessageSquare />
              </div>
              <div className="header-text">
                <h3>SyncSetu Hub</h3>
                <p>Real-time engagement without the noise.</p>
              </div>
            </div>

            <div className="chat-container">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="chat-bubble chat-left"
              >
                Hello! I saw your recent collection. Can we discuss a custom order for our team?
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="chat-bubble chat-right"
              >
                Absolutely! I'd love to help with that. Let's find a time to chat about your requirements.
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1 }}
                className="chat-bubble chat-left" 
                style={{ marginBottom: 0 }}
              >
                Perfect. Looking forward to it.
              </motion.div>
            </div>

            <div className="bottom-widgets">
              <div className="widget-card">
                <div className="widget-label">NEW LEADS</div>
                <div className="widget-value">12</div>
              </div>
              <div className="widget-card">
                <div className="widget-label">CONVERSION</div>
                <div className="widget-value">84%</div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            className="testimonial-card premium-shadow"
          >
            <div className="user-row">
              <div className="avatar-gradient">
                <User />
              </div>
              <div className="user-info">
                <div className="name">Julian Hayes</div>
                <div className="role">Verified SyncSetu Pro</div>
              </div>
            </div>
            <div className="testimonial-text">
              "The most peaceful CRM experience I've ever had. It just flows perfectly with our workflow."
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="split-right">
        <motion.div 
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="right-content-wrapper"
        >
          <div className="right-inner">
            <div className="brand-title">
              <div className="brand-logo-wrapper">
                <img src={logo} alt="SyncSetu Logo" className="brand-logo-img-v2" />
              </div>
              <span className="brand-name-v2">SyncSetu</span>
            </div>
          
          <h1 className="hero-title-v2">
            Quietly<br/>
            connected.
          </h1>
          
          <p className="hero-subtitle-v2">
            The premium workspace where client relationships become calm, productive conversations.
          </p>
          
            {loginMode === 'login' && (
              <>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-whatsapp-premium"
                  onClick={() => setLoginMode('whatsapp')}
                >
                  <MessageSquare size={20} fill="currentColor" /> Connect WhatsApp
                </motion.button>
                
                <div className="divider-premium">
                  <span>OR USE YOUR EMAIL</span>
                </div>
                
                <form onSubmit={formik.handleSubmit}>
                  <div className="form-group-premium">
                    <div className="form-label-row">
                      <label className="form-label-v2">Work Email</label>
                      {formik.touched.email && formik.errors.email ? (
                        <div className="error-text">{formik.errors.email}</div>
                      ) : null}
                    </div>
                    <input 
                      name="email"
                      type="email" 
                      className={`form-input-v2 ${formik.touched.email && formik.errors.email ? 'error' : ''}`}
                      placeholder="name@company.com" 
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                    />
                  </div>
                  
                  <div className="form-group-premium">
                    <div className="form-label-row">
                      <label className="form-label-v2">Password</label>
                      <a href="#" className="forgot-link-v2">FORGOT?</a>
                    </div>
                    {formik.touched.password && formik.errors.password ? (
                      <div className="error-text mb-1">{formik.errors.password}</div>
                    ) : null}
                    <input 
                      name="password"
                      type="password" 
                      className={`form-input-v2 ${formik.touched.password && formik.errors.password ? 'error' : ''}`}
                      placeholder="••••••••" 
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                    />
                  </div>
                  
                  <motion.button 
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    type="submit" 
                    className="btn-submit-premium"
                  >
                    Enter the Quiet
                  </motion.button>
                </form>
              </>
            )}

            {loginMode === 'whatsapp' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="whatsapp-flow-container"
              >
                <button className="btn-back-text" onClick={() => setLoginMode('login')}>← Back to email</button>
                <h2 className="flow-title">Login with WhatsApp</h2>
                <p className="flow-subtitle">We'll send a 6-digit code to verify your business number.</p>
                
                <div className="phone-input-wrapper-v2">
                  <div className="prefix">+91</div>
                  <input 
                    type="text" 
                    placeholder="98765 43210" 
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g,''))}
                    maxLength={10}
                    autoFocus
                  />
                </div>

                <motion.button 
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="btn-submit-premium"
                  onClick={handleSendOTP}
                  disabled={phoneNumber.length !== 10}
                >
                  Send OTP
                </motion.button>
              </motion.div>
            )}

            {loginMode === 'otp' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="otp-flow-container"
              >
                <button className="btn-back-text" onClick={() => setLoginMode('whatsapp')}>← Change number</button>
                <h2 className="flow-title">Verification</h2>
                <p className="flow-subtitle">Enter the code sent to +91 {phoneNumber}</p>
                
                <div className="otp-inputs">
                  {otp.map((data, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength="1"
                      className="otp-field"
                      value={data}
                      onChange={(e) => handleOtpChange(e.target, index)}
                      onFocus={(e) => e.target.select()}
                    />
                  ))}
                </div>

                <motion.button 
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="btn-submit-premium"
                  onClick={handleVerifyOTP}
                  disabled={otp.join('').length !== 6}
                >
                  Verify & Enter
                </motion.button>

                <div className="resend-text">
                  Didn't receive it? <a href="#">Resend Code</a>
                </div>
              </motion.div>
            )}
          </div>
          
          <div className="auth-footer-v2">
            Don't have an account? <a href="#">Talk to sales</a>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoginPage;
