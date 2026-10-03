import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Copy, Check, Users } from 'lucide-react';
import { useDemocra } from '../../../context/DemocraContext';

export const VoteResultModal: React.FC = () => {
  const { lastVoteReceipt, setLastVoteReceipt, setIsAuditModalOpen } = useDemocra();
  const [copied, setCopied] = useState(false);

  if (!lastVoteReceipt) return null;

  const copyReceipt = () => {
    navigator.clipboard.writeText(lastVoteReceipt.receipt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4">
      <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-6 text-slate-100 relative">
        <button
          onClick={() => setLastVoteReceipt(null)}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <h3 className="text-base font-bold text-white font-display">Bulletin Déposé dans l'Urne !</h3>
            <p className="text-xs text-slate-400 mt-1">
              Votre suffrage a été scellé de manière anonyme et vérifiable.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-left space-y-2">
            <div className="text-[11px] text-slate-400">Texte voté :</div>
            <div className="text-xs font-semibold text-slate-200 line-clamp-2">
              {lastVoteReceipt.proposalTitle}
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-slate-800/80 text-xs">
              <span className="text-slate-400">Votre choix :</span>
              <span className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                lastVoteReceipt.choice === 'OUI'
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/50'
                  : lastVoteReceipt.choice === 'NON'
                  ? 'bg-rose-950 text-rose-300 border border-rose-800/50'
                  : 'bg-amber-950 text-amber-300 border border-amber-800/50'
              }`}>
                {lastVoteReceipt.choice === 'OUI' ? 'OUI (Je veux)' : lastVoteReceipt.choice === 'NON' ? 'NON (Je refuse)' : 'Besoin de Tuto'}
              </span>
            </div>

            <div className="pt-2">
              <div className="text-[10px] text-slate-400 mb-1 flex items-center justify-between">
                <span>Preuve cryptographique de vote (Reçu d'urne) :</span>
                <span className="text-emerald-400 font-mono text-[9px]">SHA-256 SCELLEMENT</span>
              </div>
              <div className="flex items-center justify-between gap-2 p-2 rounded-lg bg-slate-900 border border-slate-800 font-mono text-[10px] text-blue-400">
                <span className="truncate">{lastVoteReceipt.receipt}</span>
                <button
                  onClick={copyReceipt}
                  className="p-1 hover:text-white transition-colors cursor-pointer"
                  title="Copier le reçu"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-900/50 flex items-center justify-between text-xs text-blue-300">
            <span className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-blue-400" />
              <span>Consensus national en direct :</span>
            </span>
            <span className="font-bold text-white">Pris en compte</span>
          </div>

          <div className="pt-2 flex gap-2">
            <button
              onClick={() => {
                setLastVoteReceipt(null);
                setIsAuditModalOpen(true);
              }}
              className="w-1/2 py-2.5 rounded-xl border border-slate-700 bg-slate-850 hover:bg-slate-800 text-slate-300 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>Audit & Registre</span>
            </button>
            <button
              onClick={() => setLastVoteReceipt(null)}
              className="w-1/2 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors"
            >
              Continuer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
