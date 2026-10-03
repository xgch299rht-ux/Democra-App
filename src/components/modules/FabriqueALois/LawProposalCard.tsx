import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, HelpCircle, Play, ChevronDown, ChevronUp, CheckCircle, Clock } from 'lucide-react';
import { LawProposal, VoteChoice } from '../../../types';
import { useDemocra } from '../../../context/DemocraContext';
import confetti from 'canvas-confetti';

interface LawProposalCardProps {
  proposal: LawProposal;
}

export const LawProposalCard: React.FC<LawProposalCardProps> = ({ proposal }) => {
  const { castVote, setSelectedProposalForTuto } = useDemocra();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isVoting, setIsVoting] = useState<boolean>(false);

  const handleVote = async (choice: VoteChoice) => {
    if (choice === 'BESOIN_TUTO') {
      setSelectedProposalForTuto(proposal);
      return;
    }

    setIsVoting(true);
    try {
      await castVote(proposal.id, choice);
      if (choice === 'OUI') {
        confetti({
          particleCount: 50,
          spread: 50,
          origin: { y: 0.6 }
        });
      }
    } finally {
      setIsVoting(false);
    }
  };

  const totalVotes = proposal.stats.oui + proposal.stats.non + proposal.stats.besoinTuto;
  const ouiPercent = Math.round((proposal.stats.oui / (totalVotes || 1)) * 100);
  const nonPercent = Math.round((proposal.stats.non / (totalVotes || 1)) * 100);
  const tutoPercent = Math.round((proposal.stats.besoinTuto / (totalVotes || 1)) * 100);

  return (
    <article className="rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700/80 transition-all shadow-md overflow-hidden flex flex-col">
      
      {/* Card Header with Unboxed Metadata (Zero-Pill discipline) */}
      <div className="p-4 sm:p-5 pb-3">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-medium">
          <div className="flex items-center gap-2">
            <span className="text-blue-400 font-semibold">{proposal.category}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Session #{proposal.sessionNumber}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-400">{proposal.author}</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-amber-400 font-mono">
            <Clock className="w-3 h-3" />
            <span>{proposal.deadline}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-bold text-white leading-snug tracking-tight font-display">
          {proposal.title}
        </h3>

        {/* Synthesis & Vulgarisation in plain language */}
        <p className="mt-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
          {proposal.summary}
        </p>

        {/* Quick Tuto Capsule Button (1-2 min) */}
        <div className="mt-3.5 flex flex-wrap items-center gap-2">
          <button
            onClick={() => setSelectedProposalForTuto(proposal)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-950/70 hover:bg-blue-900/80 text-blue-300 border border-blue-800/60 text-xs font-semibold transition-all cursor-pointer shadow-xs active:scale-98"
          >
            <Play className="w-3.5 h-3.5 fill-blue-400 text-blue-400" />
            <span>Capsule Vidéo & Tuto ({proposal.tutorialDuration})</span>
          </button>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
          >
            <span>{isExpanded ? 'Masquer détails' : 'Arguments Pour / Contre'}</span>
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Expandable Technical & Debating Section */}
      {isExpanded && (
        <div className="px-4 sm:px-5 py-3 bg-slate-950/60 border-t border-b border-slate-800/80 space-y-3 text-xs">
          <div>
            <span className="font-semibold text-slate-300 block mb-1">Points clés du texte :</span>
            <ul className="space-y-1 text-slate-300">
              {proposal.keyPoints.map((pt, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-blue-400 mt-0.5">•</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-900/30">
              <span className="font-bold text-emerald-400 block mb-1">Arguments POUR :</span>
              <ul className="space-y-1 text-slate-300 text-[11px]">
                {proposal.pros.map((p, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-emerald-400">✓</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-900/30">
              <span className="font-bold text-rose-400 block mb-1">Arguments CONTRE :</span>
              <ul className="space-y-1 text-slate-300 text-[11px]">
                {proposal.cons.map((c, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-rose-400">✕</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Impact budgétaire estimé :</span>
            <span className="font-semibold text-slate-200">{proposal.estimatedCost}</span>
          </div>
        </div>
      )}

      {/* Voting & Results Zone */}
      <div className="p-4 sm:p-5 pt-3 bg-slate-900/90 mt-auto border-t border-slate-800/60">
        
        {/* Consensus & Live Stats Bar */}
        <div className="mb-3 space-y-1.5">
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <div className="flex items-center gap-3">
              <span className="text-emerald-400 font-bold">{ouiPercent}% Oui</span>
              <span className="text-rose-400 font-bold">{nonPercent}% Non</span>
              <span className="text-amber-400 font-medium">{tutoPercent}% Tuto</span>
            </div>
            <span className="font-mono text-slate-500">
              {proposal.stats.totalVoters.toLocaleString('fr-FR')} votants
            </span>
          </div>

          {/* Tri-color progress indicator */}
          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden flex">
            <div className="bg-emerald-500 h-full transition-all duration-300" style={{ width: `${ouiPercent}%` }} />
            <div className="bg-rose-500 h-full transition-all duration-300" style={{ width: `${nonPercent}%` }} />
            <div className="bg-amber-500 h-full transition-all duration-300" style={{ width: `${tutoPercent}%` }} />
          </div>
        </div>

        {/* Vote Express Buttons (Strictly as specified: Oui | Non | Pas compris/Besoin tuto) */}
        {proposal.userVote ? (
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <div>
                <span className="text-xs font-bold text-white">
                  Votre vote enregistré : {proposal.userVote === 'OUI' ? 'Oui (Je veux)' : proposal.userVote === 'NON' ? 'Non (Je ne veux pas)' : 'Besoin de tuto'}
                </span>
                {proposal.voteReceipt && (
                  <p className="text-[10px] font-mono text-slate-400">
                    Reçu d'urne : {proposal.voteReceipt}
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={() => handleVote(proposal.userVote === 'OUI' ? 'NON' : 'OUI')}
              className="text-[11px] text-blue-400 hover:text-blue-300 underline font-medium cursor-pointer"
            >
              Modifier
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-2">
            <button
              disabled={isVoting}
              onClick={() => handleVote('OUI')}
              className="py-2.5 px-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer disabled:opacity-50"
            >
              <ThumbsUp className="w-3.5 h-3.5" />
              <span className="truncate">Oui (Je veux)</span>
            </button>

            <button
              disabled={isVoting}
              onClick={() => handleVote('NON')}
              className="py-2.5 px-2 rounded-xl bg-rose-600 hover:bg-rose-500 active:scale-95 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer disabled:opacity-50"
            >
              <ThumbsDown className="w-3.5 h-3.5" />
              <span className="truncate">Non (Refuser)</span>
            </button>

            <button
              disabled={isVoting}
              onClick={() => handleVote('BESOIN_TUTO')}
              className="py-2.5 px-2 rounded-xl bg-amber-600/20 hover:bg-amber-600/30 text-amber-300 border border-amber-500/40 active:scale-95 font-semibold text-xs flex items-center justify-center gap-1 transition-all cursor-pointer"
              title="Ouvre la capsule pédagogique pour comprendre avant de voter"
            >
              <HelpCircle className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Pas compris / Tuto</span>
            </button>
          </div>
        )}

      </div>
    </article>
  );
};
