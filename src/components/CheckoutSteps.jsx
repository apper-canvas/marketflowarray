import ApperIcon from './ApperIcon';

const CheckoutSteps = ({ currentStep }) => {
  const steps = [
    { number: 1, title: 'Shipping', icon: 'Truck' },
    { number: 2, title: 'Billing', icon: 'CreditCard' },
    { number: 3, title: 'Payment', icon: 'Lock' }
  ];

  return (
    <div className="flex items-center justify-center space-x-8">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center">
          <div className="flex items-center space-x-2">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-200 ${
                currentStep >= step.number
                  ? 'bg-accent border-accent text-white'
                  : 'border-gray-300 text-gray-400'
              }`}
            >
              {currentStep > step.number ? (
                <ApperIcon name="Check" size={20} />
              ) : (
                <ApperIcon name={step.icon} size={16} />
              )}
            </div>
            <span
              className={`font-medium ${
                currentStep >= step.number ? 'text-primary' : 'text-gray-400'
              }`}
            >
              {step.title}
            </span>
          </div>
          
          {index < steps.length - 1 && (
            <div
              className={`w-16 h-0.5 mx-4 transition-all duration-200 ${
                currentStep > step.number ? 'bg-accent' : 'bg-gray-300'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default CheckoutSteps;