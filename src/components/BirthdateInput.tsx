import React, { useState } from 'react';
import { Calendar, ArrowRight, User, Hourglass } from 'lucide-react';

interface BirthdateInputProps {
  onConfirm: (date: Date, name: string, lifeExpectancy: number) => void;
}

export function BirthdateInput({ onConfirm }: BirthdateInputProps) {
  const [dateStr, setDateStr] = useState('');
  const [name, setName] = useState('');
  const [expectancy, setExpectancy] = useState('90');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!dateStr) {
      setError('Por favor, insira sua data de nascimento.');
      return;
    }

    // Append standard time to ensure consistent timezone parsing
    const inputDate = new Date(dateStr + 'T00:00:00');
    const today = new Date();
    today.setHours(23, 59, 59, 999); // Allow today to count

    if (isNaN(inputDate.getTime())) {
      setError('Data de nascimento inválida.');
      return;
    }

    if (inputDate > today) {
      setError('A sua data de nascimento não pode estar no futuro.');
      return;
    }

    const expValue = parseInt(expectancy, 10);
    if (isNaN(expValue) || expValue < 20 || expValue > 120) {
      setError('A expectativa de vida razoável deve ser entre 20 e 120 anos.');
      return;
    }

    onConfirm(inputDate, name.trim(), expValue);
  };

  return (
    <div 
      id="onboarding-container" 
      className="flex flex-col items-center justify-center py-10 px-4 max-w-md mx-auto w-full animate-fast-fade"
    >
      <div 
        id="onboarding-card"
        className="w-full bg-[#EBE7DF] border border-[#1A1A1A] rounded-2xl p-8 shadow-sm transition-all duration-300"
      >
        <div id="onboarding-header" className="text-left mb-8 border-b border-[#1A1A1A]/20 pb-6">
          <span className="block text-[10px] uppercase tracking-[0.3em] text-[#C25E30] font-bold mb-2">
            The Vision
          </span>
          <h1 
            id="onboarding-title" 
            className="text-3xl md:text-4xl font-serif italic font-semibold text-neutral-950 tracking-tight leading-none"
          >
            Inicie a Jornada.
          </h1>
          <p 
            id="onboarding-subtitle" 
            className="text-xs text-neutral-600 mt-3 leading-relaxed font-light italic"
          >
            Visualize a totalidade da sua vida em uma única tela. Um reflexo simples e honesto sobre o tempo consumido e o tempo que ainda resta para novas conquistas.
          </p>
        </div>

        <form id="onboarding-form" onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div 
              id="onboarding-error" 
              className="p-3 bg-red-50 border border-red-200 text-red-800 text-[11px] font-mono rounded"
              role="alert"
            >
              [ERROR]: {error}
            </div>
          )}

          <div id="field-name-container" className="space-y-1.5">
            <label 
              id="label-name" 
              htmlFor="input-name" 
              className="block text-[10px] uppercase tracking-widest text-[#1A1A1A] font-bold"
            >
              Qual o seu nome? <span className="text-neutral-500 font-normal italic">(opcional)</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-neutral-500 pointer-events-none">
                <User className="w-3.5 h-3.5" />
              </span>
              <input
                id="input-name"
                name="userName"
                type="text"
                placeholder="Ex: Lucas"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full pl-10 pr-4 py-3 text-sm bg-neutral-50/80 border border-[#1A1A1A] rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#C25E30] focus:border-[#C25E30] transition-all font-sans"
              />
            </div>
          </div>

          <div id="field-birthdate-container" className="space-y-1.5">
            <label 
              id="label-birthdate" 
              htmlFor="input-birthdate" 
              className="block text-[10px] uppercase tracking-widest text-[#1A1A1A] font-bold"
            >
              Data de Nascimento
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-neutral-500 pointer-events-none">
                <Calendar className="w-3.5 h-3.5" />
              </span>
              <input
                id="input-birthdate"
                name="birthdate"
                type="date"
                required
                value={dateStr}
                onChange={(e) => setDateStr(e.target.value)}
                className="block w-full pl-10 pr-4 py-3 text-sm bg-neutral-50/80 border border-[#1A1A1A] rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#C25E30] focus:border-[#C25E30] transition-all font-sans"
              />
            </div>
          </div>

          <div id="field-expectancy-container" className="space-y-1.5">
            <label 
              id="label-expectancy" 
              htmlFor="input-expectancy" 
              className="block text-[10px] uppercase tracking-widest text-[#1A1A1A] font-bold"
            >
              Expectativa de Vida (Anos)
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-neutral-500 pointer-events-none">
                <Hourglass className="w-3.5 h-3.5" />
              </span>
              <input
                id="input-expectancy"
                name="lifeExpectancy"
                type="number"
                min="20"
                max="120"
                value={expectancy}
                onChange={(e) => setExpectancy(e.target.value)}
                className="block w-full pl-10 pr-4 py-3 text-sm bg-neutral-50/80 border border-[#1A1A1A] rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#C25E30] focus:border-[#C25E30] transition-all font-sans"
              />
            </div>
            <p id="expectancy-help" className="text-[10px] text-neutral-500 italic font-light leading-normal">
              A média global recomendada de idade é de 80–90 anos. Totalmente ajustável.
            </p>
          </div>

          <button
            id="button-start-journey"
            type="submit"
            className="w-full flex items-center justify-center gap-3 py-4 bg-[#1A1A1A] hover:bg-[#C25E30] text-white font-serif italic uppercase text-xs tracking-widest font-bold border border-[#1A1A1A] rounded-xl transition-all duration-200 cursor-pointer shadow-sm active:scale-[0.98] group"
          >
            <span>Gerar Meu Calendário</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      </div>

      <div id="onboarding-disclaimer" className="mt-6 text-center">
        <p className="text-[10px] tracking-wide text-neutral-500 uppercase font-mono">
          [ 100% Client-Side Persistence ]
        </p>
      </div>
    </div>
  );
}
