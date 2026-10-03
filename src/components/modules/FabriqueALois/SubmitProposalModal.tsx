import React, { useState } from 'react';
import { X, Send, Sparkles, AlertCircle } from 'lucide-react';
import { useDemocra } from '../../../context/DemocraContext';
import { LawProposal } from '../../../types';

interface SubmitProposalModalProps {
  onClose: () => void;
}

export const SubmitProposalModal: React.FC<SubmitProposalModalProps> = ({ onClose }) => {
  const { submitCitizenProposal, user } = useDemocra();
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [category, setCategory] = useState<LawProposal['category']>('Pouvoir d\'achat');
  const [pro1, setPro1] = useState('');
  const [pro2, setPro2] = useState('');
  const [con1, setCon1] = useState('');
  const [con2, setCon2] = useState('');
  const [estimatedCost, setEstimatedCost] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !summary.trim()) return;

    submitCitizenProposal({
      title: title.trim(),
      summary: summary.trim(),
      category,
      estimatedCost: estimatedCost.trim() || 'À chiffrer par la commission d\'évaluation',
      keyPoints: [
        'Initiative citoyenne déposée avec signature numérique certifiée.',
        summary.trim()
      ],
      pros: [pro1.trim() || 'Bénéfice direct pour l\'intérêt général.', pro2.trim() || 'Renforcement de la cohésion sociale.'],
      cons: [con1.trim() || 'Nécessite des moyens d\'application.', con2.trim() || 'Délai d\'adaptation administratif.'],
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-6 text-slate-100 relative max-h-[90vh] flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white font-display">Déposer une « Propale Citoyenne »</h3>
            <p className="text-xs text-slate-400">Initiative législative citoyenne • Session #42</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto space-y-4 pr-1 text-xs">
          <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-800/40 flex items-center gap-2 text-blue-300 text-[11px]">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>Votre proposition sera signée de votre identifiant anonymisé ({user.citizenId || 'Citoyen vérifié'}).</span>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Titre de la proposition (clair & explicite) *</label>
            <input
              type="text"
              required
              placeholder="Ex: Interdiction des emballages plastiques non recyclables en restauration rapide"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-hidden focus:border-blue-500 text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Catégorie thématique</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as LawProposal['category'])}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-hidden focus:border-blue-500 text-xs"
              >
                <option value="Pouvoir d'achat">Pouvoir d'achat</option>
                <option value="Santé">Santé</option>
                <option value="Écologie">Écologie</option>
                <option value="Démocratie">Démocratie</option>
                <option value="Éducation">Éducation</option>
                <option value="Numérique">Numérique</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Impact budgétaire estimé</label>
              <input
                type="text"
                placeholder="Ex: Neutre / 50 M€ / Économie"
                value={estimatedCost}
                onChange={e => setEstimatedCost(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-hidden focus:border-blue-500 text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Résumé synthétique & vulgarisation (langage direct) *</label>
            <textarea
              required
              rows={3}
              placeholder="Décrivez en 2 ou 3 phrases simples ce que change cette loi dans le quotidien des citoyens..."
              value={summary}
              onChange={e => setSummary(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-hidden focus:border-blue-500 text-xs resize-none"
            />
          </div>

          <div className="space-y-2">
            <span className="font-semibold text-slate-300 block">Arguments contradictoires (éthique du débat)</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Argument POUR principal"
                value={pro1}
                onChange={e => setPro1(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg bg-emerald-950/30 border border-emerald-800/40 text-emerald-200 text-xs"
              />
              <input
                type="text"
                placeholder="Contrepartie ou objection CONTRE"
                value={con1}
                onChange={e => setCon1(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg bg-rose-950/30 border border-rose-800/40 text-rose-200 text-xs"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="w-1/3 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 text-xs font-semibold"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="w-2/3 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Soumettre au Vote Populaire</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
