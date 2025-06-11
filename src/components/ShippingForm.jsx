import ApperIcon from './ApperIcon';

const ShippingForm = ({ data, onChange, onNext }) => {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold text-primary mb-6">Shipping Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-primary mb-2">
            First Name *
          </label>
          <input
            type="text"
            value={data.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all duration-200"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-primary mb-2">
            Last Name *
          </label>
          <input
            type="text"
            value={data.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all duration-200"
            required
          />
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-primary mb-2">
            Email Address *
          </label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all duration-200"
            required
          />
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-primary mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all duration-200"
          />
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-primary mb-2">
            Address *
          </label>
          <input
            type="text"
            value={data.address}
            onChange={(e) => handleChange('address', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all duration-200"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-primary mb-2">
            City *
          </label>
          <input
            type="text"
            value={data.city}
            onChange={(e) => handleChange('city', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all duration-200"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-primary mb-2">
            State *
          </label>
          <input
            type="text"
            value={data.state}
            onChange={(e) => handleChange('state', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all duration-200"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-primary mb-2">
            ZIP Code *
          </label>
          <input
            type="text"
            value={data.zipCode}
            onChange={(e) => handleChange('zipCode', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all duration-200"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-primary mb-2">
            Country *
          </label>
          <select
            value={data.country}
            onChange={(e) => handleChange('country', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all duration-200"
            required
          >
            <option value="United States">United States</option>
            <option value="Canada">Canada</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Australia">Australia</option>
          </select>
        </div>
      </div>
      
      <div className="flex justify-end">
        <button
          type="submit"
          className="flex items-center space-x-2 bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
        >
          <span>Continue</span>
          <ApperIcon name="ChevronRight" size={16} />
        </button>
      </div>
    </form>
  );
};

export default ShippingForm;