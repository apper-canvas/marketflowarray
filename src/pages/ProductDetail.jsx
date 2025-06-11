import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '../components/ApperIcon';
import ProductImages from '../components/ProductImages';
import ReviewsList from '../components/ReviewsList';
import SkeletonLoader from '../components/SkeletonLoader';
import ErrorState from '../components/ErrorState';
import { productService, reviewService, cartService } from '../services';

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      loadProduct();
      loadReviews();
    }
  }, [id]);

  const loadProduct = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await productService.getById(id);
      setProduct(result);
      if (result.sizes && result.sizes.length > 0) {
        setSelectedSize(result.sizes[0]);
      }
    } catch (err) {
      setError(err.message || 'Failed to load product');
      toast.error('Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  const loadReviews = async () => {
    try {
      const result = await reviewService.getByProductId(id);
      setReviews(result);
    } catch (err) {
      console.error('Failed to load reviews:', err);
    }
  };

  const handleAddToCart = async () => {
    if (!product) return;
    
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      toast.error('Please select a size');
      return;
    }

    setAddingToCart(true);
    try {
      await cartService.addToCart({
        productId: product.id,
        quantity,
        size: selectedSize,
        price: product.price
      });
      toast.success(`${product.name} added to cart!`);
    } catch (error) {
      toast.error('Failed to add item to cart');
    } finally {
      setAddingToCart(false);
    }
  };

  const handleBuyNow = async () => {
    await handleAddToCart();
    navigate('/cart');
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="aspect-square bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="grid grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-square bg-gray-200 rounded-lg animate-pulse"></div>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
            <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ErrorState 
          message={error || 'Product not found'}
          onRetry={loadProduct}
        />
      </div>
    );
  }

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : product.rating;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-secondary mb-8">
        <button onClick={() => navigate('/shop')} className="hover:text-primary">
          Shop
        </button>
        <ApperIcon name="ChevronRight" size={16} />
        <button 
          onClick={() => navigate(`/shop?category=${product.category.toLowerCase()}`)}
          className="hover:text-primary"
        >
          {product.category}
        </button>
        <ApperIcon name="ChevronRight" size={16} />
        <span className="text-primary">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <ProductImages images={product.images} productName={product.name} />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-primary mb-2">{product.name}</h1>
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <ApperIcon
                    key={i}
                    name="Star"
                    size={16}
                    className={i < Math.round(averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                  />
                ))}
                <span className="text-sm text-secondary ml-2">
                  ({reviews.length} review{reviews.length !== 1 ? 's' : ''})
                </span>
              </div>
              <span className="text-sm text-secondary">Brand: {product.brand}</span>
            </div>
            <div className="flex items-center space-x-2 mb-6">
              <span className="text-3xl font-bold text-accent">${product.price}</span>
              {product.inStock ? (
                <span className="bg-success/10 text-success px-3 py-1 rounded-full text-sm font-medium">
                  In Stock
                </span>
              ) : (
                <span className="bg-error/10 text-error px-3 py-1 rounded-full text-sm font-medium">
                  Out of Stock
                </span>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-primary mb-3">Description</h3>
            <p className="text-secondary leading-relaxed">{product.description}</p>
          </div>

          {/* Size Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-primary mb-3">Size</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-lg transition-all duration-200 ${
                      selectedSize === size
                        ? 'border-accent bg-accent text-white'
                        : 'border-gray-300 hover:border-accent hover:bg-accent/5'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selection */}
          <div>
            <h3 className="text-lg font-semibold text-primary mb-3">Quantity</h3>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                disabled={quantity <= 1}
              >
                <ApperIcon name="Minus" size={16} />
              </button>
              <span className="text-lg font-semibold min-w-12 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <ApperIcon name="Plus" size={16} />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <motion.button
              onClick={handleAddToCart}
              disabled={!product.inStock || addingToCart}
              whileHover={{ scale: product.inStock ? 1.02 : 1 }}
              whileTap={{ scale: product.inStock ? 0.98 : 1 }}
              className={`w-full py-4 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2 ${
                product.inStock
                  ? 'bg-accent hover:bg-accent/90 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {addingToCart ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <ApperIcon name="ShoppingCart" size={20} />
                  <span>Add to Cart</span>
                </>
              )}
            </motion.button>

            <motion.button
              onClick={handleBuyNow}
              disabled={!product.inStock || addingToCart}
              whileHover={{ scale: product.inStock ? 1.02 : 1 }}
              whileTap={{ scale: product.inStock ? 0.98 : 1 }}
              className={`w-full py-4 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2 ${
                product.inStock
                  ? 'bg-primary hover:bg-primary/90 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <ApperIcon name="CreditCard" size={20} />
              <span>Buy Now</span>
            </motion.button>
          </div>

          {/* Trust Badges */}
          <div className="border-t pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="flex items-center justify-center space-x-2 text-sm text-secondary">
                <ApperIcon name="Truck" size={16} />
                <span>Free Shipping</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-sm text-secondary">
                <ApperIcon name="Shield" size={16} />
                <span>Secure Payment</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-sm text-secondary">
                <ApperIcon name="RotateCcw" size={16} />
                <span>Easy Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-16">
        <ReviewsList reviews={reviews} productId={product.id} />
      </div>
    </div>
  );
};

export default ProductDetail;