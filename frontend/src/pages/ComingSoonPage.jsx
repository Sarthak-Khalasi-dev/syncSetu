import { motion } from 'framer-motion';
import TopHeader from '../components/TopHeader';

const ComingSoonPage = ({ title }) => {
  return (
    <div className="page-content-wrapper">
      <main className="main-content">
        <TopHeader title={title} />
        
        <div className="flex items-center justify-center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center"
            style={{ textAlign: 'center' }}
          >
            <h1 className="page-title-bold" style={{ fontSize: '48px', marginBottom: '16px' }}>{title}</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '18px' }}>This feature is coming soon to SyncSetu!</p>
            <div style={{ marginTop: '32px', padding: '48px', background: 'var(--white)', borderRadius: '24px', boxShadow: 'var(--premium-shadow)' }}>
               <p style={{ fontWeight: '700', color: 'var(--teal-brand)' }}>We're working hard to quiet the noise for you.</p>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default ComingSoonPage;
