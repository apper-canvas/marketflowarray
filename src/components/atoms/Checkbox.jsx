import React from 'react';

const Checkbox = ({ className = '', ...props }) => {
  return (
    <input
      type="checkbox"
      className={`w-4 h-4 text-accent focus:ring-accent border-gray-300 rounded ${className}`}
      {...props}
    />
  );
};

export default Checkbox;