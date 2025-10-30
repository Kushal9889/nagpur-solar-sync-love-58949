
import React from 'react';

interface AnimatedSectionProps {
  children: React.ReactNode;
  animationType: 'fadeUp' | 'slideLeft' | 'slideRight' | 'scaleIn' | 'fadeIn';
  delay?: number;
  className?: string;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ 
  children, 
  animationType, 
  delay = 0, 
  className = '' 
}) => {
  const getAnimationClass = () => {
    switch (animationType) {
      case 'fadeUp':
        return 'animate-fade-up';
      case 'slideLeft':
        return 'animate-slide-left';
      case 'slideRight':
        return 'animate-slide-right';
      case 'scaleIn':
        return 'animate-scale-in';
      case 'fadeIn':
        return 'animate-fade-in';
      default:
        return 'animate-fade-in';
    }
  };

  return (
    <div 
      className={`${getAnimationClass()} ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
