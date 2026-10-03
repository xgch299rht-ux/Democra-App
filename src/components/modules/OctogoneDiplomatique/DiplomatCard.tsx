import React from 'react';
import { DiplomatFighter } from '../../../types';
import { Swords, Zap, Quote } from 'lucide-react';

interface DiplomatCardProps {
  fighter: DiplomatFighter;
  side: 'A' | 'B';
}

export const DiplomatCard: React.FC<DiplomatCardProps> = ({ fighter, side }) => {
  return (
    <div className={`p-4 rounded-2xl bg-slate-950 border ${
      side === 'A' ? 'border-blue-800/60' : 'border-indigo-800/60'
    } space-y-3 relative overflow-hidden`}>
      
      {/* Country Flag Badge & Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{fighter.flag}</span>
          <div>
            <h4 className="text-sm font-bold text-white font-display">{fighter.name}</h4>
            <span className="text-[11px] text-slate-400">{fighter.title} ({fighter.country})</span>
          </div>
        </div>
      </div>

      {/* Quote */}
      <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] text-slate-300 italic flex items-start gap-1.5">
        <Quote className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
        <span>{fighter.quote}</span>
      </div>

      {/* Special Move */}
      <div className="text-xs">
        <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold block mb-0.5">
          Coup Spécial Diplomatique :
        </span>
        <div className="flex items-center gap-1.5 font-semibold text-blue-300 bg-blue-950/40 p-2 rounded-lg border border-blue-900/40">
          <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="text-[11px]">{fighter.specialMove}</span>
        </div>
      </div>

      {/* Stats Radar-like bars */}
      <div className="space-y-1.5 pt-1 text-[11px]">
        <div className="flex items-center justify-between text-slate-400">
          <span>Rhétorique & Éloquence</span>
          <span className="font-mono font-bold text-white">{fighter.stats.rhetorique}/100</span>
        </div>
        <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
          <div className="bg-blue-500 h-full" style={{ width: `${fighter.stats.rhetorique}%` }} />
        </div>

        <div className="flex items-center justify-between text-slate-400">
          <span>Ténacité & Endurance</span>
          <span className="font-mono font-bold text-white">{fighter.stats.tenacite}/100</span>
        </div>
        <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
          <div className="bg-emerald-500 h-full" style={{ width: `${fighter.stats.tenacite}%` }} />
        </div>

        <div className="flex items-center justify-between text-slate-400">
          <span>Sang-Froid / Flegme</span>
          <span className="font-mono font-bold text-white">{fighter.stats.sangFroid}/100</span>
        </div>
        <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
          <div className="bg-amber-500 h-full" style={{ width: `${fighter.stats.sangFroid}%` }} />
        </div>

        <div className="flex items-center justify-between text-slate-400">
          <span>Coup Bas Diplomatique</span>
          <span className="font-mono font-bold text-white">{fighter.stats.coupBasDiplomatique}/100</span>
        </div>
        <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
          <div className="bg-rose-500 h-full" style={{ width: `${fighter.stats.coupBasDiplomatique}%` }} />
        </div>
      </div>

    </div>
  );
};
