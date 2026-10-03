import React from 'react';
import { ShieldCheck, Bell, Smartphone, Monitor } from 'lucide-react';
import { useDemocra } from '../context/DemocraContext';
import { PWAInstallButton } from './PWAInstallButton';

export const Header: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    user,
    setIsFranceConnectModalOpen,
    triggerWeeklyNotification,
    deviceFrameMode,
    toggleDeviceFrameMode,
  } = useDemocra();

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        
        {/* Zone 1: Single text wordmark */}
        <div className="flex items-center gap-2">
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); setActiveTab('lois'); }}
            className="text-lg font-extrabold tracking-tight text-white flex items-center gap-1.5 font-display"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-linear-to-r from-blue-600 via-white to-red-600 inline-block" />
            Democra'App
          </a>
        </div>

        {/* Zone 2: Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <button
            onClick={() => setActiveTab('lois')}
            className={`transition-colors whitespace-nowrap cursor-pointer py-1 border-b-2 text-xs uppercase tracking-wider font-semibold ${
              activeTab === 'lois'
                ? 'text-blue-400 border-blue-500'
                : 'text-slate-400 border-transparent hover:text-slate-200'
            }`}
          >
            La Fabrique à Lois
          </button>
          <button
            onClick={() => setActiveTab('budget')}
            className={`transition-colors whitespace-nowrap cursor-pointer py-1 border-b-2 text-xs uppercase tracking-wider font-semibold ${
              activeTab === 'budget'
                ? 'text-blue-400 border-blue-500'
                : 'text-slate-400 border-transparent hover:text-slate-200'
            }`}
          >
            Le Budget Citoyen
          </button>
          <button
            onClick={() => setActiveTab('octogone')}
            className={`transition-colors whitespace-nowrap cursor-pointer py-1 border-b-2 text-xs uppercase tracking-wider font-semibold ${
              activeTab === 'octogone'
                ? 'text-blue-400 border-blue-500'
                : 'text-slate-400 border-transparent hover:text-slate-200'
            }`}
          >
            L'Octogone Diplomatique
          </button>
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-2">
          {/* Test Weekly Notification button */}
          <button
            onClick={triggerWeeklyNotification}
            className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-slate-800/80 transition-colors"
            title="Simuler la notification du samedi matin (Vote Express)"
            aria-label="Simuler alerte de vote"
          >
            <Bell className="w-4 h-4" />
          </button>

          {/* Toggle Device Frame (Mobile Frame vs Full Width) */}
          <button
            onClick={toggleDeviceFrameMode}
            className="hidden lg:flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:text-blue-400 hover:bg-slate-800/80 transition-colors"
            title={deviceFrameMode ? "Passer en vue plein écran" : "Passer en vue smartphone mobile"}
            aria-label="Bascule mode d'affichage"
          >
            {deviceFrameMode ? <Monitor className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
          </button>

          {/* PWA Install */}
          <PWAInstallButton />

          {/* FranceConnect Citizen Badge */}
          <button
            onClick={() => setIsFranceConnectModalOpen(true)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
              user.isAuthenticated
                ? 'bg-blue-950/60 border-blue-800/70 text-blue-200 hover:border-blue-700'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750'
            }`}
            title="Statut d'authentification civique"
          >
            <ShieldCheck className={`w-3.5 h-3.5 ${user.isAuthenticated ? 'text-blue-400' : 'text-slate-400'}`} />
            <span className="truncate max-w-[110px] sm:max-w-none">
              {user.isAuthenticated ? 'Citoyen Certifié' : 'Se Connecter'}
            </span>
          </button>
        </div>

      </div>
    </header>
  );
};
