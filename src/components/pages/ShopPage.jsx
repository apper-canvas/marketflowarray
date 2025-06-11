import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon'; // Alias import
import ProductCard from '@/components/molecules/ProductCard'; // Alias import
import FilterSidebar from '@/components/organisms/FilterSidebar'; // Alias import
import SkeletonLoader from '@/components/molecules/SkeletonLoader'; // Alias import
import ErrorState from '@/components/molecules/ErrorState'; // Alias import
import EmptyState from '@/components/molecules/EmptyState'; // Alias import
import Button from '@/components/atoms/Button'; // New import
import Select from '@/components/atoms/Select'; // New import
import { productService, cartService } from '@/services'; // Alias import

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [sortBy, setSortBy] = useState('name');
  const [filters, setFilters] = useState({
    category: '',
    priceRange: [0, 1000],
    brand: '',
    size: '',
    search: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    // Handle URL parameters
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    const search = params.get('search');
    
    if (category || search) {
      setFilters(prev => ({
        ...prev,
        category: category || '',
        search: search || ''
      }));
    }
  }, [location.search]);

  useEffect(() => {
    applyFilters();
  }, [products, filters, sortBy]);

  const loadProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await productService.getAll();
      setProducts(result);
    } catch (err) {
      setError(err.message || 'Failed to load products');
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...products];

    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter(product => 
        product.category.toLowerCase() === filters.category.toLowerCase()
      );
    }

    // Apply search filter
    if (filters.search) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        product.description.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Apply price range filter
    filtered = filtered.filter(product =>
      product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
    );

    // Apply brand filter
    if (filters.brand) {
      filtered = filtered.filter(product => product.brand === filters.brand);
    }

    // Apply size filter
    if (filters.size) {
      filtered = filtered.filter(product => 
        product.sizes && product.sizes.includes(filters.size)
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
  };

  const handleAddToCart = async (product, selectedSize = null) => {
    try {
      await cartService.addToCart({
        productId: product.id,
        quantity: 1,
        size: selectedSize || (product.sizes && product.sizes[0]) || '',
        price: product.price
      });
      toast.success(`${product.name} added to cart!`);
    } catch (error) {
      toast.error('Failed to add item to cart');
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const clearAllFilters = () => {
    setFilters({
      category: '',
      priceRange: [0, 1000],
      brand: '',
      size: '',
      search: ''
    });
    navigate('/shop');
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/4">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-32 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <SkeletonLoader count={8} type="product-grid" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ErrorState 
          message={error}
          onRetry={loadProducts}
        />
      </div>
    );
  }

  const hasActiveFilters = filters.category || filters.search || filters.brand || filters.size || 
    filters.priceRange[0] > 0 || filters.priceRange[1] < 1000;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filter Sidebar */}
        <div className="w-full lg:w-1/4">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden mb-4">
            <Button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-between w-full bg-white rounded-lg p-4 border border-gray-200"
            >
              <span className="font-medium text-primary">Filters</span>
              <ApperIcon name={showFilters ? "ChevronUp" : "ChevronDown"} size={20} />
            </Button>
          </div>

          <AnimatePresence>
            {(showFilters || window.innerWidth >= 1024) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="lg:opacity-100 lg:h-auto"
              >
                <FilterSidebar
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  products={products}
                  onClearAll={clearAllFilters}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-primary">
                {filters.search ? `Search Results for "${filters.search}"` : 
                 filters.category ? `${filters.category.charAt(0).toUpperCase() + filters.category.slice(1)} Products` : 
                 'All Products'}
              </h1>
              <p className="text-secondary mt-1">
                {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
              </p>
            </div>

            <div className="flex items-center gap-4">
              {/* Sort Dropdown */}
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 text-sm" // Pass specific class to Select atom
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </Select>

              {/* View Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <Button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded transition-colors duration-200 ${
                    viewMode === 'grid' 
                      ? 'bg-white text-primary shadow-sm' 
                      : 'text-secondary hover:text-primary'
                  }`}
                >
                  <ApperIcon name="Grid3X3" size={18} />
                </Button>
                <Button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded transition-colors duration-200 ${
                    viewMode === 'list' 
                      ? 'bg-white text-primary shadow-sm' 
                      : 'text-secondary hover:text-primary'
                  }`}
                >
                  <ApperIcon name="List" size={18} />
                </Button>
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="text-sm text-secondary">Active filters:</span>
              {filters.category && (
                <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm flex items-center gap-1">
                  Category: {filters.category}
                  <Button onClick={() => setFilters(prev => ({ ...prev, category: '' }))} className="p-0 bg-transparent hover:bg-transparent">
                    <ApperIcon name="X" size={14} />
                  </Button>
                </span>
              )}
              {filters.search && (
                <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm flex items-center gap-1">
                  Search: {filters.search}
                  <Button onClick={() => setFilters(prev => ({ ...prev, search: '' }))} className="p-0 bg-transparent hover:bg-transparent">
                    <ApperIcon name="X" size={14} />
                  </Button>
                </span>
              )}
              {filters.brand && (
                <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm flex items-center gap-1">
                  Brand: {filters.brand}
                  <Button onClick={() => setFilters(prev => ({ ...prev, brand: '' }))} className="p-0 bg-transparent hover:bg-transparent">
                    <ApperIcon name="X" size={14} />
                  </Button>
                </span>
              )}
              {filters.size && (
                <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm flex items-center gap-1">
                  Size: {filters.size}
                  <Button onClick={() => setFilters(prev => ({ ...prev, size: '' }))} className="p-0 bg-transparent hover:bg-transparent">
                    <ApperIcon name="X" size={14} />
                  </Button>
                </span>
              )}
              <Button 
                onClick={clearAllFilters}
                className="text-sm text-secondary hover:text-primary underline p-0 bg-transparent hover:bg-transparent"
              >
                Clear all
              </Button>
            </div>
          )}

          {/* Products Grid/List */}
          {filteredProducts.length === 0 ? (
            <EmptyState 
              title="No products found"
              description={hasActiveFilters ? "Try adjusting your filters to see more results" : "No products available at the moment"}
              actionLabel={hasActiveFilters ? "Clear Filters" : "Browse All"}
              onAction={hasActiveFilters ? clearAllFilters : () => navigate('/shop')}
            />
          ) : (
            <motion.div
              layout
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                  : 'space-y-4'
              }
            >
              <AnimatePresence>
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <ProductCard
                      product={product}
                      viewMode={viewMode}
                      onAddToCart={handleAddToCart}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;