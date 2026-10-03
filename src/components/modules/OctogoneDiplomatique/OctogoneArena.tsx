import React, { useState } from 'react';
import { Swords, Play, Trophy, Users, Shield, Zap } from 'lucide-react';
import { useDemocra } from '../../../context/DemocraContext';
import { DiplomatCard } from './DiplomatCard';
import { DiplomaticMatchModal } from './DiplomaticMatchModal';
import { TerritorialFlagGame } from './TerritorialFlagGame';
import { DiplomaticDispute } from '../../../types';

export const OctogoneArena: React.FC = () => {
  const { disputes, activeMatchDispute, setActiveMatchDispute } = useDemocra();
  const [selectedDisputeForDetails, setSelectedDisputeForDetails] = useState<DiplomaticDispute | null>(null);

  return (
    <div className="space-y-6">
      
      {/* Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-xl">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: "url('/src/assets/images/diplomatic_octogone_1791001788104.jpg')" }}
        />
        <div className="absolute inset-0 bg-linear-to-r from-slate-950 via-slate-950/85 to-transparent" />

        <div className="relative z-10 p-5 sm:p-8 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-400 mb-2">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            <span>Diplomatie Directe & Arbitrage Pacifique • Concept Citoyen</span>
          </div>

          <h1 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight font-display">
            L'Octogone Diplomatique International
          </h1>

          <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
            Plutôt que d'envoyer la jeunesse et les troupes armées s'affronter sur le terrain pour des différends territoriaux ou commerciaux, les dirigeants montent directement sur le ring pour s'expliquer en public. Vous arbitrez les vainqueurs !
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
            <span className="px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 font-medium">
              🕊️ 0 troupe engagée
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 font-medium">
              🗳️ Arbitrage direct du peuple
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 font-medium">
              ⚖️ Traités pacifiques immédiats
            </span>
          </div>
        </div>
      </div>

      {/* Rules of the Diplomatic Octogone */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
        <h3 className="text-sm font-bold text-white mb-2 font-display flex items-center gap-2">
          <Shield className="w-4 h-4 text-blue-400" />
          <span>Le Protocole des 4 Épreuves de l'Octogone</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80">
            <span className="font-bold text-blue-400 block mb-1">Round 1 : Joute Oratoire</span>
            <p className="text-slate-400 text-[11px]">2 minutes de plaidoirie directe sans fiches ni prompteur.</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80">
            <span className="font-bold text-emerald-400 block mb-1">Round 2 : Test Culturel</span>
            <p className="text-slate-400 text-[11px]">Dégustation à l'aveugle et quiz d'histoire du pays adverse.</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80">
            <span className="font-bold text-amber-400 block mb-1">Round 3 : Épreuve Physique</span>
            <p className="text-slate-400 text-[11px]">Bras de fer symbolique ou relais rameur d'endurance.</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80">
            <span className="font-bold text-rose-400 block mb-1">Round 4 : Vote du Peuple</span>
            <p className="text-slate-400 text-[11px]">Les citoyens des deux nations votent en direct sur Democra'App.</p>
          </div>
        </div>
      </div>

      {/* Current Disputes on the Line */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-bold text-white font-display flex items-center gap-2">
            <Swords className="w-5 h-5 text-rose-400" />
            <span>Différends Internationaux à l'Affiche ({disputes.length})</span>
          </h2>
          <span className="text-xs text-slate-400 font-mono">Arbitrage sans guerre</span>
        </div>

        <div className="grid grid-cols-1 gap-5">
          {disputes.map(dispute => (
            <article
              key={dispute.id}
              className="rounded-2xl bg-slate-900 border border-slate-800 p-5 shadow-lg space-y-4 hover:border-slate-700/80 transition-all"
            >
              {/* Title & Status */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white font-display">
                    {dispute.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {dispute.stakes}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                    dispute.status === 'EN_COURS'
                      ? 'bg-rose-950/80 border border-rose-800/60 text-rose-300'
                      : 'bg-slate-800 text-slate-300'
                  }`}>
                    {dispute.status === 'EN_COURS' ? '🔥 Match en Cours' : 'À Venir'}
                  </span>

                  <button
                    onClick={() => setActiveMatchDispute(dispute)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-md transition-all active:scale-95 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Lancer le Duel</span>
                  </button>
                </div>
              </div>

              {/* Fighters Cards Comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DiplomatCard fighter={dispute.fighterA} side="A" />
                <DiplomatCard fighter={dispute.fighterB} side="B" />
              </div>

              {/* Live Citizen Arbitration Score */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between gap-4 text-xs">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-blue-400" />
                  <span>Pronostic & Soutien Populaire :</span>
                </span>

                <div className="flex items-center gap-3 font-mono font-bold">
                  <span className="text-blue-400">{dispute.fighterA.country} {dispute.citizenScoreA}%</span>
                  <span className="text-slate-600">|</span>
                  <span className="text-indigo-400">{dispute.fighterB.country} {dispute.citizenScoreB}%</span>
                </div>
              </div>

              {/* Peaceful Consequence */}
              <div className="text-[11px] text-emerald-400/90 flex items-center gap-1.5 bg-emerald-950/20 p-2.5 rounded-lg border border-emerald-900/30">
                <Trophy className="w-3.5 h-3.5 shrink-0" />
                <span><strong>Enjeu pacifique :</strong> {dispute.peacefulConsequence}</span>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Triennial Flag Game */}
      <TerritorialFlagGame />

      {/* Diplomatic Match Modal */}
      {activeMatchDispute && (
        <DiplomaticMatchModal
          dispute={activeMatchDispute}
          onClose={() => setActiveMatchDispute(null)}
        />
      )}

    </div>
  );
};
