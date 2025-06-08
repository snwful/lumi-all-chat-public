
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => {
  const baseStyles = 'bg-brand-surface rounded-xl shadow-lg overflow-hidden';
  const clickableStyles = onClick ? 'cursor-pointer hover:shadow-xl transition-shadow duration-200' : '';
  
  return (
    <div className={`${baseStyles} ${clickableStyles} ${className}`} onClick={onClick}>
      {children}
    </div>
  );
};

export default Card;
