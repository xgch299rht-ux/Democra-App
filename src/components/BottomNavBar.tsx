import React from 'react';
import { Vote, PieChart, Swords } from 'lucide-react';
import { useDemocra } from '../context/DemocraContext';

export const BottomNavBar: React.FC = () => {
  const { activeTab, setActiveTab } = useDemocra();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-800/90 pb-safe">
      <div className="grid grid-cols-3 h-15">
        <button
          onClick={() => setActiveTab('lois')}
          className={`flex flex-col items-center justify-center gap-1 transition-colors min-h-[48px] ${
            activeTab === 'lois' ? 'text-blue-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Vote className="w-5 h-5" />
          <span className="text-[10px] tracking-tight">Lois & Débats</span>
        </button>

        <button
          onClick={() => setActiveTab('budget')}
          className={`flex flex-col items-center justify-center gap-1 transition-colors min-h-[48px] ${
            activeTab === 'budget' ? 'text-blue-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <PieChart className="w-5 h-5" />
          <span className="text-[10px] tracking-tight">Budget Citoyen</span>
        </button>

        <button
          onClick={() => setActiveTab('octogone')}
          className={`flex flex-col items-center justify-center gap-1 transition-colors min-h-[48px] ${
            activeTab === 'octogone' ? 'text-blue-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Swords className="w-5 h-5" />
          <span className="text-[10px] tracking-tight">Octogone</span>
        </button>
      </div>
    </nav>
  );
};
