import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Sun, Moon, Menu, X } from 'lucide-react';

const Header = ({ darkMode, toggleDarkMode }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive
      ? darkMode
        ? 'bg-gray-700 text-white'
        : 'bg-green-100 text-green-700'
      : darkMode
        ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
        : 'text-gray-500 hover:bg-gray-100'
    }`;

  return (
    <header className={`shadow-md ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <span className="font-bold text-xl">🌍 Carbon Footprint Calculator</span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-4">
            <NavLink to="/" className={navLinkClass}>Dashboard</NavLink>
            <NavLink to="/history" className={navLinkClass}>History</NavLink>
            <NavLink to="/goals" className={navLinkClass}>Goals</NavLink>
          </div>

          {/* Dark Mode & Mobile Menu */}
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className={`md:hidden mt-2 space-y-2 pb-4`}>
            <NavLink to="/" className={navLinkClass} onClick={() => setMobileMenuOpen(false)}>Dashboard</NavLink>
            <NavLink to="/history" className={navLinkClass} onClick={() => setMobileMenuOpen(false)}>History</NavLink>
            <NavLink to="/goals" className={navLinkClass} onClick={() => setMobileMenuOpen(false)}>Goals</NavLink>
          </div>
        )}
      </nav>
    </header>
  );
};

export default React.memo(Header);
