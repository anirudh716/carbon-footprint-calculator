import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useEmissions } from '../hooks/useEmissions';

const History = ({ darkMode }) => {
  const { emissions } = useEmissions();

  const { chartData, weeklyAvg, monthlyAvg } = useMemo(() => {
    if (!emissions || emissions.length === 0) {
      return { chartData: [], weeklyAvg: 0, monthlyAvg: 0 };
    }

    const sortedEmissions = [...emissions].sort((a, b) => new Date(a.date) - new Date(b.date));

    const data = sortedEmissions.map(e => ({
      date: new Date(e.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      emissions: e.emissions.total.toFixed(2),
    }));

    const now = new Date();
    const oneWeekAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
    const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());

    const lastWeekData = sortedEmissions.filter(e => new Date(e.date) >= oneWeekAgo);
    const lastMonthData = sortedEmissions.filter(e => new Date(e.date) >= oneMonthAgo);

    const weeklyTotal = lastWeekData.reduce((sum, e) => sum + e.emissions.total, 0);
    const monthlyTotal = lastMonthData.reduce((sum, e) => sum + e.emissions.total, 0);

    return {
      chartData: data,
      weeklyAvg: lastWeekData.length > 0 ? weeklyTotal / lastWeekData.length : 0,
      monthlyAvg: lastMonthData.length > 0 ? monthlyTotal / lastMonthData.length : 0,
    };
  }, [emissions]);

  if (emissions.length === 0) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Emissions History</h2>
        <p className="text-gray-500 dark:text-gray-400">No data yet. Start calculating your daily footprint to see your history!</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className={`p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className="text-2xl font-bold mb-4">Emissions History</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-center">
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <h3 className="text-lg font-semibold">Weekly Average</h3>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">{weeklyAvg.toFixed(2)} kg CO₂/day</p>
          </div>
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <h3 className="text-lg font-semibold">Monthly Average</h3>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">{monthlyAvg.toFixed(2)} kg CO₂/day</p>
          </div>
        </div>
        <div style={{ width: '100%', height: 400 }}>
          <ResponsiveContainer>
            <LineChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#4A5568' : '#E2E8F0'} />
              <XAxis dataKey="date" stroke={darkMode ? '#A0AEC0' : '#4A5568'} />
              <YAxis stroke={darkMode ? '#A0AEC0' : '#4A5568'} />
              <Tooltip
                contentStyle={{
                  backgroundColor: darkMode ? '#2D3748' : '#FFFFFF',
                  borderColor: darkMode ? '#4A5568' : '#E2E8F0',
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="emissions" stroke={darkMode ? '#68D391' : '#38A169'} strokeWidth={2} name="Emissions (kg CO₂)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default History;