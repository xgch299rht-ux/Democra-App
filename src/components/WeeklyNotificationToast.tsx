import React from 'react';
import { Bell, X, ArrowRight, Clock } from 'lucide-react';
import { useDemocra } from '../context/DemocraContext';

export const WeeklyNotificationToast: React.FC = () => {
  const {
    weeklyNotificationActive,
    dismissWeeklyNotification,
    setActiveTab,
  } = useDemocra();

  if (!weeklyNotificationActive) return null;

  return (
    <div className="fixed top-18 right-4 left-4 sm:left-auto sm:right-6 sm:w-96 z-50 animate-bounce-once">
      <div className="rounded-2xl bg-slate-900/95 border border-blue-500/50 p-4 shadow-2xl backdrop-blur-md text-white">
        <div className="flex items-start justify-between gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-blue-400 shrink-0">
            <Bell className="w-5 h-5 animate-pulse" />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between text-[11px] text-blue-400 font-semibold mb-1">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Notification Push • Samedi 08:30
              </span>
              <span className="font-mono text-slate-400">5 min chrono</span>
            </div>
            <h4 className="text-xs font-bold text-white leading-snug">
              Session #42 : Le Vote Hebdomadaire est ouvert !
            </h4>
            <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
              4 nouvelles propositions de lois élaborées par l'Assemblée Citoyenne attendent votre arbitrage direct.
            </p>
            
            <div className="mt-3 flex items-center gap-2">
              <button
                onClick={() => {
                  setActiveTab('lois');
                  dismissWeeklyNotification();
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                <span>Voter maintenant</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={dismissWeeklyNotification}
                className="px-2.5 py-1.5 rounded-lg text-slate-400 hover:text-slate-200 text-xs hover:bg-slate-800 transition-colors"
              >
                Plus tard
              </button>
            </div>
          </div>

          <button
            onClick={dismissWeeklyNotification}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
