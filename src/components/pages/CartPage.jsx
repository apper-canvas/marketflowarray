import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon'; // Alias import
import CartItem from '@/components/molecules/CartItem'; // Alias import
import SkeletonLoader from '@/components/molecules/SkeletonLoader'; // Alias import
import ErrorState from '@/components/molecules/ErrorState'; // Alias import
import EmptyState from '@/components/molecules/EmptyState'; // Alias import
import Button from '@/components/atoms/Button'; // New import
import { cartService, productService } from '@/services'; // Alias import

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    setLoading(true);
    setError(null);
    try {
      const cart = await cartService.getCart();
      setCartItems(cart);
      
      // Load product details for cart items
      const productIds = [...new Set(cart.map(item => item.productId))];
      const productPromises = productIds.map(id => productService.getById(id));
      const productResults = await Promise.all(productPromises);
      
      const productsMap = {};
      productResults.forEach(product => {
        productsMap[product.id] = product;
      });
      setProducts(productsMap);
    } catch (err) {
      setError(err.message || 'Failed to load cart');
      toast.error('Failed to load cart');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (productId, size, newQuantity) => {
    if (newQuantity < 1) return;
    
    try {
      await cartService.updateQuantity(productId, size, newQuantity);
      setCartItems(prev => 
        prev.map(item => 
          item.productId === productId && item.size === size 
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
      toast.success('Cart updated');
    } catch (error) {
      toast.error('Failed to update cart');
    }
  };

  const handleRemoveItem = async (productId, size) => {
    try {
      await cartService.removeFromCart(productId, size);
      setCartItems(prev => 
        prev.filter(item => !(item.productId === productId && item.size === size))
      );
      toast.success('Item removed from cart');
    } catch (error) {
      toast.error('Failed to remove item');
    }
  };

  const handleClearCart = async () => {
    try {
      await cartService.clearCart();
      setCartItems([]);
      toast.success('Cart cleared');
    } catch (error) {
      toast.error('Failed to clear cart');
    }
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateShipping = () => {
    const subtotal = calculateSubtotal();
    return subtotal > 50 ? 0 : 9.99;
  };

  const calculateTax = () => {
    const subtotal = calculateSubtotal();
    return subtotal * 0.08; // 8% tax
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping() + calculateTax();
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <SkeletonLoader count={3} type="cart-item" />
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="animate-pulse space-y-4">
              <div className="h-6 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ErrorState 
          message={error}
          onRetry={loadCart}
        />
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <EmptyState 
          title="Your cart is empty"
          description="Add some products to your cart to get started"
          actionLabel="Start Shopping"
          onAction={() => navigate('/shop')}
          icon="ShoppingCart"
        />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-primary">Shopping Cart</h1>
        <Button
          onClick={handleClearCart}
          className="text-error hover:text-error/80 text-sm font-medium transition-colors duration-200 p-0 bg-transparent hover:bg-transparent"
        >
          Clear Cart
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence>
            {cartItems.map((item) => {
              const product = products[item.productId];
              if (!product) return null;

              return (
                <motion.div
                  key={`${item.productId}-${item.size}`}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <CartItem
                    item={item}
                    product={product}
                    onUpdateQuantity={handleUpdateQuantity}
                    onRemove={handleRemoveItem}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg p-6 shadow-sm h-fit sticky top-4">
          <h2 className="text-lg font-semibold text-primary mb-4">Order Summary</h2>
          
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-secondary">
              <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
              <span>${calculateSubtotal().toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between text-secondary">
              <span>Shipping</span>
              <span>
                {calculateShipping() === 0 ? (
                  <span className="text-success font-medium">FREE</span>
                ) : (
                  `$${calculateShipping().toFixed(2)}`
                )}
              </span>
            </div>
            
            <div className="flex justify-between text-secondary">
              <span>Tax</span>
              <span>${calculateTax().toFixed(2)}</span>
            </div>
            
            <div className="border-t pt-3">
              <div className="flex justify-between text-lg font-semibold text-primary">
                <span>Total</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>

          {calculateShipping() > 0 && (
            <div className="mb-4 p-3 bg-accent/10 rounded-lg">
              <p className="text-sm text-accent">
                <ApperIcon name="Truck" size={16} className="inline mr-1" />
                Add ${(50 - calculateSubtotal()).toFixed(2)} more for free shipping!
              </p>
            </div>
          )}

          <Button
            onClick={() => navigate('/checkout')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-accent hover:bg-accent/90 text-white py-4 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <ApperIcon name="CreditCard" size={20} />
            <span>Proceed to Checkout</span>
          </Button>

          <Button
            onClick={() => navigate('/shop')}
            className="w-full mt-3 text-accent hover:text-accent/80 py-2 text-sm font-medium transition-colors duration-200 p-0 bg-transparent hover:bg-transparent"
          >
            Continue Shopping
          </Button>

          {/* Trust Badges */}
          <div className="mt-6 pt-6 border-t">
            <div className="space-y-2 text-xs text-secondary">
              <div className="flex items-center space-x-2">
                <ApperIcon name="Shield" size={14} />
                <span>Secure SSL Encryption</span>
              </div>
              <div className="flex items-center space-x-2">
                <ApperIcon name="RotateCcw" size={14} />
                <span>30-Day Return Policy</span>
              </div>
              <div className="flex items-center space-x-2">
                <ApperIcon name="Headphones" size={14} />
                <span>24/7 Customer Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;