import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from './components/ApperIcon';
import { navigationRoutes } from './config/routes';
import { cartService } from './services';

const Layout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItemCount, setCartItemCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const loadCartCount = async () => {
      try {
        const cart = await cartService.getCart();
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        setCartItemCount(count);
      } catch (error) {
        console.error('Failed to load cart count:', error);
      }
    };
    loadCartCount();
  }, [location]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsMobileMenuOpen(false);
    }
  };

  const handleCartClick = () => {
    navigate('/cart');
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background">
      {/* Header */}
      <header className="flex-shrink-0 bg-surface border-b border-gray-200 z-40 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <NavLink to="/" className="flex items-center space-x-2">
              <ApperIcon name="Store" className="w-8 h-8 text-accent" />
              <span className="text-xl font-bold text-primary">MarketFlow</span>
            </NavLink>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigationRoutes.map(route => (
                <NavLink
                  key={route.id}
                  to={route.path}
                  className={({ isActive }) =>
                    `flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? 'text-accent bg-accent/10'
                        : 'text-secondary hover:text-primary hover:bg-gray-100'
                    }`
                  }
                >
                  <ApperIcon name={route.icon} size={16} />
                  <span>{route.label}</span>
                </NavLink>
              ))}
            </nav>

            {/* Search Bar - Desktop */}
            <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all duration-200"
                />
                <ApperIcon 
                  name="Search" 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary" 
                  size={20} 
                />
              </div>
            </form>

            {/* Cart and Mobile Menu */}
            <div className="flex items-center space-x-4">
              {/* Cart Button */}
              <motion.button
                onClick={handleCartClick}
                className="relative p-2 text-secondary hover:text-primary transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ApperIcon name="ShoppingCart" size={24} />
                {cartItemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold"
                  >
                    {cartItemCount > 99 ? '99+' : cartItemCount}
                  </motion.span>
                )}
              </motion.button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-secondary hover:text-primary transition-colors duration-200"
              >
                <ApperIcon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-200 bg-surface"
            >
              <div className="px-4 py-4 space-y-4">
                {/* Mobile Search */}
                <form onSubmit={handleSearch} className="flex items-center">
                  <div className="relative w-full">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search products..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none"
                    />
                    <ApperIcon 
                      name="Search" 
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary" 
                      size={20} 
                    />
                  </div>
                </form>

                {/* Mobile Navigation */}
                <nav className="space-y-2">
                  {navigationRoutes.map(route => (
                    <NavLink
                      key={route.id}
                      to={route.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center space-x-3 px-3 py-3 rounded-md text-base font-medium transition-colors duration-200 ${
                          isActive
                            ? 'text-accent bg-accent/10'
                            : 'text-secondary hover:text-primary hover:bg-gray-100'
                        }`
                      }
                    >
                      <ApperIcon name={route.icon} size={20} />
                      <span>{route.label}</span>
                    </NavLink>
                  ))}
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;