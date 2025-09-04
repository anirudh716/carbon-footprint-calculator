import React, { useState, useEffect } from 'react';
import { getGoal, saveGoal } from '../utils/storage';
import { FormSection, NumberInput, SelectInput } from '../components/FormControls';

const Goals = ({ darkMode }) => {
  const [goal, setGoal] = useState({ target: 50, type: 'weekly' });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setGoal(getGoal());
  }, []);

  const handleChange = (field, value) => {
    setGoal(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveGoal(goal);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className={`max-w-md mx-auto p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className="text-2xl font-bold mb-6">Set Your Emission Goal</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <SelectInput
              label="Goal Type"
              value={goal.type}
              onChange={(e) => handleChange('type', e.target.value)}
              options={[
                { value: 'weekly', label: 'Weekly' },
                { value: 'monthly', label: 'Monthly' }
              ]}
              darkMode={darkMode}
            />
            <NumberInput
              label={`Target Emissions (kg CO₂ per ${goal.type === 'weekly' ? 'week' : 'month'})`}
              value={goal.target}
              onChange={(e) => handleChange('target', Number(e.target.value))}
              darkMode={darkMode}
              placeholder="e.g., 50"
            />
          </div>
          <button type="submit" className="mt-8 w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors">
            Save Goal
          </button>
          {saved && <p className="text-center text-green-500 mt-4">Goal saved successfully!</p>}
        </form>
      </div>
    </div>
  );
};

export default Goals;