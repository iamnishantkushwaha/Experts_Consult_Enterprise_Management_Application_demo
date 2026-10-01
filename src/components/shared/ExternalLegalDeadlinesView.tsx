'use client';

import React from 'react';
import { Clock, Calendar, CheckSquare } from 'lucide-react';
import { useAppStore } from '@/lib/store';

export function ExternalLegalDeadlinesView({ onNavigate: _onNavigate }: { onNavigate?: (view: string) => void }) {
  const legalMatters = useAppStore((s) => s.legalMatters);
  const deadlines = legalMatters.flatMap(m => m.deadlines.map(d => ({ ...d, matterId: m.id, debtor: m.debtorName })));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Clock className="w-6 h-6 text-[#2563EB]" />
          Law Firm Court Deadlines &amp; Filings
        </h1>
        <p className="text-xs text-slate-600">Scheduled court appearances, defense response deadlines, and garnishee order deadlines for Adjei &amp; Partners LLP.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xl p-6">
        <div className="space-y-3">
          {deadlines.map((d, i) => (
            <div key={i} className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-amber-600 text-xs">{d.date}</span>
                  <span className="font-semibold text-slate-900 text-xs">— {d.task}</span>
                </div>
                <div className="text-xs text-slate-600 mt-1">Matter: <span className="text-[#2563EB] font-mono">{d.matterId}</span> ({d.debtor})</div>
              </div>
              <span className={`px-2.5 py-1 rounded text-[10px] font-bold border ${d.done ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-rose-50 text-rose-700 border-rose-200'}`}>
                {d.done ? 'Filing Complete' : 'Filing Due'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
