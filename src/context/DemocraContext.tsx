import React, { createContext, useContext, useState, useEffect } from 'react';
import { LawProposal, BudgetSector, DiplomaticDispute, CitizenUser, TaxProfile, VoteChoice } from '../types';
import { INITIAL_PROPOSALS, INITIAL_BUDGET_SECTORS, INITIAL_DISPUTES, INITIAL_TERRITORIES } from '../data/initialData';
import { calculateFrenchIncomeTax } from '../utils/taxCalculator';
import { generateVoteReceipt } from '../utils/crypto';

interface DemocraContextType {
  activeTab: 'lois' | 'budget' | 'octogone';
  setActiveTab: (tab: 'lois' | 'budget' | 'octogone') => void;
  
  // User & Identity
  user: CitizenUser;
  loginWithFranceConnect: (provider: 'FranceConnect' | 'ImpotsGouv' | 'Ameli' | 'LaPoste') => void;
  logout: () => void;
  
  // Proposals & Voting
  proposals: LawProposal[];
  castVote: (proposalId: string, choice: VoteChoice) => Promise<string>;
  submitCitizenProposal: (proposal: Partial<LawProposal>) => void;
  selectedProposalForTuto: LawProposal | null;
  setSelectedProposalForTuto: (prop: LawProposal | null) => void;
  lastVoteReceipt: { proposalTitle: string; receipt: string; choice: VoteChoice } | null;
  setLastVoteReceipt: (receipt: { proposalTitle: string; receipt: string; choice: VoteChoice } | null) => void;

  // Budget
  budgetSectors: BudgetSector[];
  taxProfile: TaxProfile;
  updateTaxProfile: (monthlyNetIncome: number, maritalStatus: 'single' | 'married', childrenCount: number) => void;
  updateSectorAllocation: (sectorId: string, percent: number) => void;
  resetBudgetToCitizens: () => void;
  resetBudgetToGov: () => void;
  isBudgetBalanced: boolean;
  totalAllocatedPercent: number;

  // Octogone
  disputes: DiplomaticDispute[];
  territories: typeof INITIAL_TERRITORIES;
  activeMatchDispute: DiplomaticDispute | null;
  setActiveMatchDispute: (dispute: DiplomaticDispute | null) => void;
  voteDisputeWinner: (disputeId: string, winner: 'A' | 'B') => void;

  // Notifications & UI state
  weeklyNotificationActive: boolean;
  triggerWeeklyNotification: () => void;
  dismissWeeklyNotification: () => void;
  isAuditModalOpen: boolean;
  setIsAuditModalOpen: (open: boolean) => void;
  isFranceConnectModalOpen: boolean;
  setIsFranceConnectModalOpen: (open: boolean) => void;
  deviceFrameMode: boolean;
  toggleDeviceFrameMode: () => void;
}

const DemocraContext = createContext<DemocraContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY_PROPOSALS = 'democra_proposals_v1';
const LOCAL_STORAGE_KEY_BUDGET = 'democra_budget_v1';
const LOCAL_STORAGE_KEY_USER = 'democra_user_v1';
const LOCAL_STORAGE_KEY_TAX = 'democra_tax_v1';

export const DemocraProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<'lois' | 'budget' | 'octogone'>('lois');
  const [deviceFrameMode, setDeviceFrameMode] = useState<boolean>(false);

  // User State
  const [user, setUser] = useState<CitizenUser>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_USER);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return {
      isAuthenticated: true,
      provider: 'FranceConnect',
      citizenId: 'FR-75011-9284',
      fullName: 'Camille Dubois',
      postalCode: '75011',
      verified1Citizen1Vote: true,
      votingHashSalt: 'salt_fr_2026_democra_auth',
    };
  });

  // Proposals State
  const [proposals, setProposals] = useState<LawProposal[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_PROPOSALS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_PROPOSALS;
  });

  // Budget State
  const [budgetSectors, setBudgetSectors] = useState<BudgetSector[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_BUDGET);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_BUDGET_SECTORS;
  });

  // Tax Profile
  const [taxProfile, setTaxProfile] = useState<TaxProfile>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_TAX);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return calculateFrenchIncomeTax(2450, 'single', 0);
  });

  // Disputes & Octogone
  const [disputes, setDisputes] = useState<DiplomaticDispute[]>(INITIAL_DISPUTES);
  const [territories] = useState(INITIAL_TERRITORIES);
  const [activeMatchDispute, setActiveMatchDispute] = useState<DiplomaticDispute | null>(null);

  // Modals & Notifications
  const [selectedProposalForTuto, setSelectedProposalForTuto] = useState<LawProposal | null>(null);
  const [lastVoteReceipt, setLastVoteReceipt] = useState<{ proposalTitle: string; receipt: string; choice: VoteChoice } | null>(null);
  const [weeklyNotificationActive, setWeeklyNotificationActive] = useState<boolean>(false);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState<boolean>(false);
  const [isFranceConnectModalOpen, setIsFranceConnectModalOpen] = useState<boolean>(false);

  // Persistence
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_PROPOSALS, JSON.stringify(proposals));
  }, [proposals]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_BUDGET, JSON.stringify(budgetSectors));
  }, [budgetSectors]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_USER, JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_TAX, JSON.stringify(taxProfile));
  }, [taxProfile]);

  // Auth Functions
  const loginWithFranceConnect = (provider: 'FranceConnect' | 'ImpotsGouv' | 'Ameli' | 'LaPoste') => {
    const newUser: CitizenUser = {
      isAuthenticated: true,
      provider,
      citizenId: 'FR-' + Math.floor(10000 + Math.random() * 90000) + '-' + Math.floor(1000 + Math.random() * 9000),
      fullName: 'Alexandre Mercier',
      postalCode: '69002',
      verified1Citizen1Vote: true,
      votingHashSalt: 'salt_' + Date.now().toString(36),
    };
    setUser(newUser);
    setIsFranceConnectModalOpen(false);
  };

  const logout = () => {
    setUser({
      isAuthenticated: false,
      citizenId: '',
      fullName: '',
      postalCode: '',
      verified1Citizen1Vote: false,
      votingHashSalt: '',
    });
  };

  // Voting
  const castVote = async (proposalId: string, choice: VoteChoice): Promise<string> => {
    const receipt = await generateVoteReceipt(proposalId, choice, user.votingHashSalt || 'salt_anonymous');
    
    setProposals(prev => prev.map(p => {
      if (p.id === proposalId) {
        const currentStats = { ...p.stats };
        // Increment voter count
        currentStats.totalVoters += 1;
        if (choice === 'OUI') currentStats.oui += 1;
        else if (choice === 'NON') currentStats.non += 1;
        else currentStats.besoinTuto += 1;

        return {
          ...p,
          userVote: choice,
          voteReceipt: receipt,
          stats: currentStats,
        };
      }
      return p;
    }));

    const prop = proposals.find(p => p.id === proposalId);
    if (prop) {
      setLastVoteReceipt({
        proposalTitle: prop.title,
        receipt,
        choice
      });
    }

    return receipt;
  };

  const submitCitizenProposal = (newProp: Partial<LawProposal>) => {
    const created: LawProposal = {
      id: 'prop-citoyenne-' + Date.now(),
      sessionNumber: 42,
      title: newProp.title || 'Nouvelle Proposition Citoyenne',
      summary: newProp.summary || '',
      category: newProp.category || 'Démocratie',
      deadline: 'Dans 14 jours',
      daysRemaining: 14,
      image: '/src/assets/images/civic_tuto_explainer_1791001799993.jpg',
      author: `Citoyen certifié (${user.postalCode || 'FR'}) - Assemblée Locale`,
      estimatedCost: newProp.estimatedCost || 'Évalué par le Haut Conseil Citoyen',
      keyPoints: newProp.keyPoints || ['Proposition soumise à validation participative.'],
      pros: newProp.pros || ['Renforce l\'autonomie et la justice citoyenne.'],
      cons: newProp.cons || ['Nécessite des ajustements réglementaires.'],
      tutorialDuration: '1 min 30 s',
      tutorialVideo: {
        title: `Capsule : ${newProp.title}`,
        description: 'Vulgarisation citoyenne en langage clair et direct.',
        chapters: [
          { timestamp: '00:00', title: 'Le problème', text: 'Origine de la proposition soumise par les citoyens.' },
          { timestamp: '00:45', title: 'La solution proposée', text: 'Modalités d\'application et calendrier.' }
        ],
        infographicNote: 'Projet soumis au vote national express.'
      },
      stats: {
        oui: 1,
        non: 0,
        besoinTuto: 0,
        totalVoters: 1,
      },
      userVote: 'OUI',
    };

    setProposals(prev => [created, ...prev]);
  };

  // Tax calculation update
  const updateTaxProfile = (monthlyNetIncome: number, maritalStatus: 'single' | 'married', childrenCount: number) => {
    const updated = calculateFrenchIncomeTax(monthlyNetIncome, maritalStatus, childrenCount);
    setTaxProfile(updated);
  };

  // Budget Sectors allocation update
  const updateSectorAllocation = (sectorId: string, percent: number) => {
    const clamped = Math.max(0, Math.min(100, Math.round(percent)));
    setBudgetSectors(prev => prev.map(s => s.id === sectorId ? { ...s, userPercent: clamped } : s));
  };

  const resetBudgetToCitizens = () => {
    setBudgetSectors(prev => prev.map(s => ({ ...s, userPercent: s.nationalCitizenPercent })));
  };

  const resetBudgetToGov = () => {
    setBudgetSectors(prev => prev.map(s => ({ ...s, userPercent: s.currentGovPercent })));
  };

  const totalAllocatedPercent = budgetSectors.reduce((sum, s) => sum + s.userPercent, 0);
  const isBudgetBalanced = totalAllocatedPercent === 100;

  // Disputes & Octogone
  const voteDisputeWinner = (disputeId: string, winner: 'A' | 'B') => {
    setDisputes(prev => prev.map(d => {
      if (d.id === disputeId) {
        return {
          ...d,
          userPrediction: winner,
          citizenScoreA: winner === 'A' ? d.citizenScoreA + 1 : d.citizenScoreA,
          citizenScoreB: winner === 'B' ? d.citizenScoreB + 1 : d.citizenScoreB,
        };
      }
      return d;
    }));
  };

  // Notification simulation
  const triggerWeeklyNotification = () => {
    setWeeklyNotificationActive(true);
  };

  const dismissWeeklyNotification = () => {
    setWeeklyNotificationActive(false);
  };

  const toggleDeviceFrameMode = () => {
    setDeviceFrameMode(prev => !prev);
  };

  return (
    <DemocraContext.Provider
      value={{
        activeTab,
        setActiveTab,
        user,
        loginWithFranceConnect,
        logout,
        proposals,
        castVote,
        submitCitizenProposal,
        selectedProposalForTuto,
        setSelectedProposalForTuto,
        lastVoteReceipt,
        setLastVoteReceipt,
        budgetSectors,
        taxProfile,
        updateTaxProfile,
        updateSectorAllocation,
        resetBudgetToCitizens,
        resetBudgetToGov,
        isBudgetBalanced,
        totalAllocatedPercent,
        disputes,
        territories,
        activeMatchDispute,
        setActiveMatchDispute,
        voteDisputeWinner,
        weeklyNotificationActive,
        triggerWeeklyNotification,
        dismissWeeklyNotification,
        isAuditModalOpen,
        setIsAuditModalOpen,
        isFranceConnectModalOpen,
        setIsFranceConnectModalOpen,
        deviceFrameMode,
        toggleDeviceFrameMode,
      }}
    >
      {children}
    </DemocraContext.Provider>
  );
};

export const useDemocra = () => {
  const context = useContext(DemocraContext);
  if (!context) {
    throw new Error('useDemocra must be used within a DemocraProvider');
  }
  return context;
};
