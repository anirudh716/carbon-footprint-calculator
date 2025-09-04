/**
 * This file contains the definitions for all the badges that can be awarded to users.
 * Each badge has a unique ID, a name, a description, an icon, and a criteria function.
 * The criteria function determines if a user has earned the badge based on their emissions data.
 */

export const badges = {
  firstStep: {
    id: 'firstStep',
    name: 'First Step',
    description: 'Awarded for completing your first carbon footprint calculation.',
    icon: 'Footprints',
    criteria: ({ calculations }) => calculations.length === 1,
  },
  ecoWarrior: {
    id: 'ecoWarrior',
    name: 'Eco-Warrior',
    description: 'Awarded for a day with total emissions under 10 kg CO₂.',
    icon: 'Shield',
    criteria: ({ currentCalculation }) => {
      const total = Object.values(currentCalculation.emissions).reduce((sum, val) => sum + val, 0);
      return total > 0 && total < 10;
    },
  },
  greenCommuter: {
    id: 'greenCommuter',
    name: 'Green Commuter',
    description: 'Awarded for a full week with zero travel emissions.',
    icon: 'Bike',
    criteria: ({ weeklyTravelEmissions, calculations }) => {
        return calculations.length >= 7 && weeklyTravelEmissions === 0;
    }
  },
};
