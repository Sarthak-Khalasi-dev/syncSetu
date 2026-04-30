import { motion } from 'framer-motion';

const ComingSoonPage = ({ title }) => {
  return (
    <div className="page-content-wrapper">
      <main className="main-content flex items-center justify-center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
          style={{ textAlign: 'center' }}
        >
          <h1 className="page-title-bold" style={{ fontSize: '48px', marginBottom: '16px' }}>{title}</h1>
          <p style={{ color: '#8c9c99', fontSize: '18px' }}>This feature is coming soon to SyncSetu!</p>
          <div style={{ marginTop: '32px', padding: '48px', background: 'white', borderRadius: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.02)' }}>
             <p style={{ fontWeight: '700', color: '#125143' }}>We're working hard to quiet the noise for you.</p>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default ComingSoonPage;
