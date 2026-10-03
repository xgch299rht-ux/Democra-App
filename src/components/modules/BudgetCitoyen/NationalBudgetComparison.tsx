import React, { useState } from 'react';
import { BarChart3, CheckCircle, ShieldCheck, Send } from 'lucide-react';
import { useDemocra } from '../../../context/DemocraContext';
import confetti from 'canvas-confetti';

export const NationalBudgetComparison: React.FC = () => {
  const { budgetSectors, isBudgetBalanced, user, setIsAuditModalOpen } = useDemocra();
  const [submittedReceipt, setSubmittedReceipt] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitNationalBudget = () => {
    if (!isBudgetBalanced) {
      alert("Votre budget doit être équilibré à 100% avant d'être agrégé au vote national.");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      const receipt = `BUDGET-AGREGAT-${Date.now().toString(36).toUpperCase()}-HASH78`;
      setSubmittedReceipt(receipt);
      setIsSubmitting(false);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) { /* ignore */ }
    }, 600);
  };

  return (
    <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4 sm:p-6 shadow-lg space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white font-display">
              Agrégation Nationale en Temps Réel
            </h3>
            <p className="text-xs text-slate-400">
              Comparatif direct : Votre Choix vs Budget Réel de l'État vs Volonté du Peuple
            </p>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-[11px] text-slate-300">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-blue-500" />
            <span>Mon vote</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-emerald-500" />
            <span>Moyenne Citoyenne</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-slate-600" />
            <span>État (PLF)</span>
          </div>
        </div>
      </div>

      {/* Triple Bar Chart */}
      <div className="space-y-4">
        {budgetSectors.map(sector => (
          <div key={sector.id} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-200">{sector.name}</span>
              <div className="flex items-center gap-3 font-mono text-[11px]">
                <span className="text-blue-400 font-bold">{sector.userPercent}%</span>
                <span className="text-emerald-400 font-bold">{sector.nationalCitizenPercent}%</span>
                <span className="text-slate-400">{sector.currentGovPercent}%</span>
              </div>
            </div>

            {/* Bars container */}
            <div className="space-y-1">
              {/* User Bar */}
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-blue-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, sector.userPercent * 2)}%` }}
                  title={`Mon allocation: ${sector.userPercent}%`}
                />
              </div>
              {/* National Citizens Bar */}
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, sector.nationalCitizenPercent * 2)}%` }}
                  title={`Moyenne Citoyenne: ${sector.nationalCitizenPercent}%`}
                />
              </div>
              {/* Official State PLF Bar */}
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-slate-600 h-full rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, sector.currentGovPercent * 2)}%` }}
                  title={`Budget officiel État: ${sector.currentGovPercent}%`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Submission CTA */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-3">
        {submittedReceipt ? (
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2 text-emerald-400 font-bold text-xs sm:text-sm">
              <CheckCircle className="w-4 h-4" />
              <span>Votre répartition a été anonymement intégrée à l'agrégat national !</span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono">
              Reçu de scellement budgétaire : {submittedReceipt}
            </p>
            <button
              onClick={() => setIsAuditModalOpen(true)}
              className="text-xs text-blue-400 hover:text-blue-300 underline font-medium cursor-pointer"
            >
              Vérifier l'anonymisation sur le registre public →
            </button>
          </div>
        ) : (
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-white mb-1">
              Valider et Inscrire mon Arbitrage Budgétaire
            </h4>
            <p className="text-[11px] text-slate-400 max-w-md mx-auto mb-3">
              Vos curseurs seront consolidés de manière strictement anonyme avec ceux des autres citoyens français pour générer le Budget Réel du Peuple.
            </p>

            <button
              disabled={!isBudgetBalanced || isSubmitting}
              onClick={handleSubmitNationalBudget}
              className={`py-3 px-6 rounded-xl font-bold text-xs sm:text-sm inline-flex items-center gap-2 shadow-lg transition-all cursor-pointer ${
                isBudgetBalanced
                  ? 'bg-blue-600 hover:bg-blue-500 text-white active:scale-95'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'Scellement en cours...' : 'Sceller mon Vote Budgétaire'}</span>
            </button>
          </div>
        )}
      </div>

    </div>
  );
};
