import React from 'react';

const Input = ({ className = '', ...props }) => {
  return (
    <input
      className={`border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all duration-200 ${className}`}
      {...props}
    />
  );
};

export default Input;