export type CellStatus = 'lived' | 'current' | 'future';

export interface GridCell {
  year: number;        // ano de vida (0-based: ano 0 = primeiro tempo)
  week: number;        // semana do ano (1–52)
  date: Date;          // início dessa semana de vida
  status: CellStatus;
}

export interface LifeGridData {
  cells: GridCell[][];   // [year][week-1], dimensões: lifeExpectancy × 52
  totalWeeks: number;
  livedWeeks: number;
  currentYear: number;   // índice do ano atual na grade (0-based)
  currentWeek: number;   // índice da semana atual na grade (1–52)
}

