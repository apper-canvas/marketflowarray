import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon'; // Alias import
import Button from '@/components/atoms/Button'; // New import

const ProductCard = ({ product, viewMode = 'grid', onAddToCart }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    onAddToCart(product);
  };

  if (viewMode === 'list') {
    return (
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 cursor-pointer hover:shadow-md transition-all duration-200"
        onClick={handleCardClick}
      >
        <div className="flex items-center space-x-4">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-24 h-24 object-cover rounded-lg"
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-primary mb-1 truncate">{product.name}</h3>
            <p className="text-sm text-secondary mb-2 line-clamp-2">{product.description}</p>
            <div className="flex items-center space-x-2 mb-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <ApperIcon
                    key={i}
                    name="Star"
                    size={14}
                    className={i < Math.round(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                  />
                ))}
              </div>
              <span className="text-sm text-secondary">({product.reviewCount})</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-accent">${product.price}</span>
              <div className="flex items-center space-x-2">
                {product.inStock ? (
                  <span className="text-xs text-success bg-success/10 px-2 py-1 rounded-full">In Stock</span>
                ) : (
                  <span className="text-xs text-error bg-error/10 px-2 py-1 rounded-full">Out of Stock</span>
                )}
                <Button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  whileHover={{ scale: product.inStock ? 1.05 : 1 }}
                  whileTap={{ scale: product.inStock ? 0.95 : 1 }}
                  className={`p-2 rounded-lg transition-colors duration-200 ${
                    product.inStock
                      ? 'bg-accent hover:bg-accent/90 text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <ApperIcon name="ShoppingCart" size={16} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden cursor-pointer hover:shadow-md transition-all duration-200"
      onClick={handleCardClick}
    >
      <div className="relative">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full aspect-square object-cover"
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-error text-white px-3 py-1 rounded-full text-sm font-medium">
              Out of Stock
            </span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-primary mb-2 line-clamp-2">{product.name}</h3>
        
        <div className="flex items-center space-x-2 mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <ApperIcon
                key={i}
                name="Star"
                size={14}
                className={i < Math.round(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
              />
            ))}
          </div>
          <span className="text-sm text-secondary">({product.reviewCount})</span>
        </div>

        <div className="flex items-center justify-between mb-3">
          <span className="text-xl font-bold text-accent">${product.price}</span>
          <span className="text-sm text-secondary">{product.brand}</span>
        </div>

        <Button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          whileHover={{ scale: product.inStock ? 1.05 : 1 }}
          whileTap={{ scale: product.inStock ? 0.95 : 1 }}
          className={`w-full py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2 ${
            product.inStock
              ? 'bg-accent hover:bg-accent/90 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <ApperIcon name="ShoppingCart" size={16} />
          <span>Add to Cart</span>
        </Button>
      </div>
    </motion.div>
  );
};

export default ProductCard;