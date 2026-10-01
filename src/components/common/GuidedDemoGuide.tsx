'use client';

import React from 'react';
import { Play, CheckSquare, Square, ChevronDown, ChevronUp, X, ArrowRight, Sparkles } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { DEMO_CHAPTERS } from '@/lib/mock-data';

export function GuidedDemoGuide() {
  const guidedDemo = useAppStore((s) => s.guidedDemo);
  const toggleDemoStep = useAppStore((s) => s.toggleDemoStep);
  const nextDemoChapter = useAppStore((s) => s.nextDemoChapter);
  const minimizeGuidedDemo = useAppStore((s) => s.minimizeGuidedDemo);
  const exitGuidedDemo = useAppStore((s) => s.exitGuidedDemo);

  if (!guidedDemo.active) return null;

  const currentChapter = DEMO_CHAPTERS[guidedDemo.currentChapterIndex];
  if (!currentChapter) return null;

  const totalChapters = DEMO_CHAPTERS.length;
  const isLastChapter = guidedDemo.currentChapterIndex === totalChapters - 1;

  return (
    <div className="fixed bottom-4 left-4 z-50 max-w-sm w-full bg-slate-900/95 border border-[#0E9F8E]/40 rounded-2xl shadow-2xl backdrop-blur-md overflow-hidden animate-in slide-in-from-left duration-300">
      {/* Header bar */}
      <div className="bg-gradient-to-r from-[#0E9F8E]/20 via-slate-900 to-slate-900 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#0E9F8E]" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#0E9F8E]">
            Demo Walkthrough ({currentChapter.id}/{totalChapters})
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={minimizeGuidedDemo}
            className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800"
          >
            {guidedDemo.minimized ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          <button
            onClick={exitGuidedDemo}
            className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {!guidedDemo.minimized && (
        <div className="p-4 space-y-3 max-h-[70vh] overflow-y-auto">
          <div>
            <h3 className="text-sm font-bold text-white leading-snug">{currentChapter.title}</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Role: <strong className="text-teal-400">{currentChapter.roleName}</strong>
            </p>
          </div>

          {/* Checklist */}
          <div className="space-y-2 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
            <span className="text-[11px] font-semibold uppercase text-slate-400 tracking-wider">
              Chapter Steps
            </span>
            {currentChapter.steps.map((step) => {
              const done = !!guidedDemo.completedSteps[step.id];
              return (
                <div
                  key={step.id}
                  onClick={() => toggleDemoStep(step.id)}
                  className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-300 hover:text-white group"
                >
                  {done ? (
                    <CheckSquare className="w-4 h-4 text-[#0E9F8E] shrink-0 mt-0.5" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-500 group-hover:text-slate-400 shrink-0 mt-0.5" />
                  )}
                  <span className={done ? 'line-through text-slate-500' : ''}>{step.text}</span>
                </div>
              );
            })}
          </div>

          {/* Presenter script hint */}
          <div className="bg-[#0E9F8E]/10 border border-[#0E9F8E]/30 p-3 rounded-xl text-xs text-teal-200 leading-relaxed italic">
            <strong>Presenter script:</strong> {currentChapter.presenterSay}
          </div>

          {/* Next chapter button */}
          <button
            onClick={nextDemoChapter}
            className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#0E9F8E] hover:bg-[#0c8879] text-white font-semibold text-xs rounded-xl transition-all shadow-lg shadow-[#0E9F8E]/20"
          >
            <span>{isLastChapter ? 'Finish Guided Demo' : 'Next role →'}</span>
            {!isLastChapter && <ArrowRight className="w-3.5 h-3.5" />}
          </button>
        </div>
      )}
    </div>
  );
}
