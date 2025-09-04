import React from 'react'
import { CarIcon, Utensils, Lightbulb } from 'lucide-react'
import { FormSection, SelectInput, NumberInput } from './FormControls'
import { motion } from 'framer-motion'

const travelOptions = [
    { value: 'Car', label: 'Car' },
    { value: 'Bus', label: 'Bus' },
    { value: 'Bike', label: 'Bike' },
    { value: 'Flight', label: 'Flight' },
]

const dietOptions = [
    { value: 'Vegan', label: 'Vegan' },
    { value: 'Vegetarian', label: 'Vegetarian' },
    { value: 'Non-Veg', label: 'Non-Vegetarian' },
]

const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export const ActivityForm = ({ formData, onChange, onCalculate, darkMode }) => {
    return (
        <motion.section
            id="activity-form"
            className="py-16 px-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
        >
            <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold text-center mb-8 text-green-700 dark:text-green-400">
                    Calculate Your Daily Activities
                </h2>
                <div
                    className={`rounded-xl shadow-lg p-6 md:p-8 ${darkMode ? 'bg-gray-800' : 'bg-white'
                        }`}
                >
                    <div className="space-y-6">
                        <motion.div
                            variants={sectionVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                        >
                            <FormSection
                                title="Travel"
                                icon={<CarIcon className="mr-2 text-green-600" size={24} />}
                            >
                                <SelectInput
                                    label="Mode of Transport"
                                    value={formData.travel.mode}
                                    onChange={(e) =>
                                        onChange('travel', 'mode', e.target.value)
                                    }
                                    options={travelOptions}
                                    darkMode={darkMode}
                                />
                                <NumberInput
                                    label="Distance (km)"
                                    value={formData.travel.distance}
                                    onChange={(e) =>
                                        onChange('travel', 'distance', Number(e.target.value))
                                    }
                                    darkMode={darkMode}
                                />
                            </FormSection>
                        </motion.div>

                        <motion.div
                            variants={sectionVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                        >
                            <FormSection
                                title="Food"
                                icon={<Utensils className="mr-2 text-green-600" size={24} />}
                            >
                                <SelectInput
                                    label="Diet Type"
                                    value={formData.food.type}
                                    onChange={(e) => onChange('food', 'type', e.target.value)}
                                    options={dietOptions}
                                    darkMode={darkMode}
                                />
                                <NumberInput
                                    label="Meals per day"
                                    value={formData.food.meals}
                                    onChange={(e) =>
                                        onChange('food', 'meals', Number(e.target.value))
                                    }
                                    darkMode={darkMode}
                                    max="10"
                                />
                            </FormSection>
                        </motion.div>

                        <motion.div
                            variants={sectionVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                        >
                            <FormSection
                                title="Energy"
                                icon={<Lightbulb className="mr-2 text-green-600" size={24} />}
                                grid={false}
                            >
                                <NumberInput
                                    label="Electricity Usage (kWh)"
                                    value={formData.energy.usage}
                                    onChange={(e) =>
                                        onChange('energy', 'usage', Number(e.target.value))
                                    }
                                    darkMode={darkMode}
                                />
                            </FormSection>
                        </motion.div>

                        <div className="pt-6 mt-8 border-t border-gray-200 dark:border-gray-700">
                            <motion.button
                                onClick={onCalculate}
                                className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors shadow-md"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Calculate Footprint
                            </motion.button>
                        </div>
                    </div>
                </div>
            </div>
        </motion.section>
    )
}
