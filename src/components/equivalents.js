import { equivalents } from '../data/equivalents.js';

export const getImpactEquivalents = (emissionsKg) => {
  if (!emissionsKg || emissionsKg <= 0) return [];

  return equivalents.map(eq => ({
    ...eq,
    value: emissionsKg / eq.co2PerUnit,
  }));
};