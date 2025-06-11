import React from 'react';

const Select = ({ children, className = '', ...props }) => {
  return (
    <select
      className={`border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all duration-200 ${className}`}
      {...props}
    >
      {children}
    </select>
  );
};

export default Select;