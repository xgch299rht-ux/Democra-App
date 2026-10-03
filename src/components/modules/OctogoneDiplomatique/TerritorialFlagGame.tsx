import React from 'react';
import { Flag, Globe2, ShieldCheck, MapPin, Calendar, Award } from 'lucide-react';
import { useDemocra } from '../../../context/DemocraContext';
import { TerritoryFlag } from '../../../types';

export const TerritorialFlagGame: React.FC = () => {
  const { territories } = useDemocra();

  return (
    <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4 sm:p-6 shadow-lg space-y-6">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-600/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Globe2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white font-display">
              Le Jeu du Drapeau : Rencontres Triennales Inter-Nations
            </h3>
            <p className="text-xs text-slate-400">
              Arbitrage territorial symbolique et écologique • Zéro troupe armée engagée
            </p>
          </div>
        </div>

        <div className="text-xs text-slate-400 flex items-center gap-1 font-mono">
          <Calendar className="w-3.5 h-3.5 text-blue-400" />
          <span>Prochaine édition : 2026-2027</span>
        </div>
      </div>

      {/* Rules summary banner */}
      <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed space-y-1">
        <strong className="text-white block">Règles fondamentales du Jeu du Drapeau :</strong>
        <p className="text-[11px] text-slate-400">
          Tous les 3 ans, les litiges frontaliers, les zones de pêche disputées et les îlots maritimes sont remis en jeu lors d'épreuves diplomatiques, scientifiques et sportives officielles. La nation vainqueur hisse son drapeau pour le mandat triennal et applique sa charte environnementale.
        </p>
      </div>

      {/* Territories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {territories.map((territory: TerritoryFlag) => (
          <div
            key={territory.id}
            className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 hover:border-slate-700 space-y-3 transition-all"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>{territory.name}</span>
                </h4>
                <span className="text-[11px] text-slate-400">{territory.zone}</span>
              </div>

              {/* Current Holder Badge */}
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold">
                <span>{territory.holderFlag}</span>
                <span className="text-white">{territory.currentHolder}</span>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-900/70 border border-slate-800/80 text-[11px] text-slate-300 space-y-1">
              <span className="text-slate-400 block text-[10px] uppercase tracking-wider font-semibold">
                Enjeu pacifique du mandat :
              </span>
              <p>{territory.symbolicStake}</p>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800/60">
              <div className="flex items-center gap-2">
                <span>Nations concurrentes :</span>
                <div className="flex items-center gap-1 font-semibold text-slate-300">
                  {territory.contenders.join(' vs ')}
                </div>
              </div>
              <span className="font-mono text-blue-400 font-bold">
                Édition {territory.triennialMatchYear}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Worldwide Pacification Ranking */}
      <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-900/40 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <Award className="w-5 h-5 text-amber-400 shrink-0" />
          <div>
            <span className="font-bold text-white block">Classement Mondial de l'Arbitrage Pacifique</span>
            <span className="text-slate-400 text-[11px]">1. France (14 litiges résolus) · 2. Suisse · 3. Islande · 4. Canada</span>
          </div>
        </div>

        <div className="text-[11px] font-mono text-emerald-400 font-semibold">
          100% Sans Conflit Armé
        </div>
      </div>

    </div>
  );
};
