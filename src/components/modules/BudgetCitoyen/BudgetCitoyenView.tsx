import React from 'react';
import { TaxCalculatorCard } from './TaxCalculatorCard';
import { BudgetAllocator } from './BudgetAllocator';
import { BudgetImpactSim } from './BudgetImpactSim';
import { NationalBudgetComparison } from './NationalBudgetComparison';

export const BudgetCitoyenView: React.FC = () => {
  return (
    <div className="space-y-6">
      
      {/* Hero Header */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-xl">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: "url('/src/assets/images/tax_budget_breakdown_1791001777120.jpg')" }}
        />
        <div className="absolute inset-0 bg-linear-to-r from-slate-950 via-slate-950/85 to-transparent" />

        <div className="relative z-10 p-5 sm:p-8 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Souveraineté Fiscale Directe • PLF Citoyen 2026</span>
          </div>

          <h1 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight font-display">
            Le Budget Citoyen : Vous Décidez de Vos Impôts
          </h1>

          <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
            Fini le chèque en blanc. Calculez votre montant exact d'impôt et répartissez vous-même chaque euro entre la Santé, l'Éducation, l'Écologie, la Sécurité et le fonctionnement des institutions.
          </p>
        </div>
      </div>

      {/* Step 1: Personal Tax Calculation */}
      <TaxCalculatorCard />

      {/* Step 2: Interactive Dynamic Sliders Allocation */}
      <BudgetAllocator />

      {/* Step 3: Real Concrete Impact Simulator */}
      <BudgetImpactSim />

      {/* Step 4: National Aggregation & State Comparison */}
      <NationalBudgetComparison />

    </div>
  );
};
