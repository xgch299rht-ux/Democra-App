export type VoteChoice = 'OUI' | 'NON' | 'BESOIN_TUTO';

export interface LawProposal {
  id: string;
  sessionNumber: number;
  title: string;
  summary: string;
  category: 'Écologie' | 'Pouvoir d\'achat' | 'Santé' | 'Démocratie' | 'Numérique' | 'Éducation';
  deadline: string;
  daysRemaining: number;
  image?: string;
  author: string;
  estimatedCost: string;
  keyPoints: string[];
  pros: string[];
  cons: string[];
  tutorialDuration: string;
  tutorialVideo: {
    title: string;
    description: string;
    chapters: { timestamp: string; title: string; text: string }[];
    infographicNote: string;
  };
  stats: {
    oui: number;
    non: number;
    besoinTuto: number;
    totalVoters: number;
  };
  userVote?: VoteChoice;
  voteReceipt?: string;
}

export interface BudgetSector {
  id: string;
  name: string;
  iconName: string;
  color: string;
  currentGovPercent: number; // Répartition actuelle de l'État (PLF)
  nationalCitizenPercent: number; // Agrégation moyenne votée par le peuple
  userPercent: number; // Pourcentage alloué par le citoyen
  description: string;
  concreteImpacts: {
    threshold: number; // e.g., if percent > threshold
    positive: string;
    negative: string;
  };
}

export interface TaxProfile {
  monthlyNetIncome: number;
  maritalStatus: 'single' | 'married';
  childrenCount: number;
  annualNetIncome: number;
  calculatedAnnualTax: number;
  calculatedMonthlyTax: number;
  taxBracket: number; // 0, 11, 30, 41, 45%
}

export interface DiplomatFighter {
  id: string;
  name: string;
  title: string;
  country: string;
  flag: string;
  specialMove: string;
  quote: string;
  stats: {
    rhetorique: number;
    tenacite: number;
    sangFroid: number;
    coupBasDiplomatique: number;
    popularite: number;
  };
}

export interface DiplomaticDispute {
  id: string;
  title: string;
  stakes: string;
  fighterA: DiplomatFighter;
  fighterB: DiplomatFighter;
  status: 'A_VENIR' | 'EN_COURS' | 'TERMINE';
  scheduledDate: string;
  disputeDescription: string;
  peacefulConsequence: string; // Ce que gagne le vainqueur sans guerre
  rounds: {
    roundNumber: number;
    roundName: string;
    actionA: string;
    actionB: string;
    commentary: string;
    winner: 'A' | 'B' | 'DRAW';
  }[];
  userPrediction?: 'A' | 'B';
  citizenScoreA: number;
  citizenScoreB: number;
}

export interface TerritoryFlag {
  id: string;
  name: string;
  zone: string;
  currentHolder: string;
  holderFlag: string;
  contenders: string[];
  triennialMatchYear: number;
  symbolicStake: string;
}

export interface CitizenUser {
  isAuthenticated: boolean;
  provider?: 'FranceConnect' | 'ImpotsGouv' | 'Ameli' | 'LaPoste';
  citizenId: string;
  fullName: string;
  postalCode: string;
  verified1Citizen1Vote: boolean;
  votingHashSalt: string;
}
