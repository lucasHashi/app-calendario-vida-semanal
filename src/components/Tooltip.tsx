import { useEffect, useState } from 'react';
import { GridCell } from '../types';
import { calculateDetailedAge } from '../utils/dateCalc';

interface TooltipProps {
  cell: GridCell;
  targetRect: DOMRect | null;
  birthdate: Date;
}

export function Tooltip({ cell, targetRect, birthdate }: TooltipProps) {
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (!targetRect) return;

    // Approximate size of tooltip
    const tooltipWidth = 220;
    const tooltipHeight = 110;

    const scrollY = window.scrollY;
    const scrollX = window.scrollX;

    let top = targetRect.top + scrollY - tooltipHeight - 10;
    let left = targetRect.left + scrollX + targetRect.width / 2 - tooltipWidth / 2;

    // Viewport overflow prevention
    if (left < 12) {
      left = 12;
    }
    const maxLeft = window.innerWidth - tooltipWidth - 12;
    if (left > maxLeft) {
      left = maxLeft;
    }

    if (top < scrollY + 12) {
      // Render below the cell instead
      top = targetRect.bottom + scrollY + 10;
    }

    setCoords({ top, left });
  }, [targetRect, cell]);

  if (!targetRect) return null;

  const endDate = new Date(cell.date.getTime() + 6 * 24 * 60 * 60 * 1000);
  const formattedStartDate = cell.date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  const formattedEndDate = endDate.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  
  const monthName = cell.date.toLocaleDateString('pt-BR', { month: 'short' });
  const calendarYear = cell.date.getFullYear();
  
  const { years: detailedYears, months: detailedMonths } = calculateDetailedAge(birthdate, cell.date);

  let ageDisplayStr = '';
  if (detailedYears === 0) {
    if (detailedMonths === 0) {
      ageDisplayStr = 'menos de 1 mês de idade';
    } else if (detailedMonths === 1) {
      ageDisplayStr = '1 mês de idade';
    } else {
      ageDisplayStr = `${detailedMonths} meses de idade`;
    }
  } else {
    const yearsPart = detailedYears === 1 ? '1 ano' : `${detailedYears} anos`;
    if (detailedMonths === 0) {
      ageDisplayStr = `${yearsPart} de idade`;
    } else if (detailedMonths === 1) {
      ageDisplayStr = `${yearsPart} e 1 mês de idade`;
    } else {
      ageDisplayStr = `${yearsPart} e ${detailedMonths} meses de idade`;
    }
  }

  let statusLabel = '';
  let statusBadgeStyles = '';

  if (cell.status === 'lived') {
    statusLabel = 'Vivido';
    statusBadgeStyles = 'bg-neutral-900 border-neutral-950 text-white';
  } else if (cell.status === 'current') {
    statusLabel = 'Atual';
    statusBadgeStyles = 'bg-red-500 border-red-600 text-white shadow-[0_0_6px_rgba(239,68,68,0.4)]';
  } else {
    statusLabel = 'Futuro';
    statusBadgeStyles = 'bg-neutral-100 border-neutral-200 text-neutral-650';
  }

  return (
    <div
      id="life-grid-tooltip"
      style={{
        position: 'absolute',
        top: `${coords.top}px`,
        left: `${coords.left}px`,
        width: '230px',
      }}
      className="z-50 bg-white/95 backdrop-blur-md border border-neutral-300 shadow-xl rounded-xl p-3.5 pointer-events-none transition-all duration-75 animate-fast-fade font-sans"
    >
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono font-bold tracking-wider text-[#C25E30] uppercase">
            Semana {cell.week} · {monthName.toUpperCase()} {calendarYear}
          </span>
          <span className={`px-1.5 py-0.5 text-[8px] font-mono font-bold uppercase rounded border ${statusBadgeStyles}`}>
            {statusLabel}
          </span>
        </div>
        
        <div className="border-y border-neutral-100 py-1.5 my-1.5 text-left">
          <p className="text-[10px] text-neutral-400 font-medium font-mono">PERÍODO:</p>
          <p className="text-xs font-semibold text-neutral-800 tracking-tight">
            {formattedStartDate} — {formattedEndDate}
          </p>
        </div>

        <div className="pt-0.5">
          <p className="text-[10px] text-neutral-400 font-medium font-mono leading-none">IDADE ESTIMADA:</p>
          <p className="text-xs font-bold text-neutral-905 mt-1 leading-snug">
            {ageDisplayStr}
          </p>
        </div>

        <p className="text-[8px] font-mono text-neutral-400 leading-none pt-1">
          Ano de vida {cell.year} · Coluna {cell.week}
        </p>
      </div>
    </div>
  );
}
