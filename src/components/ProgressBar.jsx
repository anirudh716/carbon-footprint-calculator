import React from 'react';

const ProgressBar = ({ value, max, darkMode }) => {
  const percentage = Math.min((value / max) * 100, 100);
  const isOver = value > max;

  const barColor = isOver
    ? 'bg-red-500'
    : 'bg-green-500';

  return (
    <div>
      <div className={`w-full rounded-full h-4 mb-1 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
        <div
          className={`h-4 rounded-full transition-all duration-500 ${barColor}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="text-xs text-right">
        {value.toFixed(1)} / {max.toFixed(1)} kg CO₂
      </div>
      {isOver && (
        <p className="text-xs text-red-500 mt-1 text-center">
          You've exceeded your target! Let's try to reduce it tomorrow.
        </p>
      )}
    </div>
  );
};

export default React.memo(ProgressBar);