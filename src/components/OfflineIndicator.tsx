import React from 'react';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 z-50 flex items-center gap-2.5 rounded-xl bg-amber-600/95 text-white px-4 py-2.5 shadow-xl backdrop-blur-xs text-xs font-semibold border border-amber-500/50">
      <WifiOff className="w-4 h-4 shrink-0 animate-pulse text-amber-200" />
      <span>Mode Hors-Ligne activé — Vos votes et propositions sont conservés en local et seront synchronisés.</span>
    </div>
  );
};
