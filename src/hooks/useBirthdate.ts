import { useState } from 'react';

const STORAGE_KEY = 'col_birthdate';
const EXPECTANCY_KEY = 'col_expectancy';
const NAME_KEY = 'col_name';

export function useBirthdate() {
  const [birthdate, setBirthdateState] = useState<Date | null>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? new Date(stored) : null;
  });

  const [lifeExpectancy, setLifeExpectancyState] = useState<number>(() => {
    const stored = localStorage.getItem(EXPECTANCY_KEY);
    return stored ? parseInt(stored, 10) : 90; // Default is 90 years
  });

  const [userName, setUserNameState] = useState<string>(() => {
    const stored = localStorage.getItem(NAME_KEY);
    return stored || '';
  });

  const setBirthdate = (date: Date) => {
    localStorage.setItem(STORAGE_KEY, date.toISOString());
    setBirthdateState(date);
  };

  const setLifeExpectancy = (expectancy: number) => {
    localStorage.setItem(EXPECTANCY_KEY, expectancy.toString());
    setLifeExpectancyState(expectancy);
  };

  const setUserName = (name: string) => {
    localStorage.setItem(NAME_KEY, name);
    setUserNameState(name);
  };

  const clearAll = () => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(EXPECTANCY_KEY);
    localStorage.removeItem(NAME_KEY);
    setBirthdateState(null);
    setLifeExpectancyState(90);
    setUserNameState('');
  };

  return {
    birthdate,
    lifeExpectancy,
    userName,
    setBirthdate,
    setLifeExpectancy,
    setUserName,
    clearAll,
  };
}
