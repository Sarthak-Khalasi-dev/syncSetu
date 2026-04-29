import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, User } from 'lucide-react';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const LoginPage = () => {
  const navigate = useNavigate();

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
      className="layout-container"
    >
      {/* Left Side: Mockup Visuals */}
      <div className="split-left">
        <div className="ui-mockup-wrapper">
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="main-card"
          >
            <div className="header-row">
              <div className="icon-box">
                <MessageSquare />
              </div>
              <div className="header-text">
                <h3>Quiet Conversations</h3>
                <p>Real-time engagement without the noise.</p>
              </div>
            </div>

            <div className="chat-container">
              <div className="chat-bubble chat-left">
                Hello! I saw your recent collection. Can we discuss a custom order for our team?
              </div>
              <div className="chat-bubble chat-right">
                Absolutely! I'd love to help with that. Let's find a time to chat about your specific requirements.
              </div>
              <div className="chat-bubble chat-left" style={{ marginBottom: 0 }}>
                Perfect. Looking forward to it.
              </div>
            </div>

            <div className="bottom-widgets">
              <div className="widget-card">
                <div className="widget-label">NEW LEADS</div>
                <div className="widget-value">12</div>
              </div>
              <div className="widget-card" style={{ opacity: 0 }}></div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ x: 40, y: 20, opacity: 0 }}
            animate={{ x: 0, y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="testimonial-card"
          >
            <div className="user-row">
              <div className="avatar">
                <User />
              </div>
              <div className="user-info">
                <div className="name">Julian Hayes</div>
                <div className="role">SYNCSETU USER</div>
              </div>
            </div>
            <div className="testimonial-text">
              "The most peaceful CRM experience I've ever had. It just flows."
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="split-right">
        <div className="right-content-wrapper">
          <div className="right-inner">
            <div className="brand-title">
              <img src={logo} alt="SyncSetu Logo" className="brand-logo-img" />
              SyncSetu
            </div>
          
          <h1 className="hero-title">
            Quietly<br/>
            connected.
          </h1>
          
          <p className="hero-subtitle">
            The premium workspace where client relationships become calm conversations.
          </p>
          
          <button className="btn-whatsapp">
            <MessageSquare size={20} fill="currentColor" /> Connect WhatsApp
          </button>
          
          <div className="divider">
            <span>OR USE YOUR EMAIL</span>
          </div>
          
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <div className="form-label-row">
                <label className="form-label">Work Email</label>
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-red-500 text-xs font-semibold">{formik.errors.email}</div>
                ) : null}
              </div>
              <input 
                name="email"
                type="email" 
                className={`form-input ${formik.touched.email && formik.errors.email ? 'border-red-500' : ''}`}
                placeholder="name@company.com" 
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
            </div>
            
            <div className="form-group">
              <div className="form-label-row">
                <label className="form-label">Password</label>
                <a href="#" className="forgot-link">FORGOT?</a>
              </div>
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500 text-xs font-semibold mb-1">{formik.errors.password}</div>
              ) : null}
              <input 
                name="password"
                type="password" 
                className={`form-input ${formik.touched.password && formik.errors.password ? 'border-red-500' : ''}`}
                placeholder="••••••••" 
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
            </div>
            
            <button type="submit" className="btn-submit">
              Enter the Quiet
            </button>
          </form>
          </div>
          
          <div className="auth-footer">
            Don't have an account? <a href="#">Talk to sales</a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LoginPage;
