import React from 'react'
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Legend,
    Tooltip,
} from 'recharts'
export const Chart = ({ emissions, darkMode }) => {
    const data = [
        {
            name: 'Travel',
            value: emissions.travel,
            color: '#3B82F6',
        },
        {
            name: 'Food',
            value: emissions.food,
            color: '#10B981',
        },
        {
            name: 'Energy',
            value: emissions.energy,
            color: '#F59E0B',
        },
    ]
    return (
        <section className="py-12 px-6">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold text-center mb-8 text-green-700 dark:text-green-400">
                    Emissions Visualization
                </h2>
                <div
                    className={`rounded-xl shadow-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
                >
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label={({ name, percent }) =>
                                        `${name}: ${(percent * 100).toFixed(0)}%`
                                    }
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value) => `${value.toFixed(2)} kg CO₂`} />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </section>
    )
}
