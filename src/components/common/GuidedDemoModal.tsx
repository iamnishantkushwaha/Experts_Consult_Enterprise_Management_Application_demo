'use client';

import React from 'react';
import { X, Play, Clock, Sparkles, CheckCircle } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { DEMO_CHAPTERS } from '@/lib/mock-data';

interface GuidedDemoModalProps {
  onClose: () => void;
}

export function GuidedDemoModal({ onClose }: GuidedDemoModalProps) {
  const startGuidedDemo = useAppStore((s) => s.startGuidedDemo);

  const handleSelectChapter = (index: number) => {
    startGuidedDemo(index);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0E9F8E]/20 text-[#0E9F8E] flex items-center justify-center border border-[#0E9F8E]/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Guided Demo Walkthrough</h2>
              <p className="text-xs text-slate-400">9 structured chapters based on the Appendix Walkthrough Script (~20 mins total)</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chapters list */}
        <div className="p-6 overflow-y-auto max-h-[60vh] space-y-3">
          {DEMO_CHAPTERS.map((chap, idx) => (
            <div
              key={chap.id}
              onClick={() => handleSelectChapter(idx)}
              className="group flex items-center justify-between p-4 bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800 hover:border-[#0E9F8E]/50 rounded-2xl cursor-pointer transition-all duration-200"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#0E9F8E] uppercase tracking-wider">
                    Chapter {chap.id}
                  </span>
                  <span className="text-xs text-slate-500">•</span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {chap.duration}
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-slate-200 group-hover:text-white">
                  {chap.title}
                </h4>
                <p className="text-xs text-slate-400 italic">
                  {chap.presenterSay}
                </p>
              </div>

              <div className="w-9 h-9 rounded-xl bg-slate-900 group-hover:bg-[#0E9F8E] text-slate-400 group-hover:text-white flex items-center justify-center transition-colors shrink-0 ml-4">
                <Play className="w-4 h-4 fill-current ml-0.5" />
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-950/60 border-t border-slate-800 text-xs text-slate-400">
          <span className="flex items-center gap-1.5 text-slate-400">
            <CheckCircle className="w-4 h-4 text-[#0E9F8E]" /> Click any chapter to jump directly to that persona & guide
          </span>
          <button
            onClick={() => handleSelectChapter(0)}
            className="px-5 py-2.5 bg-[#0E9F8E] hover:bg-[#0c8879] text-white font-semibold rounded-xl transition-all shadow-lg shadow-[#0E9F8E]/20"
          >
            Start Chapter 1 (CEO)
          </button>
        </div>
      </div>
    </div>
  );
}
