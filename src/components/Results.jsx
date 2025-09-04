import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getImpactEquivalents } from './equivalents';
import { TreePine, Plane, Car } from 'lucide-react';
import ShareButtons from './ShareButtons';

const ResultsComponent = ({ emissions, darkMode }) => {
  const totalEmissions = Object.values(emissions).reduce((sum, val) => sum + val, 0);

  const chartData = [
    { name: 'Travel', emissions: emissions.travel || 0 },
    { name: 'Food', emissions: emissions.food || 0 },
    { name: 'Energy', emissions: emissions.energy || 0 },
  ];

  const rawImpactEquivalents = getImpactEquivalents(totalEmissions);
  const impactEquivalents = rawImpactEquivalents.map(eq => {
    const augmentedEq = { ...eq };
    if (eq.name.includes('Tree')) {
      augmentedEq.icon = <TreePine className="inline-block text-green-500" />;
      augmentedEq.format = (value) => `${value.toFixed(1)} tree-years`;
    } else if (eq.name.includes('flight')) {
      augmentedEq.icon = <Plane className="inline-block text-blue-500" />;
      augmentedEq.format = (value) => `${value.toFixed(2)} flights`;
    } else if (eq.name.includes('car')) {
      augmentedEq.icon = <Car className="inline-block text-red-500" />;
      augmentedEq.format = (value) => `${Math.round(value).toLocaleString()} miles driven`;
    }
    return augmentedEq;
  });

  return (
    <div className="mt-8 p-6 rounded-lg bg-white dark:bg-gray-800 shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-white">Your Daily Carbon Footprint</h2>
      <p className="text-4xl font-bold text-center text-green-600 dark:text-green-400 mb-4">
        {totalEmissions.toFixed(2)} kg CO₂
      </p>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#4A5568' : '#E2E8F0'} />
            <XAxis dataKey="name" stroke={darkMode ? '#A0AEC0' : '#4A5568'} />
            <YAxis stroke={darkMode ? '#A0AEC0' : '#4A5568'} />
            <Tooltip
              contentStyle={{
                backgroundColor: darkMode ? '#2D3748' : '#FFFFFF',
                borderColor: darkMode ? '#4A5568' : '#E2E8F0',
              }}
            />
            <Legend />
            <Bar dataKey="emissions" fill={darkMode ? '#48BB78' : '#38A169'} name="Emissions (kg CO₂)" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {totalEmissions > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2 text-center">Eco Impact Equivalents</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            {impactEquivalents.map((eq) =>
              eq.format ? (
                <div key={eq.name} className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg flex flex-col items-center justify-center">
                  <span className="text-3xl mb-2">{eq.icon}</span>
                  <p className="text-xl font-bold">{eq.format(eq.value)}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-balance">{eq.name}</p>
                </div>
              ) : null
            )}
          </div>
        </div>
      )}
      
      {totalEmissions > 0 && <ShareButtons footprint={totalEmissions} />}
    </div>
  );
};

export const Results = React.memo(ResultsComponent);