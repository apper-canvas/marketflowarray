import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon'; // Alias import
import CheckoutSteps from '@/components/molecules/CheckoutSteps'; // Alias import
import ShippingForm from '@/components/organisms/ShippingForm'; // Alias import
import PaymentForm from '@/components/organisms/PaymentForm'; // Alias import
import OrderSummary from '@/components/organisms/OrderSummary'; // Alias import
import SkeletonLoader from '@/components/molecules/SkeletonLoader'; // Alias import
import ErrorState from '@/components/molecules/ErrorState'; // Alias import
import FormField from '@/components/molecules/FormField'; // New import
import Button from '@/components/atoms/Button'; // New import
import { cartService, productService, orderService } from '@/services'; // Alias import

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [processingOrder, setProcessingOrder] = useState(false);
  
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  });
  
  const [billingInfo, setBillingInfo] = useState({
    sameAsShipping: true,
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  });
  
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    setLoading(true);
    setError(null);
    try {
      const cart = await cartService.getCart();
      if (cart.length === 0) {
        navigate('/cart');
        return;
      }
      
      setCartItems(cart);
      
      // Load product details
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

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateShipping = () => {
    const subtotal = calculateSubtotal();
    return subtotal > 50 ? 0 : 9.99;
  };

  const calculateTax = () => {
    const subtotal = calculateSubtotal();
    return subtotal * 0.08;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping() + calculateTax();
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        return shippingInfo.firstName && shippingInfo.lastName && shippingInfo.email && 
               shippingInfo.address && shippingInfo.city && shippingInfo.state && shippingInfo.zipCode;
      case 2:
        if (billingInfo.sameAsShipping) return true;
        return billingInfo.firstName && billingInfo.lastName && billingInfo.address && 
               billingInfo.city && billingInfo.state && billingInfo.zipCode;
      case 3:
        return paymentInfo.cardNumber && paymentInfo.expiryDate && paymentInfo.cvv && paymentInfo.cardholderName;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    } else {
      toast.error('Please fill in all required fields');
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handlePlaceOrder = async () => {
    if (!validateStep(3)) {
      toast.error('Please fill in all required fields');
      return;
    }

    setProcessingOrder(true);
    try {
      const orderData = {
        items: cartItems,
        shipping: shippingInfo,
        billing: billingInfo.sameAsShipping ? shippingInfo : billingInfo,
        payment: paymentInfo,
        subtotal: calculateSubtotal(),
        shipping: calculateShipping(),
        tax: calculateTax(),
        total: calculateTotal()
      };

      const order = await orderService.create(orderData);
      await cartService.clearCart();
      
      toast.success('Order placed successfully!');
      navigate(`/order-confirmation/${order.orderId}`);
    } catch (error) {
      toast.error('Failed to place order. Please try again.');
    } finally {
      setProcessingOrder(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <SkeletonLoader count={1} type="checkout-form" />
          </div>
          <div>
            <SkeletonLoader count={1} type="order-summary" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ErrorState 
          message={error}
          onRetry={loadCart}
        />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-4">Checkout</h1>
        <CheckoutSteps currentStep={currentStep} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Forms */}
        <div className="lg:col-span-2">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white rounded-lg p-6 shadow-sm"
          >
            {currentStep === 1 && (
              <ShippingForm
                data={shippingInfo}
                onChange={setShippingInfo}
                onNext={handleNext}
              />
            )}

            {currentStep === 2 && (
              <div>
                <h2 className="text-xl font-semibold text-primary mb-6">Billing Information</h2>
                
                <div className="mb-6">
                  <FormField
                    type="checkbox"
                    label="Same as shipping address"
                    value={billingInfo.sameAsShipping}
                    onChange={(e) => setBillingInfo(prev => ({ ...prev, sameAsShipping: e.target.checked }))}
                    id="sameAsShipping"
                  />
                </div>

                {!billingInfo.sameAsShipping && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <FormField
                      label="First Name"
                      type="text"
                      value={billingInfo.firstName}
                      onChange={(e) => setBillingInfo(prev => ({ ...prev, firstName: e.target.value }))}
                      required
                    />
                    <FormField
                      label="Last Name"
                      type="text"
                      value={billingInfo.lastName}
                      onChange={(e) => setBillingInfo(prev => ({ ...prev, lastName: e.target.value }))}
                      required
                    />
                    <FormField
                      label="Address"
                      type="text"
                      value={billingInfo.address}
                      onChange={(e) => setBillingInfo(prev => ({ ...prev, address: e.target.value }))}
                      required
                      wrapperClassName="md:col-span-2"
                    />
                    <FormField
                      label="City"
                      type="text"
                      value={billingInfo.city}
                      onChange={(e) => setBillingInfo(prev => ({ ...prev, city: e.target.value }))}
                      required
                    />
                    <FormField
                      label="State"
                      type="text"
                      value={billingInfo.state}
                      onChange={(e) => setBillingInfo(prev => ({ ...prev, state: e.target.value }))}
                      required
                    />
                    <FormField
                      label="ZIP Code"
                      type="text"
                      value={billingInfo.zipCode}
                      onChange={(e) => setBillingInfo(prev => ({ ...prev, zipCode: e.target.value }))}
                      required
                    />
                  </div>
                )}

                <div className="flex justify-between">
                  <Button
                    onClick={handleBack}
                    className="flex items-center space-x-2 px-6 py-3 border border-gray-300 rounded-lg text-primary hover:bg-gray-50 transition-colors duration-200"
                  >
                    <ApperIcon name="ChevronLeft" size={16} />
                    <span>Back</span>
                  </Button>
                  <Button
                    onClick={handleNext}
                    className="flex items-center space-x-2 bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-lg transition-colors duration-200"
                  >
                    <span>Continue</span>
                    <ApperIcon name="ChevronRight" size={16} />
                  </Button>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <PaymentForm
                data={paymentInfo}
                onChange={setPaymentInfo}
                onBack={handleBack}
                onPlaceOrder={handlePlaceOrder}
                processing={processingOrder}
              />
            )}
          </motion.div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <OrderSummary
            items={cartItems}
            products={products}
            subtotal={calculateSubtotal()}
            shipping={calculateShipping()}
            tax={calculateTax()}
            total={calculateTotal()}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;