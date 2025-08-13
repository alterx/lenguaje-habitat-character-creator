import React from 'react';

interface ButtonProps {
  onPress: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
  label?: string;
  variant?: 'primary' | 'secondary' | 'destructive' | 'icon' | 'black' | 'white';
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export const Button = ({
  onPress,
  icon,
  label,
  disabled = false,
  variant = 'secondary',
  size = 'medium',
  className = '',
}: ButtonProps) => {
  const baseClasses =
    'rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantClasses = {
    primary:
      'bg-forest-700 text-parchment-100 hover:bg-forest-600 border border-forest-500 shadow-lg hover:shadow-xl focus:ring-forest-500',
    secondary:
      'bg-transparent text-forest-700 hover:bg-forest-100 border-2 border-forest-600 hover:border-forest-500 transition-all focus:ring-forest-500 font-medium',
    destructive:
      'bg-red-700 text-parchment-100 hover:bg-red-800 border border-red-700 shadow-lg hover:shadow-xl focus:ring-red-700',
    icon: 'bg-forest-900 text-parchment-100 hover:bg-forest-600 border border-forest-600 transition-colors drop-shadow-lg focus:ring-forest-500',
    black:
      'bg-black text-white hover:bg-gray-800 border border-gray-700 shadow-lg hover:shadow-xl focus:ring-gray-500 font-medium',
    white:
      'bg-white text-black hover:bg-gray-100 border border-gray-300 shadow-lg hover:shadow-xl focus:ring-gray-400 font-medium',
  };

  const sizeClasses = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-3 py-2',
    large: 'px-9 py-6 text-xl font-medium font-serif',
  };

  // For icon-only buttons, use smaller padding
  const iconOnlyClasses = icon && !label ? 'px-2 py-2' : '';

  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${
    iconOnlyClasses || sizeClasses[size]
  } ${className}`;

  return (
    <button className={buttonClasses} onClick={onPress} disabled={disabled}>
      {icon && <span className={label ? 'mr-2' : ''}>{icon}</span>}
      {label && <span>{label}</span>}
    </button>
  );
};
