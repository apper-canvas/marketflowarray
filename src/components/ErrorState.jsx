import { motion } from 'framer-motion';
import ApperIcon from './ApperIcon';

const ErrorState = ({ message, onRetry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-12"
    >
      <div className="bg-error/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
        <ApperIcon name="AlertCircle" className="text-error" size={32} />
      </div>
      <h3 className="text-lg font-semibold text-primary mb-2">Something went wrong</h3>
      <p className="text-secondary mb-6 max-w-md mx-auto">{message}</p>
      <motion.button
        onClick={onRetry}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-2 mx-auto"
      >
        <ApperIcon name="RotateCcw" size={16} />
        <span>Try Again</span>
      </motion.button>
    </motion.div>
  );
};

export default ErrorState;