import React from 'react'
import { MoonIcon, SunIcon } from 'lucide-react'
export const Navbar = ({ darkMode, toggleDarkMode }) => {
    return (
        <header
            className={`w-full py-4 px-6 md:px-10 shadow-sm ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
        >
            <nav className="flex justify-between items-center max-w-7xl mx-auto">
                <div className="flex items-center">
                    <span className="text-green-600 text-3xl mr-2">🌍</span>
                    <h1 className="text-xl md:text-2xl font-semibold">
                        Carbon Footprint Calculator
                    </h1>
                </div>
                <button
                    onClick={toggleDarkMode}
                    className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-100 text-gray-700'}`}
                    aria-label="Toggle dark mode"
                >
                    {darkMode ? <SunIcon size={20} /> : <MoonIcon size={20} />}
                </button>
            </nav>
        </header>
    )
}
