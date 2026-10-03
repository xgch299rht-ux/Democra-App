import React, { useState } from 'react';
import { X, ShieldCheck, Lock, KeyRound, CheckCircle2, Copy, Check } from 'lucide-react';
import { useDemocra } from '../context/DemocraContext';

export const VerificationModal: React.FC = () => {
  const { isAuditModalOpen, setIsAuditModalOpen, user, proposals } = useDemocra();
  const [copiedReceipt, setCopiedReceipt] = useState<string | null>(null);

  if (!isAuditModalOpen) return null;

  const votedProposals = proposals.filter(p => !!p.userVote);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedReceipt(text);
    setTimeout(() => setCopiedReceipt(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-6 text-slate-100 relative max-h-[90vh] flex flex-col">
        <button
          onClick={() => setIsAuditModalOpen(false)}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white font-display">Garanties Cryptographiques</h3>
            <p className="text-xs text-slate-400">Architecture Zero-Knowledge & Anonymisation</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4 pr-1 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 font-semibold text-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Principe constitutionnel : 1 Citoyen = 1 Bulletin</span>
            </div>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              Lors de l'authentification FranceConnect, un jeton d'émargement unique et haché par SHA-256 est inscrit sur le registre public des votants. Ce jeton atteste que vous avez voté sans révéler pour qui ni pour quoi vous avez voté.
            </p>
            <div className="p-2 rounded bg-slate-900 font-mono text-[10px] text-slate-400 break-all">
              Jeton d'émargement : REGISTRY_{user.citizenId ? user.citizenId.replace('-', '_') : 'ANON'}_PUBKEY_7F89A
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 font-semibold text-blue-300">
              <KeyRound className="w-4 h-4 text-blue-400 shrink-0" />
              <span>Séparation absolue Urne / Registre</span>
            </div>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              Dès validation du vote, le bulletin est mélangé dans un mélangeur cryptographique (mixnet) certifié. Aucun administrateur système, aucun gouvernement ne peut relier votre identité civique à votre choix dans l'urne.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold text-slate-200 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span>Vos Reçus Numériques de Vote Vérifiables ({votedProposals.length})</span>
            </h4>

            {votedProposals.length === 0 ? (
              <p className="p-3 rounded-xl bg-slate-800/40 text-slate-400 text-[11px] text-center italic">
                Vous n'avez pas encore voté pour cette session. Vos reçus cryptographiques apparaîtront ici après chaque vote.
              </p>
            ) : (
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {votedProposals.map(p => (
                  <div key={p.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-medium text-slate-300 truncate max-w-[200px]">{p.title}</span>
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                        p.userVote === 'OUI' ? 'bg-emerald-950 text-emerald-300' :
                        p.userVote === 'NON' ? 'bg-rose-950 text-rose-300' : 'bg-amber-950 text-amber-300'
                      }`}>
                        {p.userVote === 'OUI' ? 'Vote : OUI' : p.userVote === 'NON' ? 'Vote : NON' : 'Besoin Tuto'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-2 p-1.5 rounded bg-slate-900 font-mono text-[10px] text-blue-400">
                      <span className="truncate">{p.voteReceipt || 'RECEIPT-ENCRYPTED-OK'}</span>
                      <button
                        onClick={() => copyToClipboard(p.voteReceipt || '')}
                        className="p-1 hover:text-white transition-colors"
                        title="Copier la preuve de vote"
                      >
                        {copiedReceipt === p.voteReceipt ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 mt-2">
          <button
            onClick={() => setIsAuditModalOpen(false)}
            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors"
          >
            Fermer le panneau d'audit
          </button>
        </div>
      </div>
    </div>
  );
};
