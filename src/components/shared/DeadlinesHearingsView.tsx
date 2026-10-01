'use client';

import React from 'react';
import { Clock } from 'lucide-react';
import { useAppStore } from '@/lib/store';

export function DeadlinesHearingsView({ onNavigate }: { onNavigate?: (view: string) => void }) {
  const legalMatters = useAppStore((s) => s.legalMatters);
  const deadlines = legalMatters.flatMap(m => m.deadlines.map(d => ({ ...d, matterId: m.id, debtor: m.debtorName, counsel: m.counselName })));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <Clock className="w-6 h-6 text-[#0E9F8E]" />
          Legal Deadlines &amp; Court Hearings Calendar
        </h1>
        <p className="text-xs text-slate-400">Statutory limitation dates, writ filings, court hearing appearances, and judgment enforcement deadlines.</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl p-6">
        <div className="space-y-3">
          {deadlines.map((d, i) => (
            <div key={i} className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-amber-400 text-xs">{d.date}</span>
                  <span className="font-semibold text-white text-xs">— {d.task}</span>
                </div>
                <div className="text-xs text-slate-400 mt-1">Matter: <span className="text-[#0E9F8E] font-mono">{d.matterId}</span> ({d.debtor}) · Counsel: <span className="text-slate-300">{d.counsel}</span></div>
              </div>
              <span className={`px-2.5 py-1 rounded text-[10px] font-bold border ${d.done ? 'bg-emerald-950 text-emerald-300 border-emerald-800' : 'bg-rose-950 text-rose-300 border-rose-800'}`}>
                {d.done ? 'Completed' : 'Pending Action'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
