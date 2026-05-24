import { GridCell, CellStatus } from '../types';

/**
 * Retorna a data exata (ano + mês) de cada célula da grade,
 * ajustada à data de nascimento real do usuário.
 *
 * Exemplo: nascido em 15/08/1990
 *   - Célula (year=0, month=1) → Agosto 1990
 *   - Célula (year=0, month=2) → Setembro 1990
 *   - Célula (year=1, month=1) → Agosto 1991
 *
 * O mês de nascimento é sempre o mês 1 de cada ano de vida.
 * O eixo Y (anos) vai de 0 até lifeExpectancy - 1.
 * O eixo X (meses) vai de 1 a 12.
 */
export function buildGrid(
  birthdate: Date,
  lifeExpectancy: number,
  today: Date = new Date()
): GridCell[][] {
  const grid: GridCell[][] = [];
  const birthYear = birthdate.getFullYear();
  const birthMonth = birthdate.getMonth();
  const birthDay = birthdate.getDate();

  for (let year = 0; year < lifeExpectancy; year++) {
    const row: GridCell[] = [];
    const yearStart = new Date(birthYear + year, birthMonth, birthDay);

    for (let weekOffset = 0; weekOffset < 52; weekOffset++) {
      const cellDate = new Date(yearStart.getTime() + weekOffset * 7 * 24 * 60 * 60 * 1000);
      const status = getCellStatus(cellDate, today);
      row.push({
        year,
        week: weekOffset + 1,
        date: cellDate,
        status,
      });
    }
    grid.push(row);
  }

  return grid;
}

export function getCellStatus(cellDate: Date, today: Date): CellStatus {
  // Normalize date comparison based on day granularity to avoid sub-second offsets causing mismatch
  const cellDay = new Date(cellDate.getFullYear(), cellDate.getMonth(), cellDate.getDate());
  const todayDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  
  const cellTime = cellDay.getTime();
  const todayTime = todayDay.getTime();
  const oneWeekMs = 7 * 24 * 60 * 60 * 1000;

  if (todayTime < cellTime) {
    return 'future';
  } else if (todayTime >= cellTime && todayTime < cellTime + oneWeekMs) {
    return 'current';
  } else {
    return 'lived';
  }
}

/**
 * Retorna a idade do usuário dada a sua data de nascimento
 */
export function calculateAge(birthdate: Date, today: Date = new Date()): number {
  let age = today.getFullYear() - birthdate.getFullYear();
  const m = today.getMonth() - birthdate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthdate.getDate())) {
    age--;
  }
  return age;
}

export interface DetailedAge {
  years: number;
  months: number;
}

export function calculateDetailedAge(birthdate: Date, targetDate: Date): DetailedAge {
  let years = targetDate.getFullYear() - birthdate.getFullYear();
  let months = targetDate.getMonth() - birthdate.getMonth();
  const daysDiff = targetDate.getDate() - birthdate.getDate();

  if (daysDiff < 0) {
    months--;
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  if (years < 0) {
    years = 0;
    months = 0;
  }

  return { years, months };
}
