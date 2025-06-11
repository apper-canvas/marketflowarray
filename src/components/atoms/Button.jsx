import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, className = '', onClick, type = 'button', disabled = false, whileHover, whileTap, ...props }) => {
  const commonProps = {
    onClick,
    type,
    disabled,
    className,
    ...props, // Pass through any other standard HTML button props
  };

  if (whileHover || whileTap) {
    return (
      <motion.button whileHover={whileHover} whileTap={whileTap} {...commonProps}>
        {children}
      </motion.button>
    );
  } else {
    return (
      <button {...commonProps}>
        {children}
      </button>
    );
  }
};

export default Button;