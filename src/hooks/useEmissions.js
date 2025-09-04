import { useState, useEffect, useCallback } from 'react';
import { getEmissions, saveEmission as saveEmissionToStorage } from '../utils/storage';

export const useEmissions = () => {
  const [emissions, setEmissions] = useState([]);

  useEffect(() => {
    setEmissions(getEmissions());
  }, []);

  const saveEmission = useCallback((date, emissionData) => {
    const updatedEmissions = saveEmissionToStorage(date, emissionData);
    setEmissions(updatedEmissions);
  }, []);

  return { emissions, saveEmission };
};