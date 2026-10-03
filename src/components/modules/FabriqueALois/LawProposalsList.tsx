import React, { useState } from 'react';
import { Plus, CheckCircle2, Clock } from 'lucide-react';
import { useDemocra } from '../../../context/DemocraContext';
import { LawProposalCard } from './LawProposalCard';
import { VideoTutoModal } from './VideoTutoModal';
import { SubmitProposalModal } from './SubmitProposalModal';
import { VoteResultModal } from './VoteResultModal';

export const LawProposalsList: React.FC = () => {
  const { proposals, selectedProposalForTuto, setSelectedProposalForTuto, user } = useDemocra();
  const [filter, setFilter] = useState<string>('all');
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  const filteredProposals = proposals.filter(p => {
    if (filter === 'voted') return !!p.userVote;
    if (filter === 'all') return true;
    return p.category.toLowerCase().includes(filter.toLowerCase());
  });

  const totalVotedCount = proposals.filter(p => !!p.userVote).length;

  return (
    <section className="space-y-6">
      
      {/* Session Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-xl">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: "url('/src/assets/images/hero_elysee_citizens_1791001765662.jpg')" }}
        />
        <div className="absolute inset-0 bg-linear-to-r from-slate-950 via-slate-950/80 to-transparent" />
        
        <div className="relative z-10 p-5 sm:p-8 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 mb-2">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
            <span>L’Élysée Citoyen • Session Ordinaire #42</span>
          </div>

          <h1 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight font-display">
            La Fabrique à Lois du Peuple
          </h1>

          <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
            Consultez les propositions élaborées par l'Assemblée Citoyenne permanente, visionnez les capsules explicatives et exercez votre droit d'arbitrage direct.
          </p>

          {/* Express Weekly Vote Banner */}
          <div className="mt-4 p-3.5 rounded-2xl bg-blue-950/70 border border-blue-800/60 backdrop-blur-md flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-blue-400 shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-white block">
                  Vote Hebdomadaire Express (5 minutes d'attention)
                </span>
                <span className="text-[11px] text-slate-300">
                  {totalVotedCount} / {proposals.length} lois arbitrées cette semaine • Clôture dimanche minuit
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsSubmitModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-950 text-xs font-bold transition-all shadow-md cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Déposer une « Propale »</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs Segmented Control (zero-pill discipline) */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-xl border border-slate-800 text-xs overflow-x-auto max-w-full">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              filter === 'all'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Toutes les lois ({proposals.length})
          </button>
          <button
            onClick={() => setFilter('voted')}
            className={`px-3 py-1.5 font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              filter === 'voted'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Mes votes ({totalVotedCount})
          </button>
          <button
            onClick={() => setFilter('pouvoir')}
            className={`px-3 py-1.5 font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              filter === 'pouvoir'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Pouvoir d'achat
          </button>
          <button
            onClick={() => setFilter('santé')}
            className={`px-3 py-1.5 font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              filter === 'santé'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Santé
          </button>
          <button
            onClick={() => setFilter('écologie')}
            className={`px-3 py-1.5 font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              filter === 'écologie'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Écologie
          </button>
          <button
            onClick={() => setFilter('démocratie')}
            className={`px-3 py-1.5 font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              filter === 'démocratie'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Démocratie
          </button>
        </div>

        {/* Unboxed Metadata Counter */}
        <div className="text-xs text-slate-400 flex items-center gap-2">
          <span>{filteredProposals.length} textes affichés</span>
          <span aria-hidden="true">·</span>
          <span>1 Citoyen = 1 Vote garanti ({user.postalCode || 'FR'})</span>
        </div>
      </div>

      {/* Proposals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredProposals.map(proposal => (
          <LawProposalCard key={proposal.id} proposal={proposal} />
        ))}
      </div>

      {/* Empty State */}
      {filteredProposals.length === 0 && (
        <div className="p-12 text-center rounded-2xl bg-slate-900 border border-slate-800 text-slate-400">
          <p className="text-sm">Aucune proposition ne correspond à ce filtre.</p>
          <button
            onClick={() => setFilter('all')}
            className="mt-3 px-4 py-1.5 rounded-lg bg-slate-800 text-white text-xs font-semibold hover:bg-slate-700"
          >
            Réinitialiser les filtres
          </button>
        </div>
      )}

      {/* Modals */}
      {selectedProposalForTuto && (
        <VideoTutoModal
          proposal={selectedProposalForTuto}
          onClose={() => setSelectedProposalForTuto(null)}
        />
      )}

      {isSubmitModalOpen && (
        <SubmitProposalModal onClose={() => setIsSubmitModalOpen(false)} />
      )}

      <VoteResultModal />

    </section>
  );
};
