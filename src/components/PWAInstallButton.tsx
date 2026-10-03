import React, { useState } from 'react';
import { Download, Smartphone, X } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already running as an installed PWA, hide the button
  if (isInstalled) {
    return null;
  }

  // Chromium / Android / Desktop flow
  if (isInstallable) {
    return (
      <button
        onClick={install}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white shadow-sm transition-colors whitespace-nowrap cursor-pointer"
        title="Installer Democra'App sur votre appareil"
      >
        <Download className="w-3.5 h-3.5" />
        <span>Installer PWA</span>
      </button>
    );
  }

  // iOS Safari flow
  if (isIOS) {
    return (
      <>
        <button
          onClick={() => setShowIOSGuide(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-700 bg-slate-850 hover:bg-slate-800 text-slate-200 transition-colors whitespace-nowrap cursor-pointer"
        >
          <Smartphone className="w-3.5 h-3.5 text-blue-400" />
          <span>Installer iOS</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
            <div className="w-full max-w-sm rounded-2xl bg-slate-900 border border-slate-700 p-6 shadow-2xl text-slate-100 relative">
              <button
                onClick={() => setShowIOSGuide(false)}
                className="absolute top-4 right-4 p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Installer sur iPhone / iPad</h3>
                  <p className="text-xs text-slate-400">Accès direct et hors-ligne garanti</p>
                </div>
              </div>
              <div className="space-y-3 text-xs text-slate-300 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-blue-600/30 text-blue-300 font-bold flex items-center justify-center shrink-0 text-[11px]">1</span>
                  <span>Touchez le bouton <strong>Partager</strong> <span className="inline-block px-1.5 py-0.5 rounded bg-slate-800 text-[11px] font-mono">⎋</span> dans la barre inférieure de Safari.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-blue-600/30 text-blue-300 font-bold flex items-center justify-center shrink-0 text-[11px]">2</span>
                  <span>Faites défiler et sélectionnez <strong>Sur l'écran d'accueil</strong>.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-blue-600/30 text-blue-300 font-bold flex items-center justify-center shrink-0 text-[11px]">3</span>
                  <span>Touchez <strong>Ajouter</strong> en haut à droite.</span>
                </div>
              </div>
              <button
                onClick={() => setShowIOSGuide(false)}
                className="mt-5 w-full rounded-xl bg-slate-800 hover:bg-slate-700 py-2.5 text-xs font-semibold text-white transition-colors"
              >
                J'ai compris
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  // Fallback desktop indicator/quick install button
  return (
    <button
      onClick={() => {
        alert("Pour installer Democra'App : utilisez le menu de votre navigateur ou l'icône dans la barre d'adresse pour 'Ajouter à l'écran d'accueil' ou 'Installer'.");
      }}
      className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700/80 transition-colors whitespace-nowrap"
      title="Application compatible PWA & Mobile"
    >
      <Download className="w-3 h-3 text-slate-400" />
      <span>PWA Prête</span>
    </button>
  );
};
