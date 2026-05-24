import { useMemo } from 'react';
import { LifeGridData } from '../types';
import { buildGrid } from '../utils/dateCalc';

export function useLifeGrid(birthdate: Date | null, lifeExpectancy: number): LifeGridData | null {
  return useMemo(() => {
    if (!birthdate) return null;

    const today = new Date();
    const cells = buildGrid(birthdate, lifeExpectancy, today);

    const totalWeeks = lifeExpectancy * 52;
    let livedWeeks = 0;
    let currentYear = -1;
    let currentWeek = -1;

    for (let y = 0; y < cells.length; y++) {
      for (let w = 0; w < cells[y].length; w++) {
        const cell = cells[y][w];
        if (cell.status === 'lived') {
          livedWeeks++;
        } else if (cell.status === 'current') {
          currentYear = y;
          currentWeek = w + 1;
        }
      }
    }

    return {
      cells,
      totalWeeks,
      livedWeeks,
      currentYear,
      currentWeek,
    };
  }, [birthdate, lifeExpectancy]);
}
