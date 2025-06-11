import React from 'react';
import FormField from '@/components/molecules/FormField'; // New import
import Button from '@/components/atoms/Button'; // New import
import ApperIcon from '@/components/ApperIcon'; // Alias import

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
        <FormField
          label="First Name"
          type="text"
          id="firstName"
          value={data.firstName}
          onChange={(e) => handleChange('firstName', e.target.value)}
          required
        />
        <FormField
          label="Last Name"
          type="text"
          id="lastName"
          value={data.lastName}
          onChange={(e) => handleChange('lastName', e.target.value)}
          required
        />
        <FormField
          label="Email Address"
          type="email"
          id="email"
          value={data.email}
          onChange={(e) => handleChange('email', e.target.value)}
          required
          wrapperClassName="md:col-span-2"
        />
        <FormField
          label="Phone Number"
          type="tel"
          id="phone"
          value={data.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          wrapperClassName="md:col-span-2"
        />
        <FormField
          label="Address"
          type="text"
          id="address"
          value={data.address}
          onChange={(e) => handleChange('address', e.target.value)}
          required
          wrapperClassName="md:col-span-2"
        />
        <FormField
          label="City"
          type="text"
          id="city"
          value={data.city}
          onChange={(e) => handleChange('city', e.target.value)}
          required
        />
        <FormField
          label="State"
          type="text"
          id="state"
          value={data.state}
          onChange={(e) => handleChange('state', e.target.value)}
          required
        />
        <FormField
          label="ZIP Code"
          type="text"
          id="zipCode"
          value={data.zipCode}
          onChange={(e) => handleChange('zipCode', e.target.value)}
          required
        />
        <FormField
          label="Country"
          type="select"
          id="country"
          value={data.country}
          onChange={(e) => handleChange('country', e.target.value)}
          required
          options={[
            { value: 'United States', label: 'United States' },
            { value: 'Canada', label: 'Canada' },
            { value: 'United Kingdom', label: 'United Kingdom' },
            { value: 'Australia', label: 'Australia' },
          ]}
        />
      </div>
      
      <div className="flex justify-end">
        <Button
          type="submit"
          className="flex items-center space-x-2 bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
        >
          <span>Continue</span>
          <ApperIcon name="ChevronRight" size={16} />
        </Button>
      </div>
    </form>
  );
};

export default ShippingForm;