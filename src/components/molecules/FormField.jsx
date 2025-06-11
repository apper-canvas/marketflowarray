import React from 'react';
import Input from '@/components/atoms/Input';
import Select from '@/components/atoms/Select';
import Checkbox from '@/components/atoms/Checkbox';

const FormField = ({ label, type = 'text', id, value, onChange, required = false, options = [], wrapperClassName = '', inputClassName = '', ...props }) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s/g, '-') : '');

  let FieldComponent;
  switch (type) {
    case 'select':
      FieldComponent = (
        <Select id={inputId} value={value} onChange={onChange} required={required} className={`w-full ${inputClassName}`} {...props}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </Select>
      );
      break;
    case 'checkbox':
      FieldComponent = (
        <label htmlFor={inputId} className="flex items-center space-x-3">
          <Checkbox id={inputId} checked={value} onChange={onChange} required={required} className={inputClassName} {...props} />
          <span className="text-primary">{label}</span>
        </label>
      );
      break;
    default:
      FieldComponent = (
        <Input
          id={inputId}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          className={`w-full ${inputClassName}`}
          {...props}
        />
      );
  }

  // Checkbox type handles its own label for specific styling and is often used inline
  if (type === 'checkbox') {
    return (
      <div className={wrapperClassName}>
        {FieldComponent}
      </div>
    );
  }

  return (
    <div className={wrapperClassName}>
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-primary mb-2">
          {label} {required && '*'}
        </label>
      )}
      {FieldComponent}
    </div>
  );
};

export default FormField;