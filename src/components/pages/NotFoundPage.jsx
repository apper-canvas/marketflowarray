import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon'; // Alias import
import Button from '@/components/atoms/Button'; // New import

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mb-8"
        >
          <ApperIcon name="Package" className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-primary mb-4">Page Not Found</h2>
          <p className="text-lg text-secondary mb-8 max-w-md">
            Sorry, the page you're looking for doesn't exist. Let's get you back to shopping!
          </p>
        </motion.div>

        <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
          <Button
            onClick={() => navigate('/shop')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
          >
            Browse Products
          </Button>
          <Button
            onClick={() => navigate('/')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto bg-white hover:bg-gray-50 text-primary px-6 py-3 rounded-lg font-semibold border border-gray-300 transition-colors duration-200"
          >
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;