import { getBadges, saveBadges } from './storage';
import { badges as badgeDefinitions } from '../data/badges.js';

export const checkAndAwardBadges = (emissionsData, currentCalculation) => {
  const existingBadges = getBadges();
  const newBadges = [];

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const lastWeekEmissions = emissionsData.filter(
    (e) => new Date(e.date) >= oneWeekAgo
  );

  const weeklyTravelEmissions = lastWeekEmissions.reduce(
    (sum, day) => sum + (day.emissions.travel || 0),
    0
  );
  const weeklyEnergyEmissions = lastWeekEmissions.reduce(
    (sum, day) => sum + (day.emissions.energy || 0),
    0
  );

  const criteriaPayload = {
    calculations: emissionsData,
    currentCalculation,
    weeklyTravelEmissions,
    weeklyEnergyEmissions,
  };

  for (const badgeKey in badgeDefinitions) {
    const badge = badgeDefinitions[badgeKey];
    if (!existingBadges.find(b => b.id === badge.id) && badge.criteria(criteriaPayload)) {
      newBadges.push(badge);
    }
  }

  if (newBadges.length > 0) {
    saveBadges([...existingBadges, ...newBadges]);
  }

  return newBadges;
};