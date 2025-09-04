import React from 'react'
import { BusIcon, LeafIcon, LightbulbIcon } from 'lucide-react'
export const Tips = ({ highestCategory, darkMode }) => {
    const tips = {
        travel: [
            'Use public transport or cycle for short distances.',
            'Consider carpooling with colleagues for commutes.',
            'Maintain your vehicle properly for better fuel efficiency.',
        ],
        food: [
            'Try adding more plant-based meals to your diet.',
            'Buy local and seasonal produce when possible.',
            'Reduce food waste by planning meals ahead.',
        ],
        energy: [
            'Switch off appliances when not in use.',
            'Use energy-efficient LED light bulbs.',
            'Adjust your thermostat to save on heating/cooling.',
        ],
    }
    const getIcon = (category) => {
        switch (category) {
            case 'travel':
                return <BusIcon className="h-8 w-8 text-blue-500" />
            case 'food':
                return <LeafIcon className="h-8 w-8 text-green-500" />
            case 'energy':
                return <LightbulbIcon className="h-8 w-8 text-yellow-500" />
            default:
                return null
        }
    }
    return (
        <section className="py-12 px-6 bg-green-50 dark:bg-gray-800">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold text-center mb-2 text-green-700 dark:text-green-400">
                    💡 Eco-Friendly Tips
                </h2>
                <p className="text-center mb-8 text-gray-600 dark:text-gray-300">
                    Based on your results, here are some ways to reduce your{' '}
                    {highestCategory} emissions
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {tips[highestCategory].map((tip, index) => (
                        <div
                            key={index}
                            className={`p-6 rounded-xl shadow-md ${darkMode ? 'bg-gray-700' : 'bg-white'}`}
                        >
                            <div className="flex justify-center mb-4">
                                {getIcon(highestCategory)}
                            </div>
                            <p className="text-center">{tip}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
