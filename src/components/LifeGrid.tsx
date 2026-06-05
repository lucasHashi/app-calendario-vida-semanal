import React, { useState, useRef, useCallback, memo } from 'react';
import { GridCell, LifeGridData } from '../types';
import { useLifeGrid } from '../hooks/useLifeGrid';
import { GridCellComponent } from './GridCell';
import { Tooltip } from './Tooltip';
import { RotateCcw, Award, Hourglass, CalendarRange, Heart } from 'lucide-react';

interface LifeGridProps {
  birthdate: Date;
  lifeExpectancy: number;
  userName?: string;
  onClear: () => void;
}

export function LifeGrid({ birthdate, lifeExpectancy, userName, onClear }: LifeGridProps) {
  const gridData = useLifeGrid(birthdate, lifeExpectancy);
  const [hoveredCell, setHoveredCell] = useState<GridCell | null>(null);
  const [activeRect, setActiveRect] = useState<DOMRect | null>(null);

  if (!gridData) return null;

  const { cells, totalWeeks, livedWeeks, currentYear, currentWeek } = gridData;

  const percentageLived = Math.min(((livedWeeks / totalWeeks) * 100), 100);
  const percentageLivedStr = percentageLived.toFixed(1);

  const handleCellHover = useCallback((cell: GridCell | null, element: HTMLElement) => {
    if (cell) {
      setHoveredCell(cell);
      setActiveRect(element.getBoundingClientRect());
    }
  }, []);

  const handleCellLeave = useCallback(() => {
    setHoveredCell(null);
    setActiveRect(null);
  }, []);

  const getGreeting = () => {
    if (userName) {
      return `Olá, ${userName}`;
    }
    return `Sua Jornada`;
  };

  return (
    <div id="life-grid-root" className="max-w-6xl mx-auto w-full px-4 md:px-6 py-6 font-sans select-none animate-fast-fade">
      
      {/* Top Header Card Archive */}
      <div 
        id="life-grid-dashboard" 
        className="bg-[#EBE7DF] border border-[#1A1A1A] rounded-2xl p-6 md:p-8 mb-8 shadow-sm"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#1A1A1A]/20 pb-6">
          <div className="space-y-1">
            <span className="block text-[10px] uppercase tracking-[0.3em] text-[#C25E30] font-bold">
              THE MANIFEST
            </span>
            <h1 id="dashboard-username" className="text-2xl md:text-3.5xl font-serif italic font-semibold text-neutral-950 tracking-tight leading-none">
              {getGreeting()}
            </h1>
            <p className="text-xs text-neutral-600 leading-relaxed font-light italic mt-1.5">
              Dada a expectativa configurada de <strong className="font-semibold text-neutral-900">{lifeExpectancy} anos</strong>, cada célula representa uma semana de sua existência física.
            </p>
          </div>

          <button
            id="button-reset-data"
            onClick={onClear}
            className="self-start md:self-center flex items-center justify-center gap-2 px-4 py-2 text-[10px] uppercase tracking-widest font-mono font-bold text-neutral-900 border border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white rounded-lg transition-all duration-200 cursor-pointer shadow-xs"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Alterar Data</span>
          </button>
        </div>

        {/* Stats Grid - Crisp Editorial Columns */}
        <div id="dashboard-stats" className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="p-4 bg-[#F4F1EA] rounded-xl border border-[#1A1A1A]/10 flex flex-col justify-between">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#C25E30] flex items-center gap-1.5 label-stat">
              <Award className="w-3.5 h-3.5 opacity-80" />
              Tempo Vivido
            </span>
            <div className="mt-2.5">
              <span className="text-3xl font-serif italic text-neutral-900">{livedWeeks}</span>
              <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest ml-1.5">semanas</span>
            </div>
          </div>

          <div className="p-4 bg-[#F4F1EA] rounded-xl border border-[#1A1A1A]/10 flex flex-col justify-between">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-600 flex items-center gap-1.5 label-stat">
              <Hourglass className="w-3.5 h-3.5 opacity-80" />
              Tempo Restante
            </span>
            <div className="mt-2.5">
              <span className="text-3xl font-serif italic text-neutral-900">{Math.max(0, totalWeeks - livedWeeks)}</span>
              <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest ml-1.5">semanas</span>
            </div>
          </div>

          <div className="p-4 bg-[#F4F1EA] rounded-xl border border-[#1A1A1A]/10 flex flex-col justify-between">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-600 flex items-center gap-1.5 label-stat">
              <CalendarRange className="w-3.5 h-3.5 opacity-80" />
              Total Esperado
            </span>
            <div className="mt-2.5">
              <span className="text-3xl font-serif italic text-neutral-900">{totalWeeks}</span>
              <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest ml-1.5">({lifeExpectancy}a)</span>
            </div>
          </div>

          <div className="p-4 bg-[#F4F1EA] rounded-xl border border-[#1A1A1A]/10 flex flex-col justify-between">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#C25E30] flex items-center gap-1.5 label-stat">
              <Heart className="w-3.5 h-3.5 text-red-500" />
              Consumido
            </span>
            <div className="mt-2.5">
              <span className="text-3xl font-bold text-red-600">{percentageLivedStr}%</span>
              <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest ml-1.5">da jornada</span>
            </div>
          </div>
        </div>

        {/* Custom Progress Bar */}
        <div id="dashboard-progress-container" className="mt-6 border-t border-[#1A1A1A]/15 pt-5">
          <div className="flex justify-between items-center text-[10px] font-mono font-bold text-neutral-500 tracking-wider mb-2">
            <span>START (NASCIMENTO)</span>
            <span className="text-[#C25E30] font-sans italic">{percentageLivedStr}% VIVIDO</span>
            <span>END ({lifeExpectancy} ANOS)</span>
          </div>
          <div className="w-full h-2.5 bg-[#F4F1EA] border border-[#1A1A1A]/30 rounded-full overflow-hidden">
            <div 
              id="progress-fill-lived"
              style={{ width: `${percentageLived}%` }}
              className="h-full bg-[#1A1A1A] transition-all duration-1000 ease-out"
            />
          </div>
        </div>
      </div>

      {/* Main Grid Area */}
      <div 
        id="life-grid-container" 
        className="bg-white border border-[#1A1A1A] rounded-2xl p-5 md:p-8 flex flex-col items-center overflow-x-auto shadow-xs"
      >
        <div className="min-w-[720px] w-full max-w-[960px]">
          
          {/* Header Legend */}
          <div id="grid-legend" className="flex flex-wrap items-center justify-center gap-6 mb-8 text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-500 border-b border-neutral-100 pb-5">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#1A1A1A] inline-block" />
              <span>Vivido</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse shadow-[0_0_4px_rgba(239,68,68,0.5)] inline-block" />
              <span className="text-[#C25E30]">Semana Atual</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-white border border-neutral-300 inline-block" />
              <span>Futuro</span>
            </div>
          </div>

          {/* Grid Headers Weeks X-Axis */}
          <div id="grid-header-weeks" className="grid grid-cols-[4.2rem_1fr] gap-3 mb-3 border-b border-dashed border-neutral-200 pb-2">
            <div className="text-[9px] font-mono font-bold text-neutral-450 flex items-center">
              ANO \ SEMANA
            </div>
            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(52, minmax(0, 1fr))',
                gap: '2px',
              }}
              className="text-center"
            >
              {Array.from({ length: 52 }, (_, i) => i + 1).map((weekNum) => {
                const isTick = weekNum === 1 || weekNum === 52 || weekNum % 5 === 0;
                return (
                  <div 
                    key={weekNum} 
                    className={`text-[7px] md:text-[8.5px] font-mono font-semibold leading-none ${
                      isTick ? 'text-neutral-900 font-extrabold' : 'text-neutral-400 font-normal opacity-70'
                    }`}
                    title={`Coluna correspondente à semana ${weekNum} do ano`}
                  >
                    {weekNum}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Grid rows mapping */}
          <div id="grid-rows-y-axis" className="space-y-1.5">
            {cells.map((rowCells, yIdx) => (
              <LifeGridRow
                key={yIdx}
                rowCells={rowCells}
                yIdx={yIdx}
                handleCellHover={handleCellHover}
                handleCellLeave={handleCellLeave}
              />
            ))}
          </div>

        </div>
      </div>

      {/* Floating Tooltip Component */}
      {hoveredCell && activeRect && (
        <Tooltip
          cell={hoveredCell}
          targetRect={activeRect}
          birthdate={birthdate}
        />
      )}

      {/* Interactive Footer quote */}
      <footer id="grid-footer" className="mt-12 text-center text-xs text-neutral-600 leading-relaxed font-sans pb-10">
        <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-[#C25E30] font-bold mb-3">MEMENTO MORI</p>
        <p className="max-w-md mx-auto italic font-light">
          "Lembre-se de quanto tempo você já usou e de que cada linha representa um ano inteiro de risos, desafios, aprendizados e conquistas. Valorize o presente."
        </p>
      </footer>
    </div>
  );
}

interface LifeGridRowProps {
  rowCells: GridCell[];
  yIdx: number;
  handleCellHover: (cell: GridCell | null, element: HTMLElement) => void;
  handleCellLeave: () => void;
}

const LifeGridRow = memo(function LifeGridRow({
  rowCells,
  yIdx,
  handleCellHover,
  handleCellLeave,
}: LifeGridRowProps) {
  const rowCalendarYear = rowCells[0].date.getFullYear();

  return (
    <div className="grid grid-cols-[4.2rem_1fr] gap-3 items-center">
      
      {/* Y-Axis Label - Displays calendar year only */}
      <div 
        className="text-neutral-900 border-l-2 border-[#1A1A1A] pl-1.5 flex flex-col justify-center leading-none"
      >
        <span className="text-neutral-950 font-mono text-[9.5px] font-bold">{rowCalendarYear}</span>
      </div>

      {/* 52 Weekly Cells */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(52, minmax(0, 1fr))',
          gap: '2.5px',
        }}
      >
        {rowCells.map((cell, wIdx) => (
          <GridCellComponent
            key={wIdx}
            cell={cell}
            onHover={handleCellHover}
            onLeave={handleCellLeave}
            indexInLine={wIdx}
          />
        ))}
      </div>

    </div>
  );
});
