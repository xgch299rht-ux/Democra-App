import React, { useState } from 'react';
import { X, Play, Trophy, Users, Shield, ArrowRight, RotateCcw } from 'lucide-react';
import { DiplomaticDispute } from '../../../types';
import { useDemocra } from '../../../context/DemocraContext';
import confetti from 'canvas-confetti';

interface DiplomaticMatchModalProps {
  dispute: DiplomaticDispute;
  onClose: () => void;
}

export const DiplomaticMatchModal: React.FC<DiplomaticMatchModalProps> = ({ dispute, onClose }) => {
  const { voteDisputeWinner } = useDemocra();
  const [currentRoundIdx, setCurrentRoundIdx] = useState(0);
  const [matchEnded, setMatchEnded] = useState(false);
  const [userVoted, setUserVoted] = useState<'A' | 'B' | null>(dispute.userPrediction || null);

  const rounds = dispute.rounds;
  const currentRound = rounds[currentRoundIdx];

  const handleNextRound = () => {
    if (currentRoundIdx < rounds.length - 1) {
      setCurrentRoundIdx(prev => prev + 1);
    } else {
      setMatchEnded(true);
      try {
        confetti({
          particleCount: 80,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (e) { /* ignore */ }
    }
  };

  const handleVoteChampion = (winner: 'A' | 'B') => {
    setUserVoted(winner);
    voteDisputeWinner(dispute.id, winner);
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch (e) { /* ignore */ }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-4 overflow-y-auto">
      <div className="w-full max-w-2xl rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl overflow-hidden text-slate-100 flex flex-col relative max-h-[92vh]">
        
        {/* Top bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-950 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Octogone Diplomatique en Direct • Litige Arbitré
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Fighters Confrontation Arena Header */}
        <div className="p-4 sm:p-6 bg-linear-to-b from-slate-950 to-slate-900 border-b border-slate-800">
          <div className="grid grid-cols-5 items-center gap-2 text-center">
            
            {/* Fighter A */}
            <div className="col-span-2 text-left">
              <span className="text-3xl block mb-1">{dispute.fighterA.flag}</span>
              <h4 className="text-sm font-extrabold text-white truncate font-display">
                {dispute.fighterA.name}
              </h4>
              <span className="text-[11px] text-blue-400 font-semibold">{dispute.fighterA.country}</span>
              <div className="mt-1 text-[10px] text-slate-400 font-mono">
                Popularité : {dispute.fighterA.stats.popularite}%
              </div>
            </div>

            {/* VS Badge */}
            <div className="col-span-1 flex flex-col items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-red-600/20 border border-red-500/40 text-red-400 font-black text-xs flex items-center justify-center shadow-lg">
                VS
              </div>
              <span className="text-[10px] font-mono text-slate-500 mt-1">ROUND {currentRoundIdx + 1}/{rounds.length}</span>
            </div>

            {/* Fighter B */}
            <div className="col-span-2 text-right">
              <span className="text-3xl block mb-1">{dispute.fighterB.flag}</span>
              <h4 className="text-sm font-extrabold text-white truncate font-display">
                {dispute.fighterB.name}
              </h4>
              <span className="text-[11px] text-indigo-400 font-semibold">{dispute.fighterB.country}</span>
              <div className="mt-1 text-[10px] text-slate-400 font-mono">
                Popularité : {dispute.fighterB.stats.popularite}%
              </div>
            </div>

          </div>

          <div className="mt-3 p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-center text-xs text-slate-300">
            <strong>Litige :</strong> {dispute.title}
          </div>
        </div>

        {/* Round Play-By-Play Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
          
          {/* Round Header */}
          <div className="flex items-center justify-between text-xs">
            <span className="px-2.5 py-1 rounded-lg bg-red-950/80 border border-red-800/60 text-red-300 font-bold uppercase tracking-wider text-[10px]">
              Round {currentRound.roundNumber} : {currentRound.roundName}
            </span>
            <span className="text-[11px] text-slate-400">
              Arbitrage Pacifique Garanti (0 soldat déployé)
            </span>
          </div>

          {/* Confrontation Exchanges */}
          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-blue-950/30 border border-blue-900/40 space-y-1">
              <div className="text-[11px] font-bold text-blue-400 flex items-center gap-1.5">
                <span>{dispute.fighterA.flag} Action de {dispute.fighterA.name} :</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">
                {currentRound.actionA}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-indigo-950/30 border border-indigo-900/40 space-y-1 text-right">
              <div className="text-[11px] font-bold text-indigo-400 flex items-center justify-end gap-1.5">
                <span>Action de {dispute.fighterB.name} {dispute.fighterB.flag} :</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">
                {currentRound.actionB}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center text-xs text-amber-300 italic">
              « {currentRound.commentary} »
            </div>
          </div>

          {/* Citizen Live Arbitration Vote */}
          <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white flex items-center gap-1.5">
                <Users className="w-4 h-4 text-blue-400" />
                Arbitrage Populaire des Citoyens en Direct :
              </span>
              <span className="text-[11px] font-mono text-slate-400">1 Citoyen = 1 Vote</span>
            </div>

            {/* Score Bar */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[11px] font-mono font-bold">
                <span className="text-blue-400">{dispute.fighterA.country} ({dispute.citizenScoreA}%)</span>
                <span className="text-indigo-400">{dispute.fighterB.country} ({dispute.citizenScoreB}%)</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden flex">
                <div className="bg-blue-500 h-full transition-all duration-300" style={{ width: `${dispute.citizenScoreA}%` }} />
                <div className="bg-indigo-500 h-full transition-all duration-300" style={{ width: `${dispute.citizenScoreB}%` }} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => handleVoteChampion('A')}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  userVoted === 'A'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                }`}
              >
                <span>Soutenir {dispute.fighterA.flag}</span>
              </button>

              <button
                onClick={() => handleVoteChampion('B')}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  userVoted === 'B'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                }`}
              >
                <span>Soutenir {dispute.fighterB.flag}</span>
              </button>
            </div>
          </div>

          {/* Peaceful outcome resolution */}
          <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-800/40 text-[11px] text-emerald-300 flex items-start gap-2">
            <Trophy className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong>Conséquence pacifique scellée :</strong> {dispute.peacefulConsequence}
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-3">
          <button
            onClick={() => {
              setCurrentRoundIdx(0);
              setMatchEnded(false);
            }}
            className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Rejouer</span>
          </button>

          {currentRoundIdx < rounds.length - 1 ? (
            <button
              onClick={handleNextRound}
              className="py-2.5 px-5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg transition-colors cursor-pointer"
            >
              <span>Passer au Round {currentRoundIdx + 2}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onClose}
              className="py-2.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg transition-colors cursor-pointer"
            >
              <Trophy className="w-4 h-4" />
              <span>Litige Tranché & Scellé</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
