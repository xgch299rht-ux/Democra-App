import { TaxProfile } from '../types';

/**
 * Calculateur de l'impôt sur le revenu français
 * Barème officiel progressif avec quotient familial et abattement de 10%
 */

export function calculateFrenchIncomeTax(
  monthlyNetIncome: number,
  maritalStatus: 'single' | 'married',
  childrenCount: number
): TaxProfile {
  const safeMonthly = Math.max(0, monthlyNetIncome);
  const annualNetIncome = safeMonthly * 12;

  // Abattement forfaitaire pour frais professionnels de 10%
  const deduction = Math.min(Math.max(annualNetIncome * 0.1, 495), 14171);
  const netTaxableIncome = Math.max(0, annualNetIncome - deduction);

  // Calcul du nombre de parts fiscales
  let parts = maritalStatus === 'married' ? 2 : 1;
  if (childrenCount === 1) parts += 0.5;
  else if (childrenCount === 2) parts += 1.0;
  else if (childrenCount >= 3) parts += 1.0 + (childrenCount - 2) * 1.0;

  // Revenu par part (Quotient familial)
  const quotient = netTaxableIncome / parts;

  // Tranches officielles
  const brackets = [
    { limit: 11294, rate: 0.0 },
    { limit: 28797, rate: 0.11 },
    { limit: 82341, rate: 0.30 },
    { limit: 177106, rate: 0.41 },
    { limit: Infinity, rate: 0.45 },
  ];

  let taxPerPart = 0;
  let highestBracketRate = 0;

  let previousLimit = 0;
  for (const b of brackets) {
    if (quotient > previousLimit) {
      const taxableInBracket = Math.min(quotient, b.limit) - previousLimit;
      taxPerPart += taxableInBracket * b.rate;
      if (b.rate > 0) highestBracketRate = b.rate * 100;
      previousLimit = b.limit;
    } else {
      break;
    }
  }

  let totalTax = Math.round(taxPerPart * parts);

  // Application de la décote pour les foyers modestes
  const decoteSeuil = maritalStatus === 'married' ? 3330 : 2040;
  if (totalTax > 0 && totalTax < decoteSeuil) {
    const decote = Math.round(decoteSeuil * 0.4525 - totalTax * 0.4525);
    totalTax = Math.max(0, totalTax - decote);
  }

  // Si l'impôt est inférieur à 61€, il n'est pas recouvré par l'État
  if (totalTax < 61) {
    totalTax = 0;
  }

  return {
    monthlyNetIncome: safeMonthly,
    maritalStatus,
    childrenCount,
    annualNetIncome,
    calculatedAnnualTax: totalTax,
    calculatedMonthlyTax: Math.round(totalTax / 12),
    taxBracket: highestBracketRate,
  };
}
