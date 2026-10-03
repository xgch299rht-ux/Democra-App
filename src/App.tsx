/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { DemocraProvider, useDemocra } from './context/DemocraContext';
import { Header } from './components/Header';
import { BottomNavBar } from './components/BottomNavBar';
import { LawProposalsList } from './components/modules/FabriqueALois/LawProposalsList';
import { BudgetCitoyenView } from './components/modules/BudgetCitoyen/BudgetCitoyenView';
import { OctogoneArena } from './components/modules/OctogoneDiplomatique/OctogoneArena';
import { FranceConnectModal } from './components/FranceConnectModal';
import { VerificationModal } from './components/VerificationModal';
import { WeeklyNotificationToast } from './components/WeeklyNotificationToast';
import { OfflineIndicator } from './components/OfflineIndicator';
import { ShieldCheck, Smartphone, Wifi, Battery, Volume2 } from 'lucide-react';

const MainContent: React.FC = () => {
  const { activeTab, deviceFrameMode, toggleDeviceFrameMode, user } = useDemocra();

  const renderActiveModule = () => {
    switch (activeTab) {
      case 'lois':
        return <LawProposalsList />;
      case 'budget':
        return <BudgetCitoyenView />;
      case 'octogone':
        return <OctogoneArena />;
      default:
        return <LawProposalsList />;
    }
  };

  const appView = (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-blue-600 selection:text-white">
      <Header />
      
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 pb-24 md:pb-12">
        {renderActiveModule()}
      </main>

      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-slate-400">
            <span className="w-2 h-2 rounded-full bg-linear-to-r from-blue-600 via-white to-red-600" />
            <span className="font-semibold text-slate-300">Democra'App</span>
            <span aria-hidden="true">·</span>
            <span>Pouvoir d'Arbitrage Populaire & Souveraineté Directe</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-500">
            <span>1 Citoyen = 1 Vote certifié</span>
            <span aria-hidden="true">·</span>
            <span>Chiffrement SHA-256</span>
            <span aria-hidden="true">·</span>
            <span>PWA Hors-Ligne</span>
          </div>
        </div>
      </footer>

      <BottomNavBar />
      <FranceConnectModal />
      <VerificationModal />
      <WeeklyNotificationToast />
      <OfflineIndicator />
    </div>
  );

  // If Device Frame Mode is active on desktop, present a phone mockup
  if (deviceFrameMode) {
    return (
      <div className="min-h-screen bg-slate-900/90 py-6 px-4 flex flex-col items-center justify-center">
        <div className="mb-4 flex items-center gap-3 bg-slate-950 px-4 py-2 rounded-2xl border border-slate-800 text-xs text-slate-300">
          <span className="font-semibold text-white">Simulateur Mobile Democra'App (iOS / Android)</span>
          <button
            onClick={toggleDeviceFrameMode}
            className="text-blue-400 hover:text-blue-300 underline font-medium cursor-pointer"
          >
            Quitter le cadre smartphone
          </button>
        </div>

        {/* Smartphone mockup */}
        <div className="relative w-full max-w-[410px] h-[850px] bg-slate-950 rounded-[48px] border-8 border-slate-800 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col">
          {/* Top Notch / Dynamic Island */}
          <div className="h-9 bg-slate-950 flex items-center justify-between px-6 pt-1 text-[11px] font-semibold text-slate-300 shrink-0 z-50">
            <span>08:30</span>
            <div className="w-24 h-4 bg-slate-900 rounded-full mx-auto" />
            <div className="flex items-center gap-1.5 text-slate-400">
              <Wifi className="w-3.5 h-3.5" />
              <Battery className="w-3.5 h-3.5 text-emerald-400" />
            </div>
          </div>

          {/* Embedded screen scroll container */}
          <div className="flex-1 overflow-y-auto relative">
            <Header />
            <div className="p-3.5 pb-24">
              {renderActiveModule()}
            </div>
            <BottomNavBar />
          </div>

          {/* Home indicator bar */}
          <div className="h-5 bg-slate-950 flex items-center justify-center shrink-0 z-50">
            <div className="w-32 h-1 bg-slate-700 rounded-full" />
          </div>
        </div>

        <FranceConnectModal />
        <VerificationModal />
        <WeeklyNotificationToast />
        <OfflineIndicator />
      </div>
    );
  }

  return appView;
};

export default function App() {
  return (
    <DemocraProvider>
      <MainContent />
    </DemocraProvider>
  );
}
