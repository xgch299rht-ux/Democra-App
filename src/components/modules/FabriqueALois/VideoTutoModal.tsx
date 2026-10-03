import React, { useState, useEffect } from 'react';
import { X, Play, Pause, RotateCcw, CheckCircle, ThumbsUp, ThumbsDown, HelpCircle, Sparkles } from 'lucide-react';
import { LawProposal, VoteChoice } from '../../../types';
import { useDemocra } from '../../../context/DemocraContext';
import confetti from 'canvas-confetti';

interface VideoTutoModalProps {
  proposal: LawProposal;
  onClose: () => void;
}

export const VideoTutoModal: React.FC<VideoTutoModalProps> = ({ proposal, onClose }) => {
  const { castVote } = useDemocra();
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const [activeChapterIndex, setActiveChapterIndex] = useState<number>(0);
  const [hasVoted, setHasVoted] = useState<boolean>(!!proposal.userVote);
  const [voteReceipt, setVoteReceipt] = useState<string | null>(proposal.voteReceipt || null);

  const chapters = proposal.tutorialVideo.chapters;

  // Playhead simulation (approx 30s quick demonstration or controlled scrub)
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setIsPlaying(false);
          return 100;
        }
        const next = prev + 1.2;
        const chapIdx = Math.min(
          chapters.length - 1,
          Math.floor((next / 100) * chapters.length)
        );
        setActiveChapterIndex(chapIdx);
        return next;
      });
    }, 250);

    return () => clearInterval(interval);
  }, [isPlaying, chapters.length]);

  const handleVote = async (choice: VoteChoice) => {
    const receipt = await castVote(proposal.id, choice);
    setHasVoted(true);
    setVoteReceipt(receipt);
    if (choice === 'OUI') {
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch (e) { /* ignore */ }
    }
  };

  const jumpToChapter = (index: number) => {
    setActiveChapterIndex(index);
    setProgress((index / chapters.length) * 100);
    setIsPlaying(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-4 overflow-y-auto">
      <div className="w-full max-w-2xl rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl overflow-hidden text-slate-100 flex flex-col relative max-h-[92vh]">
        
        {/* Top bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-950/80 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Capsule Vidéo & Vulgarisation • {proposal.tutorialDuration}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Canvas Player Simulation */}
        <div className="relative aspect-video w-full bg-slate-950 flex flex-col justify-between p-4 sm:p-6 overflow-hidden">
          {/* Background illustration / visual */}
          <div
            className="absolute inset-0 opacity-20 bg-cover bg-center pointer-events-none"
            style={{ backgroundImage: `url(${proposal.image || '/src/assets/images/civic_tuto_explainer_1791001799993.jpg'})` }}
          />

          {/* Subtitle / Chapter Display */}
          <div className="relative z-10 flex items-start justify-between">
            <div className="bg-slate-900/90 border border-slate-700 px-3 py-1.5 rounded-xl backdrop-blur-md">
              <span className="text-[11px] font-mono text-blue-400">
                Chapitre {activeChapterIndex + 1}/{chapters.length} : {chapters[activeChapterIndex]?.title}
              </span>
            </div>
            <div className="bg-blue-950/80 border border-blue-800/70 text-blue-300 px-2.5 py-1 rounded-lg text-[10px] font-semibold flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-blue-400" />
              <span>Pédagogie Citoyenne</span>
            </div>
          </div>

          {/* Main animated explainer slide text */}
          <div className="relative z-10 my-auto text-center max-w-xl mx-auto px-2">
            <div className="inline-block p-4 sm:p-5 rounded-2xl bg-slate-900/85 border border-slate-700/80 backdrop-blur-md shadow-xl">
              <p className="text-sm sm:text-base font-semibold text-white leading-relaxed">
                « {chapters[activeChapterIndex]?.text} »
              </p>
              <p className="mt-2 text-xs text-amber-400/90 font-medium">
                💡 {proposal.tutorialVideo.infographicNote}
              </p>
            </div>
          </div>

          {/* Player Controls Bar */}
          <div className="relative z-10 space-y-2 pt-2">
            {/* Progress bar */}
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden cursor-pointer">
              <div
                className="bg-linear-to-r from-blue-500 to-indigo-500 h-full rounded-full transition-all duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-colors cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => { setProgress(0); setIsPlaying(true); setActiveChapterIndex(0); }}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  title="Recommencer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <span className="font-mono text-[11px] text-slate-300">
                  {Math.floor((progress / 100) * 105)}s / 105s
                </span>
              </div>

              {/* Chapter jumps */}
              <div className="flex items-center gap-1.5">
                {chapters.map((c, idx) => (
                  <button
                    key={idx}
                    onClick={() => jumpToChapter(idx)}
                    className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors ${
                      idx === activeChapterIndex
                        ? 'bg-blue-600 text-white font-bold'
                        : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Explainer Synthesis & Vote inside Tuto */}
        <div className="p-4 sm:p-6 bg-slate-900 overflow-y-auto space-y-4">
          <div>
            <h4 className="text-sm font-bold text-white mb-1">{proposal.title}</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {proposal.tutorialVideo.description}
            </p>
          </div>

          {/* Quick Pros vs Cons reminder */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-900/40">
              <span className="font-semibold text-emerald-400 block mb-1">Arguments POUR :</span>
              <ul className="space-y-1 text-slate-300 text-[11px]">
                {proposal.pros.slice(0, 2).map((pro, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-emerald-400">•</span>
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-900/40">
              <span className="font-semibold text-rose-400 block mb-1">Arguments CONTRE :</span>
              <ul className="space-y-1 text-slate-300 text-[11px]">
                {proposal.cons.slice(0, 2).map((con, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-rose-400">•</span>
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Direct Express Vote After Tuto */}
          <div className="pt-2 border-t border-slate-800">
            {hasVoted ? (
              <div className="p-3.5 rounded-xl bg-blue-950/50 border border-blue-800/60 text-center space-y-1.5">
                <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-emerald-400">
                  <CheckCircle className="w-4 h-4" />
                  <span>Votre vote éclairé a été enregistré avec succès !</span>
                </div>
                {voteReceipt && (
                  <p className="text-[10px] font-mono text-slate-400">
                    Reçu d'urne anonyme : {voteReceipt}
                  </p>
                )}
                <button
                  onClick={onClose}
                  className="mt-2 px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white transition-colors"
                >
                  Revenir aux propositions
                </button>
              </div>
            ) : (
              <div>
                <p className="text-xs font-semibold text-slate-300 mb-2.5 text-center">
                  Maintenant que le sujet est clair, quel est votre arbitrage citoyen ?
                </p>
                <div className="grid grid-cols-3 gap-2.5">
                  <button
                    onClick={() => handleVote('OUI')}
                    className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>Oui (Je veux)</span>
                  </button>

                  <button
                    onClick={() => handleVote('NON')}
                    className="py-2.5 px-3 rounded-xl bg-rose-600 hover:bg-rose-500 active:scale-95 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer"
                  >
                    <ThumbsDown className="w-3.5 h-3.5" />
                    <span>Non (Refuser)</span>
                  </button>

                  <button
                    onClick={() => {
                      setProgress(0);
                      setIsPlaying(true);
                      setActiveChapterIndex(0);
                    }}
                    className="py-2.5 px-3 rounded-xl bg-amber-600/30 hover:bg-amber-600/40 text-amber-300 border border-amber-500/40 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Revoir le tuto</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
