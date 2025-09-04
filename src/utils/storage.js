// src/utils/storage.js

const EMISSIONS_KEY = 'carbon-emissions';
const BADGES_KEY = 'user-badges';
const GOAL_KEY = 'user-goal';

// --- Emissions ---
export const getEmissions = () => {
  const data = localStorage.getItem(EMISSIONS_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveEmission = (date, emissions) => {
  const emissionsData = getEmissions();
  const today = new Date(date).toISOString().split('T')[0];
  const existingEntryIndex = emissionsData.findIndex(e => e.date === today);

  if (existingEntryIndex > -1) {
    emissionsData[existingEntryIndex].emissions = emissions;
  } else {
    emissionsData.push({ date: today, emissions });
  }

  // Keep only the last year of data
  emissionsData.sort((a, b) => new Date(b.date) - new Date(a.date));
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  const filteredData = emissionsData.filter(e => new Date(e.date) >= oneYearAgo);

  localStorage.setItem(EMISSIONS_KEY, JSON.stringify(filteredData));
  return filteredData;
};

// --- Badges ---
export const getBadges = () => {
  const data = localStorage.getItem(BADGES_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveBadges = (badges) => {
  localStorage.setItem(BADGES_KEY, JSON.stringify(badges));
};

// --- Goals ---
export const getGoal = () => {
  const data = localStorage.getItem(GOAL_KEY);
  return data ? JSON.parse(data) : { target: 50, type: 'weekly' }; // Default goal
};

export const saveGoal = (goal) => {
  localStorage.setItem(GOAL_KEY, JSON.stringify(goal));
};