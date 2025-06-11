import { useNavigate } from 'react-router-dom';
import ApperIcon from './ApperIcon';

const OrderSummary = ({ items, products, subtotal, shipping, tax, total }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm sticky top-4">
      <h2 className="text-lg font-semibold text-primary mb-4">Order Summary</h2>
      
      {/* Items */}
      <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
        {items.map((item) => {
          const product = products[item.productId];
          if (!product) return null;
          
          return (
            <div key={`${item.productId}-${item.size}`} className="flex items-center space-x-3">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-12 h-12 object-cover rounded-lg"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-primary truncate">{product.name}</p>
                <div className="text-xs text-secondary">
                  {item.size && <span>Size: {item.size} • </span>}
                  <span>Qty: {item.quantity}</span>
                </div>
              </div>
              <p className="text-sm font-semibold text-primary">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          );
        })}
      </div>
      
      {/* Totals */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-secondary">
          <span>Subtotal ({items.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-secondary">
          <span>Shipping</span>
          <span>
            {shipping === 0 ? (
              <span className="text-success font-medium">FREE</span>
            ) : (
              `$${shipping.toFixed(2)}`
            )}
          </span>
        </div>
        
        <div className="flex justify-between text-secondary">
          <span>Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        
        <div className="border-t pt-3">
          <div className="flex justify-between text-lg font-semibold text-primary">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Free Shipping Notice */}
      {shipping > 0 && (
        <div className="mb-4 p-3 bg-accent/10 rounded-lg">
          <p className="text-sm text-accent">
            <ApperIcon name="Truck" size={16} className="inline mr-1" />
            Add ${(50 - subtotal).toFixed(2)} more for free shipping!
          </p>
        </div>
      )}

      {/* Continue Shopping Link */}
      <button
        onClick={() => navigate('/shop')}
        className="w-full text-accent hover:text-accent/80 py-2 text-sm font-medium transition-colors duration-200 flex items-center justify-center space-x-1"
      >
        <ApperIcon name="ArrowLeft" size={14} />
        <span>Continue Shopping</span>
      </button>

      {/* Trust Badges */}
      <div className="mt-6 pt-6 border-t">
        <div className="space-y-2 text-xs text-secondary">
          <div className="flex items-center space-x-2">
            <ApperIcon name="Shield" size={14} />
            <span>SSL Secure Checkout</span>
          </div>
          <div className="flex items-center space-x-2">
            <ApperIcon name="RotateCcw" size={14} />
            <span>30-Day Money Back Guarantee</span>
          </div>
          <div className="flex items-center space-x-2">
            <ApperIcon name="Headphones" size={14} />
            <span>24/7 Customer Support</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;