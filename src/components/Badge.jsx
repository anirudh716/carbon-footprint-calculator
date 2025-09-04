import React from 'react';

const Badge = ({ badge, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20',
    lg: 'w-24 h-24',
  };

  const iconSize = {
    sm: 24,
    md: 40,
    lg: 56,
  };

  return (
    <div className="flex flex-col items-center text-center p-2" title={badge.description}>
      <div className={`flex items-center justify-center rounded-full bg-green-100 text-green-600 mb-2 ${sizeClasses[size]}`}>
        <badge.icon size={iconSize[size]} />
      </div>
      <span className="text-xs font-semibold">{badge.name}</span>
    </div>
  );
};

export default React.memo(Badge);