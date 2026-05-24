import React from 'react';
import { GridCell } from '../types';

interface GridCellProps {
  key?: any;
  cell: GridCell;
  onHover: (cell: GridCell | null, element: HTMLElement) => void;
  onLeave: () => void;
  indexInLine: number;
}

export function GridCellComponent({ cell, onHover, onLeave, indexInLine }: GridCellProps) {
  const { year, week, date, status } = cell;

  // Render a simpler non-interactive empty circle for future weeks to optimize DOM and hover performance
  if (status === 'future') {
    return (
      <div
        id={`cell-${year}-${week}`}
        className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full border border-neutral-300 bg-white flex-shrink-0"
      />
    );
  }

  // Formatting date for label
  const localeMonthName = date.toLocaleDateString('pt-BR', { month: 'long' });
  const yearCalendar = date.getFullYear();

  // Create descriptive accessible label in Portuguese
  let statusText = '';
  if (status === 'lived') statusText = 'Vivido';
  else if (status === 'current') statusText = 'Semana Atual';

  const ariaLabelText = `Ano de vida ${year}, Semana ${week} (${localeMonthName} de ${yearCalendar}) - Status: ${statusText}`;

  // Tailoring style classes based on status
  let cellClass = '';
  if (status === 'lived') {
    cellClass = 'bg-[#1A1A1A] border-none scale-100 hover:scale-150 hover:bg-[#C25E30]';
  } else if (status === 'current') {
    // Current is colored with deep pulsing highlight or vibrant terracotta-orange
    cellClass = 'bg-red-500 border-none scale-125 z-10 hover:scale-175 animate-pulse shadow-[0_0_6px_rgba(239,68,68,0.8)]';
  }

  // Handle focus or blur for accessible reading of tooltips
  const handleFocus = (e: React.FocusEvent<HTMLButtonElement>) => {
    onHover(cell, e.currentTarget);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    onHover(cell, e.currentTarget);
  };

  return (
    <button
      id={`cell-${year}-${week}`}
      type="button"
      role="gridcell"
      aria-label={ariaLabelText}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={onLeave}
      onFocus={handleFocus}
      onBlur={onLeave}
      className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full outline-none transition-all duration-150 ease-out flex-shrink-0 cursor-crosshair ${cellClass}`}
    />
  );
}
