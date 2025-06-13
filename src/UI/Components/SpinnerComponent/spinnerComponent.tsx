import React from 'react';

interface SpinnerProps {
  size?: 'small' | 'medium' | 'large';
  message?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ 
  size = 'medium', 
  message = 'Cargando...' 
}) => {
  const getSize = () => {
    switch (size) {
      case 'small':
        return 'w-4 h-4';
      case 'large':
        return 'w-12 h-12';
      case 'medium':
      default:
        return 'w-8 h-8';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className={`animate-spin rounded-full border-t-2 border-b-2 border-blue-500 ${getSize()}`}></div>
      {message && <p className="mt-2 text-gray-600">{message}</p>}
    </div>
  );
};

export default Spinner;