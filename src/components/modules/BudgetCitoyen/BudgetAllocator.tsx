import React from 'react';
import { 
  GraduationCap, 
  HeartPulse, 
  Shield, 
  Leaf, 
  Building2, 
  Train, 
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  RotateCcw,
  Users
} from 'lucide-react';
import { useDemocra } from '../../../context/DemocraContext';
import { BudgetSector } from '../../../types';

const ICON_MAP: Record<string, React.ReactNode> = {
  GraduationCap: <GraduationCap className="w-5 h-5" />,
  HeartPulse: <HeartPulse className="w-5 h-5" />,
  Shield: <Shield className="w-5 h-5" />,
  Leaf: <Leaf className="w-5 h-5" />,
  Building2: <Building2 className="w-5 h-5" />,
  Train: <Train className="w-5 h-5" />,
  Sparkles: <Sparkles className="w-5 h-5" />,
};

export const BudgetAllocator: React.FC = () => {
  const {
    budgetSectors,
    updateSectorAllocation,
    taxProfile,
    totalAllocatedPercent,
    isBudgetBalanced,
    resetBudgetToCitizens,
    resetBudgetToGov,
  } = useDemocra();

  const handleSliderChange = (sectorId: string, val: number) => {
    updateSectorAllocation(sectorId, val);
  };

  const calculateEuroShare = (percent: number) => {
    return Math.round((taxProfile.calculatedAnnualTax * percent) / 100);
  };

  return (
    <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4 sm:p-6 shadow-lg space-y-6">
      
      {/* Header & Balance Status */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-white font-display">
            Répartition Dynamique de Votre Impôt
          </h2>
          <p className="text-xs text-slate-400">
            Ajustez les curseurs pour allouer 100% de votre contribution aux secteurs prioritaires.
          </p>
        </div>

        {/* Action presets */}
        <div className="flex items-center gap-2">
          <button
            onClick={resetBudgetToCitizens}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-950/70 hover:bg-blue-900/80 text-blue-300 border border-blue-800/60 text-xs font-semibold transition-colors cursor-pointer"
            title="Appliquer la moyenne votée par les citoyens français"
          >
            <Users className="w-3.5 h-3.5" />
            <span>Moyenne Peuple</span>
          </button>

          <button
            onClick={resetBudgetToGov}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs font-medium transition-colors cursor-pointer"
            title="Revenir au budget officiel de l'État (PLF)"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Budget État Actuel</span>
          </button>
        </div>
      </div>

      {/* 100% Allocation Visual Bar */}
      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-400">Total alloué :</span>
          <div className="flex items-center gap-2">
            <span className={`font-mono font-bold text-sm ${
              isBudgetBalanced ? 'text-emerald-400' : 'text-amber-400'
            }`}>
              {totalAllocatedPercent}% / 100%
            </span>
            {isBudgetBalanced ? (
              <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                Équilibré
              </span>
            ) : (
              <span className="flex items-center gap-1 text-[11px] font-semibold text-amber-400">
                <AlertTriangle className="w-4 h-4" />
                {totalAllocatedPercent < 100 ? `Reste ${100 - totalAllocatedPercent}% à allouer` : `Dépassement de ${totalAllocatedPercent - 100}%`}
              </span>
            )}
          </div>
        </div>

        {/* Stacked colored segment bar */}
        <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden flex shadow-inner">
          {budgetSectors.map(sector => (
            <div
              key={sector.id}
              style={{
                width: `${sector.userPercent}%`,
                backgroundColor: sector.color,
              }}
              className="h-full transition-all duration-200"
              title={`${sector.name}: ${sector.userPercent}%`}
            />
          ))}
        </div>
      </div>

      {/* Sliders Grid */}
      <div className="space-y-4">
        {budgetSectors.map((sector: BudgetSector) => {
          const euroShare = calculateEuroShare(sector.userPercent);
          const icon = ICON_MAP[sector.iconName] || <Building2 className="w-5 h-5" />;

          return (
            <div
              key={sector.id}
              className="p-3.5 sm:p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-700/60 transition-all space-y-2.5"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${sector.color}20`, color: sector.color }}
                  >
                    {icon}
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                      <span>{sector.name}</span>
                    </h4>
                    <p className="text-[11px] text-slate-400 line-clamp-1">
                      {sector.description}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="font-mono text-sm sm:text-base font-extrabold text-white">
                    {sector.userPercent}%
                  </div>
                  <div className="font-mono text-[11px] text-blue-400">
                    {euroShare.toLocaleString('fr-FR')} €/an
                  </div>
                </div>
              </div>

              {/* Slider Controller */}
              <div className="flex items-center gap-3 pt-1">
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={sector.userPercent}
                  onChange={e => handleSliderChange(sector.id, Number(e.target.value))}
                  className="w-full h-2 rounded-lg bg-slate-800 appearance-none cursor-pointer accent-blue-500"
                />
              </div>

              {/* Sector Reference Pills (Government PLF vs Citizen Average) */}
              <div className="flex items-center justify-between text-[10px] text-slate-400 pt-0.5">
                <span>Budget officiel de l'État : <strong className="text-slate-300 font-mono">{sector.currentGovPercent}%</strong></span>
                <span>Voté par les citoyens : <strong className="text-blue-300 font-mono">{sector.nationalCitizenPercent}%</strong></span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
