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
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] uppercase tracking-[0.2em] font-medium text-neutral-600">
          <p className="max-w-md text-center sm:text-left leading-relaxed">
            Siga o material completo para manter a integridade dos dados e a privacidade do usuário em seu hardware local.
          </p>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <div className="text-xs font-bold uppercase text-neutral-900">Build v1.0.4</div>
              <div className="text-[9px] text-neutral-450 tracking-wide font-mono">Stable Local Deployment</div>
            </div>
            <div className="w-10 h-10 rounded-full border border-[#1A1A1A] flex items-center justify-center font-serif italic text-sm font-semibold text-neutral-900 bg-[#EBE7DF]">
              C
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
