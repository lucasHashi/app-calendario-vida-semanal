import { useBirthdate } from './hooks/useBirthdate';
import { BirthdateInput } from './components/BirthdateInput';
import { LifeGrid } from './components/LifeGrid';
import { Calendar, Compass } from 'lucide-react';

export default function App() {
  const {
    birthdate,
    lifeExpectancy,
    userName,
    setBirthdate,
    setLifeExpectancy,
    setUserName,
    clearAll,
  } = useBirthdate();

  const handleOnboardingConfirm = (date: Date, name: string, expectancy: number) => {
    setBirthdate(date);
    setUserName(name);
    setLifeExpectancy(expectancy);
  };

  return (
    <div id="app-main-layout" className="min-h-screen bg-[#F4F1EA] text-[#1A1A1A] font-sans md:border-[16px] border-white flex flex-col justify-between box-border selection:bg-neutral-900 selection:text-white">
      
      {/* Editorial Header */}
      <header id="app-main-header" className="w-full border-b border-[#1A1A1A] py-6 px-6 max-w-6xl mx-auto flex justify-center items-center">
        <div className="text-xl md:text-2xl font-serif italic font-semibold text-[#C25E30] text-center">
          Calendar of Your Life
        </div>
      </header>

      {/* Main Content Area */}
      <main id="app-main-content" className="flex-grow flex items-center justify-center py-10 px-4">
        {!birthdate ? (
          <BirthdateInput onConfirm={handleOnboardingConfirm} />
        ) : (
          <LifeGrid
            birthdate={birthdate}
            lifeExpectancy={lifeExpectancy}
            userName={userName}
            onClear={clearAll}
          />
        )}
      </main>

      {/* Elegant Editorial Footer */}
      <footer id="app-main-footer" className="w-full py-6 px-6 border-t border-[#1A1A1A] max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-neutral-600">
          <p className="max-w-xl text-center sm:text-left leading-relaxed text-[11px] text-neutral-600 normal-case tracking-normal">
            Feito por: <span className="font-semibold text-neutral-900">Lucas Hashi</span> no tempo livre. A ideia é inspirar a aproveitar o que ainda tem, ter perspectiva do todo é bom pra valorizar o que resta.
          </p>
          <div className="text-center sm:text-right text-[10px] uppercase tracking-[0.15em] font-mono text-neutral-500">
            Última atualização: <span className="font-sans font-bold text-neutral-900 normal-case tracking-normal text-xs ml-1">06/06/2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
