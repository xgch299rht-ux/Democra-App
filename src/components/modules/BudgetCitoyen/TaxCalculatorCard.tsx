import React, { useState } from 'react';
import { Calculator, Euro, Check, RefreshCw } from 'lucide-react';
import { useDemocra } from '../../../context/DemocraContext';

export const TaxCalculatorCard: React.FC = () => {
  const { taxProfile, updateTaxProfile } = useDemocra();
  const [isEditing, setIsEditing] = useState(false);
  
  const [monthlyNet, setMonthlyNet] = useState(taxProfile.monthlyNetIncome);
  const [maritalStatus, setMaritalStatus] = useState(taxProfile.maritalStatus);
  const [children, setChildren] = useState(taxProfile.childrenCount);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateTaxProfile(monthlyNet, maritalStatus, children);
    setIsEditing(false);
  };

  const handleUseMedian = () => {
    setMonthlyNet(2150);
    setMaritalStatus('single');
    setChildren(0);
    updateTaxProfile(2150, 'single', 0);
    setIsEditing(false);
  };

  return (
    <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4 sm:p-6 shadow-lg">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white font-display">
              Bilan Fiscal Personnalisé
            </h2>
            <p className="text-xs text-slate-400">
              Barème officiel de l'impôt sur le revenu • Barème progressif
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
            >
              Ajuster mes revenus
            </button>
          ) : (
            <button
              onClick={handleUseMedian}
              className="px-2.5 py-1 text-[11px] rounded-lg text-slate-400 hover:text-white flex items-center gap-1 hover:bg-slate-800"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Salarié médian (2 150 €)</span>
            </button>
          )}
        </div>
      </div>

      {isEditing ? (
        <form onSubmit={handleSave} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Revenu net mensuel (€)</label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  step="50"
                  value={monthlyNet}
                  onChange={e => setMonthlyNet(Number(e.target.value))}
                  className="w-full pl-3 pr-8 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white font-mono"
                />
                <Euro className="w-3.5 h-3.5 text-slate-500 absolute right-3 top-2.5" />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Situation familiale</label>
              <select
                value={maritalStatus}
                onChange={e => setMaritalStatus(e.target.value as 'single' | 'married')}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white"
              >
                <option value="single">Célibataire / Seul (1 part)</option>
                <option value="married">Marié(e) / Pacsé(e) (2 parts)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Enfants à charge</label>
              <input
                type="number"
                min="0"
                max="10"
                value={children}
                onChange={e => setChildren(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white font-mono"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-3 py-1.5 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 text-xs font-semibold"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Calculer mon impôt</span>
            </button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80">
            <span className="text-[11px] text-slate-400 block mb-1">Impôt annuel calculé</span>
            <div className="text-xl sm:text-2xl font-extrabold text-white font-mono-numbers">
              {taxProfile.calculatedAnnualTax.toLocaleString('fr-FR')} €
            </div>
            <span className="text-[10px] text-slate-500">par an pour le fisc</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80">
            <span className="text-[11px] text-slate-400 block mb-1">Prélèvement mensuel</span>
            <div className="text-xl sm:text-2xl font-extrabold text-blue-400 font-mono-numbers">
              {taxProfile.calculatedMonthlyTax.toLocaleString('fr-FR')} €
            </div>
            <span className="text-[10px] text-slate-500">sur votre fiche de paie</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80">
            <span className="text-[11px] text-slate-400 block mb-1">Taux marginal d'imposition</span>
            <div className="text-xl sm:text-2xl font-extrabold text-indigo-400 font-mono-numbers">
              {taxProfile.taxBracket}%
            </div>
            <span className="text-[10px] text-slate-500">Tranche maximale</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80">
            <span className="text-[11px] text-slate-400 block mb-1">Pouvoir d'arbitrage direct</span>
            <div className="text-xl sm:text-2xl font-extrabold text-emerald-400 font-mono-numbers">
              100%
            </div>
            <span className="text-[10px] text-slate-500">sur la répartition ci-dessous</span>
          </div>
        </div>
      )}
    </div>
  );
};
