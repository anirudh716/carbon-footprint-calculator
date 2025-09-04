import React, { useState, useEffect, useCallback } from 'react';
import { FormSection, SelectInput, NumberInput } from '../components/FormControls';
import {Results} from '../components/Results';
import Badge from '../components/Badge';
import ProgressBar from '../components/ProgressBar';
import { getBadges, getGoal } from '../utils/storage';
import { checkAndAwardBadges } from '../utils/badges';

const Dashboard = ({ darkMode, emissions, saveEmission }) => {
  const [form, setForm] = useState({
    travel: { mode: 'car', distance: '' },
    food: { type: 'meat-lover', servings: '' },
    energy: { electricity: '', gas: '' },
  });
  const [result, setResult] = useState(null);
  const [badges, setBadges] = useState([]);
  const [newBadges, setNewBadges] = useState([]);
  const [goal, setGoal] = useState({ target: 50, type: 'weekly' });
  const [weeklyEmissions, setWeeklyEmissions] = useState(0);

  useEffect(() => {
    setBadges(getBadges());
    setGoal(getGoal());
  }, []);

  useEffect(() => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const lastWeekEmissions = emissions
      .filter(e => new Date(e.date) >= oneWeekAgo)
      .reduce((sum, day) => sum + day.emissions.total, 0);
    setWeeklyEmissions(lastWeekEmissions);
  }, [emissions]);

  const handleChange = (section, field, value) => {
    setForm(prev => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  const calculateFootprint = useCallback(() => {
    const factors = {
      travel: { car: 0.21, bus: 0.1, train: 0.04, flight: 0.25 },
      food: { 'meat-lover': 3.3, 'average': 2.5, 'vegetarian': 1.7, 'vegan': 1.5 },
      energy: { electricity: 0.233, gas: 0.184 },
    };

    const travelEmissions = (factors.travel[form.travel.mode] || 0) * (Number(form.travel.distance) || 0);
    const foodEmissions = (factors.food[form.food.type] || 0) * (Number(form.food.servings) || 0);
    const energyEmissions = (factors.energy.electricity * (Number(form.energy.electricity) || 0)) + (factors.energy.gas * (Number(form.energy.gas) || 0));
    const total = travelEmissions + foodEmissions + energyEmissions;

    const emissionsData = {
      travel: travelEmissions,
      food: foodEmissions,
      energy: energyEmissions,
      total,
    };

    setResult(emissionsData);
    saveEmission(new Date(), emissionsData);

    const allEmissions = [...emissions, { date: new Date().toISOString().split('T')[0], emissions: emissionsData }];
    const awarded = checkAndAwardBadges(allEmissions, emissionsData);
    if (awarded.length > 0) {
      setNewBadges(awarded);
      setTimeout(() => {
        setBadges(getBadges());
        setNewBadges([]);
      }, 3000);
    }
  }, [form, emissions, saveEmission]);

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className={`p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className="text-2xl font-bold mb-6">Daily Carbon Footprint Calculator</h2>
            <form onSubmit={(e) => { e.preventDefault(); calculateFootprint(); }}>
              <div className="space-y-8">
                <FormSection title="Travel" icon={<span className="mr-2">🚗</span>}>
                  <SelectInput label="Mode of Transport" value={form.travel.mode} onChange={(e) => handleChange('travel', 'mode', e.target.value)} options={[{ value: 'car', label: 'Car' }, { value: 'bus', label: 'Bus' }, { value: 'train', label: 'Train' }, { value: 'flight', label: 'Flight' }]} darkMode={darkMode} />
                  <NumberInput label="Distance (km)" value={form.travel.distance} onChange={(e) => handleChange('travel', 'distance', e.target.value)} darkMode={darkMode} placeholder="e.g., 50" />
                </FormSection>

                <FormSection title="Food" icon={<span className="mr-2">🍔</span>}>
                  <SelectInput label="Diet Type" value={form.food.type} onChange={(e) => handleChange('food', 'type', e.target.value)} options={[{ value: 'meat-lover', label: 'Meat Lover' }, { value: 'average', label: 'Average' }, { value: 'vegetarian', label: 'Vegetarian' }, { value: 'vegan', label: 'Vegan' }]} darkMode={darkMode} />
                  <NumberInput label="Servings" value={form.food.servings} onChange={(e) => handleChange('food', 'servings', e.target.value)} darkMode={darkMode} placeholder="e.g., 3" />
                </FormSection>

                <FormSection title="Energy" icon={<span className="mr-2">💡</span>}>
                  <NumberInput label="Electricity (kWh)" value={form.energy.electricity} onChange={(e) => handleChange('energy', 'electricity', e.target.value)} darkMode={darkMode} placeholder="e.g., 15" />
                  <NumberInput label="Natural Gas (cubic meters)" value={form.energy.gas} onChange={(e) => handleChange('energy', 'gas', e.target.value)} darkMode={darkMode} placeholder="e.g., 5" />
                </FormSection>
              </div>
              <button type="submit" className="mt-8 w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors">
                Calculate Footprint
              </button>
            </form>
          </div>
          {result && <Results emissions={result} darkMode={darkMode} />}
        </div>

        <aside className="space-y-8">
          <div className={`p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className="text-xl font-semibold mb-4">My Goal</h3>
            <ProgressBar value={weeklyEmissions} max={goal.target} darkMode={darkMode} />
          </div>
          <div className={`p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className="text-xl font-semibold mb-4">My Badges</h3>
            {badges.length > 0 ? (
              <div className="grid grid-cols-3 gap-2">
                {badges.map(badge => <Badge key={badge.id} badge={badge} size="md" />)}
              </div>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">Calculate your footprint to earn badges!</p>
            )}
          </div>
        </aside>
      </div>
      {newBadges.length > 0 && (
        <div className="fixed bottom-5 right-5 bg-green-500 text-white p-4 rounded-lg shadow-lg animate-bounce">
          <p className="font-bold">New Badge Unlocked!</p>
          {newBadges.map(b => <p key={b.id} className="text-sm">{b.name}</p>)}
        </div>
      )}
    </div>
  );
};

export default Dashboard;