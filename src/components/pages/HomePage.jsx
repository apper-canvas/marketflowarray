import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon'; // Alias import
import MainFeature from '@/components/organisms/MainFeature'; // Alias import
import Button from '@/components/atoms/Button'; // New import

const HomePage = () => {
  const navigate = useNavigate();

  const categories = [
    { name: 'Electronics', icon: 'Smartphone', count: '200+ items' },
    { name: 'Clothing', icon: 'Shirt', count: '150+ items' },
    { name: 'Home & Garden', icon: 'Home', count: '100+ items' },
    { name: 'Sports', icon: 'Dumbbell', count: '80+ items' }
  ];

  return (
    <div className="min-h-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Shop Smarter with MarketFlow
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl md:text-2xl mb-8 text-gray-200"
            >
              Discover amazing products at unbeatable prices
            </motion.p>
            <Button
              onClick={() => navigate('/shop')}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-200"
            >
              Start Shopping
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Shop by Category</h2>
            <p className="text-lg text-secondary">Find exactly what you're looking for</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => navigate(`/shop?category=${category.name.toLowerCase()}`)}
                className="bg-white rounded-lg p-6 text-center cursor-pointer border border-gray-200 hover:shadow-lg transition-all duration-200 hover:scale-102"
              >
                <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ApperIcon name={category.icon} className="text-accent" size={32} />
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2">{category.name}</h3>
                <p className="text-secondary">{category.count}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Feature - Featured Products */}
      <MainFeature />

      {/* Trust Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ApperIcon name="Truck" className="text-accent" size={32} />
              </div>
              <h3 className="text-lg font-semibold text-primary mb-2">Free Shipping</h3>
              <p className="text-secondary">On orders over $50</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ApperIcon name="Shield" className="text-accent" size={32} />
              </div>
              <h3 className="text-lg font-semibold text-primary mb-2">Secure Payment</h3>
              <p className="text-secondary">100% secure transactions</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ApperIcon name="RotateCcw" className="text-accent" size={32} />
              </div>
              <h3 className="text-lg font-semibold text-primary mb-2">Easy Returns</h3>
              <p className="text-secondary">30-day return policy</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;