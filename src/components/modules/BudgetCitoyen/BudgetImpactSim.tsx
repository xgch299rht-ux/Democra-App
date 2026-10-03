import React from 'react';
import { Sparkles, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import { useDemocra } from '../../../context/DemocraContext';

export const BudgetImpactSim: React.FC = () => {
  const { budgetSectors } = useDemocra();

  return (
    <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4 sm:p-6 shadow-lg space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base sm:text-lg font-bold text-white font-display">
            Simulateur d'Impact Concret dans le Réel
          </h3>
          <p className="text-xs text-slate-400">
            Conséquences directes de votre arbitrage sur la vie quotidienne des Français.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {budgetSectors.map(sector => {
          const isHigh = sector.userPercent >= sector.concreteImpacts.threshold;
          const diffWithGov = sector.userPercent - sector.currentGovPercent;

          return (
            <div
              key={sector.id}
              className={`p-3.5 rounded-xl border transition-all text-xs ${
                isHigh
                  ? 'bg-emerald-950/20 border-emerald-800/40 text-emerald-200'
                  : 'bg-slate-950 border-slate-800/80 text-slate-300'
              }`}
            >
              <div className="flex items-center justify-between font-semibold mb-1.5">
                <span className="text-white flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: sector.color }} />
                  {sector.name} ({sector.userPercent}%)
                </span>
                
                <span className={`text-[10px] font-mono font-bold flex items-center gap-0.5 ${
                  diffWithGov > 0 ? 'text-emerald-400' : diffWithGov < 0 ? 'text-amber-400' : 'text-slate-400'
                }`}>
                  {diffWithGov > 0 ? <TrendingUp className="w-3 h-3" /> : diffWithGov < 0 ? <TrendingDown className="w-3 h-3" /> : null}
                  {diffWithGov > 0 ? `+${diffWithGov}% vs État` : diffWithGov < 0 ? `${diffWithGov}% vs État` : 'Conforme État'}
                </span>
              </div>

              <p className="text-[11px] leading-relaxed text-slate-300">
                {isHigh ? sector.concreteImpacts.positive : sector.concreteImpacts.negative}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
