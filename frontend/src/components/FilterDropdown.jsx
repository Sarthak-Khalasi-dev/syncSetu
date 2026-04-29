import { motion, AnimatePresence } from 'framer-motion';
import { Check, X } from 'lucide-react';

const FilterDropdown = ({ isOpen, onClose, activeFilter, onFilterChange, options }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="filter-dropdown-wrapper" onClick={(e) => e.stopPropagation()}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="filter-card outline-card"
        >
          <div className="filter-header">
            <span>Filter By Status</span>
            <X size={14} className="cursor-pointer" onClick={onClose} />
          </div>
          <div className="filter-options">
            {options.map((option) => (
              <div 
                key={option.value} 
                className={`filter-option ${activeFilter === option.value ? 'active' : ''}`}
                onClick={() => {
                  onFilterChange(option.value);
                  onClose();
                }}
              >
                {option.label}
                {activeFilter === option.value && <Check size={14} className="check-icon" />}
              </div>
            ))}
          </div>
          <div className="filter-footer">
             <button className="btn-reset" onClick={() => { onFilterChange('ALL'); onClose(); }}>Reset Filter</button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default FilterDropdown;
