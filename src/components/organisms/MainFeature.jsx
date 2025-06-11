import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon'; // Alias import
import ProductCard from '@/components/molecules/ProductCard'; // Alias import
import SkeletonLoader from '@/components/molecules/SkeletonLoader'; // Alias import
import Button from '@/components/atoms/Button'; // New import
import { productService, cartService } from '@/services'; // Alias import

const MainFeature = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadFeaturedProducts();
  }, []);

  const loadFeaturedProducts = async () => {
    setLoading(true);
    try {
      const products = await productService.getAll();
      // Get top 4 highest rated products
      const featured = products
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 4);
      setFeaturedProducts(featured);
    } catch (error) {
      console.error('Failed to load featured products:', error);
    } finally {
      setLoading(false);
    }
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

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">Featured Products</h2>
          <p className="text-lg text-secondary">Discover our most popular items</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <SkeletonLoader count={4} type="product-card" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard
                  product={product}
                  viewMode="grid"
                  onAddToCart={handleAddToCart}
                />
              </motion.div>
            ))}
          </div>
        )}

        <div className="text-center">
          <Button
            onClick={() => navigate('/shop')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 inline-flex items-center space-x-2"
          >
            <span>View All Products</span>
            <ApperIcon name="ArrowRight" size={16} />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MainFeature;