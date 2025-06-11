import ApperIcon from './ApperIcon';

const PaymentForm = ({ data, onChange, onBack, onPlaceOrder, processing }) => {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onPlaceOrder();
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold text-primary mb-6">Payment Information</h2>
      
      {/* Security Notice */}
      <div className="bg-accent/5 border border-accent/20 rounded-lg p-4 mb-6 flex items-center space-x-3">
        <ApperIcon name="Shield" className="text-accent" size={20} />
        <div>
          <p className="text-sm font-medium text-primary">Secure Payment</p>
          <p className="text-xs text-secondary">Your payment information is encrypted and secure</p>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-primary mb-2">
            Cardholder Name *
          </label>
          <input
            type="text"
            value={data.cardholderName}
            onChange={(e) => handleChange('cardholderName', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all duration-200"
            placeholder="John Smith"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-primary mb-2">
            Card Number *
          </label>
          <input
            type="text"
            value={data.cardNumber}
            onChange={(e) => handleChange('cardNumber', formatCardNumber(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all duration-200"
            placeholder="1234 5678 9012 3456"
            maxLength="19"
            required
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Expiry Date *
            </label>
            <input
              type="text"
              value={data.expiryDate}
              onChange={(e) => handleChange('expiryDate', formatExpiryDate(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all duration-200"
              placeholder="MM/YY"
              maxLength="5"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              CVV *
            </label>
            <input
              type="text"
              value={data.cvv}
              onChange={(e) => handleChange('cvv', e.target.value.replace(/[^0-9]/gi, ''))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all duration-200"
              placeholder="123"
              maxLength="4"
              required
            />
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="mb-6">
        <p className="text-sm font-medium text-primary mb-3">We Accept</p>
        <div className="flex items-center space-x-4">
          <div className="bg-gray-100 rounded px-3 py-2 text-xs font-medium text-secondary">VISA</div>
          <div className="bg-gray-100 rounded px-3 py-2 text-xs font-medium text-secondary">MASTERCARD</div>
          <div className="bg-gray-100 rounded px-3 py-2 text-xs font-medium text-secondary">AMEX</div>
          <div className="bg-gray-100 rounded px-3 py-2 text-xs font-medium text-secondary">DISCOVER</div>
        </div>
      </div>
      
      <div className="flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center space-x-2 px-6 py-3 border border-gray-300 rounded-lg text-primary hover:bg-gray-50 transition-colors duration-200"
        >
          <ApperIcon name="ChevronLeft" size={16} />
          <span>Back</span>
        </button>
        
        <button
          type="submit"
          disabled={processing}
          className="flex items-center space-x-2 bg-accent hover:bg-accent/90 disabled:bg-gray-400 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
        >
          {processing ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Processing...</span>
            </>
          ) : (
            <>
              <ApperIcon name="CreditCard" size={16} />
              <span>Place Order</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default PaymentForm;