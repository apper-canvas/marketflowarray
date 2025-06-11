import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ApperIcon from './ApperIcon';

const CartItem = ({ item, product, onUpdateQuantity, onRemove }) => {
  const navigate = useNavigate();

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return;
    onUpdateQuantity(item.productId, item.size, newQuantity);
  };

  const handleRemove = () => {
    onRemove(item.productId, item.size);
  };

  const handleProductClick = () => {
    navigate(`/product/${item.productId}`);
  };

  return (
    <motion.div
      layout
      className="bg-white rounded-lg p-4 shadow-sm border border-gray-200"
    >
      <div className="flex items-center space-x-4">
        {/* Product Image */}
        <div 
          className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:opacity-75 transition-opacity duration-200"
          onClick={handleProductClick}
        >
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <h3 
            className="font-semibold text-primary hover:text-accent cursor-pointer transition-colors duration-200"
            onClick={handleProductClick}
          >
            {product.name}
          </h3>
          <div className="text-sm text-secondary space-y-1">
            <p>Brand: {product.brand}</p>
            {item.size && <p>Size: {item.size}</p>}
            <p className="text-lg font-semibold text-accent">${item.price}</p>
          </div>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => handleQuantityChange(item.quantity - 1)}
            disabled={item.quantity <= 1}
            className="p-1 border border-gray-300 rounded hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ApperIcon name="Minus" size={16} />
          </button>
          
          <span className="text-lg font-semibold min-w-8 text-center">
            {item.quantity}
          </span>
          
          <button
            onClick={() => handleQuantityChange(item.quantity + 1)}
            className="p-1 border border-gray-300 rounded hover:bg-gray-50 transition-colors duration-200"
          >
            <ApperIcon name="Plus" size={16} />
          </button>
        </div>

        {/* Total Price */}
        <div className="text-right">
          <p className="text-lg font-bold text-primary">
            ${(item.price * item.quantity).toFixed(2)}
          </p>
        </div>

        {/* Remove Button */}
        <button
          onClick={handleRemove}
          className="p-2 text-error hover:bg-error/10 rounded-lg transition-colors duration-200"
        >
          <ApperIcon name="Trash2" size={18} />
        </button>
      </div>
    </motion.div>
  );
};

export default CartItem;