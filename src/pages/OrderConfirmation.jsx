import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ApperIcon from '../components/ApperIcon';
import SkeletonLoader from '../components/SkeletonLoader';
import ErrorState from '../components/ErrorState';
import { orderService, productService } from '../services';

const OrderConfirmation = () => {
  const [order, setOrder] = useState(null);
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { orderId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (orderId) {
      loadOrder();
    }
  }, [orderId]);

  const loadOrder = async () => {
    setLoading(true);
    setError(null);
    try {
      const orderData = await orderService.getById(orderId);
      setOrder(orderData);
      
      // Load product details
      const productIds = [...new Set(orderData.items.map(item => item.productId))];
      const productPromises = productIds.map(id => productService.getById(id));
      const productResults = await Promise.all(productPromises);
      
      const productsMap = {};
      productResults.forEach(product => {
        productsMap[product.id] = product;
      });
      setProducts(productsMap);
    } catch (err) {
      setError(err.message || 'Failed to load order');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SkeletonLoader count={1} type="order-confirmation" />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ErrorState 
          message={error || 'Order not found'}
          onRetry={loadOrder}
        />
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getEstimatedDelivery = () => {
    const orderDate = new Date(order.createdAt);
    const deliveryDate = new Date(orderDate.getTime() + (5 * 24 * 60 * 60 * 1000)); // 5 days
    return deliveryDate.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Success Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="bg-success/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
          <ApperIcon name="CheckCircle" className="text-success" size={40} />
        </div>
        <h1 className="text-3xl font-bold text-primary mb-2">Order Confirmed!</h1>
        <p className="text-lg text-secondary">
          Thank you for your purchase. Your order has been placed successfully.
        </p>
      </motion.div>

      {/* Order Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Order Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg p-6 shadow-sm"
        >
          <h2 className="text-xl font-semibold text-primary mb-4">Order Information</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-secondary">Order Number:</span>
              <span className="font-semibold text-primary">#{order.orderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary">Order Date:</span>
              <span className="text-primary">{formatDate(order.createdAt)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary">Status:</span>
              <span className="bg-warning/10 text-warning px-2 py-1 rounded-full text-sm font-medium">
                {order.status}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary">Estimated Delivery:</span>
              <span className="text-primary">{getEstimatedDelivery()}</span>
            </div>
          </div>
        </motion.div>

        {/* Shipping Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg p-6 shadow-sm"
        >
          <h2 className="text-xl font-semibold text-primary mb-4">Shipping Address</h2>
          <div className="text-secondary space-y-1">
            <p className="font-medium text-primary">
              {order.shipping.firstName} {order.shipping.lastName}
            </p>
            <p>{order.shipping.address}</p>
            <p>{order.shipping.city}, {order.shipping.state} {order.shipping.zipCode}</p>
            <p>{order.shipping.country}</p>
            {order.shipping.phone && <p>Phone: {order.shipping.phone}</p>}
          </div>
        </motion.div>
      </div>

      {/* Order Items */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-lg shadow-sm mb-8"
      >
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-primary">Order Items</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {order.items.map((item) => {
            const product = products[item.productId];
            if (!product) return null;

            return (
              <div key={`${item.productId}-${item.size}`} className="p-6 flex items-center space-x-4">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-primary">{product.name}</h3>
                  <div className="text-sm text-secondary space-x-4">
                    {item.size && <span>Size: {item.size}</span>}
                    <span>Qty: {item.quantity}</span>
                  </div>
                </div>
                <div className="text-lg font-semibold text-primary">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Order Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-lg p-6 shadow-sm mb-8"
      >
        <h2 className="text-xl font-semibold text-primary mb-4">Order Summary</h2>
        <div className="space-y-3">
          <div className="flex justify-between text-secondary">
            <span>Subtotal</span>
            <span>${order.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-secondary">
            <span>Shipping</span>
            <span>{order.shipping === 0 ? 'FREE' : `$${order.shipping.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between text-secondary">
            <span>Tax</span>
            <span>${order.tax.toFixed(2)}</span>
          </div>
          <div className="border-t pt-3">
            <div className="flex justify-between text-lg font-semibold text-primary">
              <span>Total</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Next Steps */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-accent/5 rounded-lg p-6 mb-8"
      >
        <h3 className="text-lg font-semibold text-primary mb-3">What's Next?</h3>
        <div className="space-y-2 text-secondary">
          <div className="flex items-center space-x-2">
            <ApperIcon name="Mail" size={16} />
            <span>You'll receive an email confirmation shortly</span>
          </div>
          <div className="flex items-center space-x-2">
            <ApperIcon name="Package" size={16} />
            <span>Your order will be processed within 1-2 business days</span>
          </div>
          <div className="flex items-center space-x-2">
            <ApperIcon name="Truck" size={16} />
            <span>You'll get tracking information once your order ships</span>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <motion.button
          onClick={() => navigate('/shop')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-accent hover:bg-accent/90 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
        >
          Continue Shopping
        </motion.button>
        <motion.button
          onClick={() => window.print()}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white hover:bg-gray-50 text-primary px-8 py-3 rounded-lg font-semibold border border-gray-300 transition-colors duration-200 flex items-center space-x-2"
        >
          <ApperIcon name="Printer" size={16} />
          <span>Print Order</span>
        </motion.button>
      </div>
    </div>
  );
};

export default OrderConfirmation;