import React from 'react';
import { X, ShieldCheck, CheckCircle2, Lock, KeyRound } from 'lucide-react';
import { useDemocra } from '../context/DemocraContext';

export const FranceConnectModal: React.FC = () => {
  const {
    isFranceConnectModalOpen,
    setIsFranceConnectModalOpen,
    user,
    loginWithFranceConnect,
    logout,
    setIsAuditModalOpen,
  } = useDemocra();

  if (!isFranceConnectModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-6 text-slate-100 relative">
        <button
          onClick={() => setIsFranceConnectModalOpen(false)}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white font-display">Identité & Souveraineté Civique</h3>
            <p className="text-xs text-slate-400">Garantie constitutionnelle : 1 Citoyen = 1 Vote</p>
          </div>
        </div>

        {user.isAuthenticated ? (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-blue-950/40 border border-blue-800/60 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Statut du compte :</span>
                <span className="inline-flex items-center gap-1 font-semibold text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Citoyen Vérifié Majeur
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Identifiant citoyen anonymisé :</span>
                <span className="font-mono text-slate-200">{user.citizenId}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Fournisseur d'identité :</span>
                <span className="font-medium text-blue-300">{user.provider || 'FranceConnect'}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Circonscription fiscale :</span>
                <span className="font-medium text-slate-200">{user.postalCode} (France)</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 space-y-2">
              <div className="flex items-center gap-2 font-semibold text-white">
                <Lock className="w-4 h-4 text-emerald-400" />
                <span>Séparation cryptographique absolue</span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-400">
                Votre identité sert uniquement à émarger sur le registre public décentralisé. Dès le dépôt dans l'urne, votre bulletin est dissocié de votre nom par chiffrement homomorphe.
              </p>
              <button
                onClick={() => {
                  setIsFranceConnectModalOpen(false);
                  setIsAuditModalOpen(true);
                }}
                className="text-[11px] text-blue-400 hover:text-blue-300 underline font-medium cursor-pointer"
              >
                Inspecter le registre d'émargement & la preuve cryptographique →
              </button>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                onClick={() => {
                  logout();
                  setIsFranceConnectModalOpen(false);
                }}
                className="w-full py-2.5 rounded-xl border border-rose-800/60 bg-rose-950/30 hover:bg-rose-900/40 text-rose-300 text-xs font-semibold transition-colors"
              >
                Se Déconnecter
              </button>
              <button
                onClick={() => setIsFranceConnectModalOpen(false)}
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors"
              >
                Continuer mes Votes
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-xs text-slate-300 leading-relaxed">
              Pour participer aux votes hebdomadaires et à l'arbitrage budgétaire, authentifiez-vous via FranceConnect. Cela garantit l'unicité de votre vote sans jamais divulguer vos choix.
            </p>

            <div className="space-y-2.5 pt-1">
              <button
                onClick={() => loginWithFranceConnect('FranceConnect')}
                className="w-full py-3 px-4 rounded-xl bg-[#000091] hover:bg-[#1212ff] text-white flex items-center justify-between font-semibold text-xs transition-all shadow-md cursor-pointer border border-blue-400/20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-md bg-white flex items-center justify-center font-black text-[#000091] text-[10px]">
                    FC
                  </div>
                  <span>S'identifier avec <strong>FranceConnect</strong></span>
                </div>
                <KeyRound className="w-4 h-4 text-blue-200" />
              </button>

              <button
                onClick={() => loginWithFranceConnect('ImpotsGouv')}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 flex items-center justify-between text-xs font-medium transition-colors border border-slate-700 cursor-pointer"
              >
                <span>Impots.gouv.fr (Espace Particulier)</span>
                <span className="text-[10px] text-slate-400 font-mono">DGFiP</span>
              </button>

              <button
                onClick={() => loginWithFranceConnect('Ameli')}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 flex items-center justify-between text-xs font-medium transition-colors border border-slate-700 cursor-pointer"
              >
                <span>Assurance Maladie (Ameli)</span>
                <span className="text-[10px] text-slate-400 font-mono">CPAM</span>
              </button>

              <button
                onClick={() => loginWithFranceConnect('LaPoste')}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 flex items-center justify-between text-xs font-medium transition-colors border border-slate-700 cursor-pointer"
              >
                <span>L'Identité Numérique La Poste</span>
                <span className="text-[10px] text-slate-400 font-mono">Niveau Substantiel</span>
              </button>
            </div>

            <p className="text-[10px] text-slate-400 text-center pt-2">
              🔒 Protocole conforme au RGPD et au Code Électoral français.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
