import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import History from './components/History';
import Goals from './components/Goals';
import {Footer} from './components/Footer';
import { useEmissions } from './hooks/useEmissions';

function App() {
  const [darkMode, setDarkMode] = useState(
    () => window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false
  );
  const { emissions, saveEmission } = useEmissions();

  // Effect to listen for OS-level color scheme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => setDarkMode(e.matches);

    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Effect to apply the dark mode class to the root <html> element
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <Router>
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-200' : 'bg-gray-100 text-gray-800'}`}>
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

        <main>
          <Routes>
            <Route
              path="/"
              element={<Dashboard darkMode={darkMode} emissions={emissions} saveEmission={saveEmission} />}
            />
            <Route
              path="/history"
              element={<History darkMode={darkMode} />}
            />
            <Route
              path="/goals"
              element={<Goals darkMode={darkMode} />}
            />
          </Routes>
          <Footer/>
        </main>
      </div>
    </Router>
  );
}

export default App;

