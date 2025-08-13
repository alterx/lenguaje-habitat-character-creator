import React from 'react';

interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

interface SelectProps {
  label?: string;
  value: string | number;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
  variant?: 'default' | 'compact' | 'primary' | 'form' | 'black' | 'white';
  disabled?: boolean;
}

export function Select({
  label,
  value,
  onChange,
  options,
  placeholder = 'Seleccionar...',
  className = '',
  variant = 'default',
  disabled = false,
}: SelectProps) {
  const baseClasses =
    'px-3 border rounded-xl focus:outline-none focus:ring-2 transition-all';

  const variantClasses = {
    default: 'py-2 bg-forest-800/60 text-parchment-100 border-forest-600 hover:bg-forest-700/80 focus:ring-forest-500',
    compact: 'py-1.5 text-xs bg-forest-800 text-parchment-100 border-forest-600 hover:bg-forest-700 focus:ring-forest-500',
    primary: 'py-2 bg-forest-700 text-parchment-100 border-forest-500 hover:bg-forest-600 focus:ring-forest-500 shadow-lg hover:shadow-xl',
    form: 'py-2 bg-amber-50 text-green-900 border-parchment-600 hover:bg-amber-100 focus:ring-amber-500',
    black: 'py-2 bg-black text-white border-gray-700 hover:bg-gray-800 focus:ring-gray-500 shadow-lg hover:shadow-xl',
    white: 'py-2 bg-white text-black border-gray-300 hover:bg-gray-100 focus:ring-gray-400 shadow-lg hover:shadow-xl',
  };

  const selectClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

  const selectElement = (
    <select
      className={selectClasses}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((option, index) => (
        <option
          key={`${option.value}-${index}`}
          value={option.value}
          disabled={option.disabled}
        >
          {option.label}
        </option>
      ))}
    </select>
  );

  if (label) {
    return (
      <div>
        <label className="text-sm font-medium text-forest-700">{label}</label>
        <div className="mt-1">{selectElement}</div>
      </div>
    );
  }

  return selectElement;
}

// Convenience function for creating options
export function createSelectOption(
  value: string | number,
  label: string,
  disabled?: boolean
): SelectOption {
  return { value, label, disabled };
}

// Convenience function for creating options from an array of values
export function createSelectOptions<T extends string | number>(
  values: T[],
  labelFormatter?: (value: T) => string
): SelectOption[] {
  return values.map((value) => ({
    value,
    label: labelFormatter ? labelFormatter(value) : String(value),
  }));
}
