'use client';

import React from 'react';
import { Scale } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { formatMoney } from '@/lib/mock-data';

export function ClientLegalCasesView({ onNavigate }: { onNavigate?: (view: string) => void }) {
  const legalMatters = useAppStore((s) => s.legalMatters);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <Scale className="w-6 h-6 text-[#0E9F8E]" />
          Client Legal Litigation Cases
        </h1>
        <p className="text-xs text-slate-400">Court proceedings, law firm filings, and lawsuit progress reports for your portfolio.</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl p-6">
        <div className="space-y-3">
          {legalMatters.map(m => (
            <div key={m.id} className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-[#0E9F8E] text-xs">{m.id}</span>
                  <span className="font-semibold text-white text-xs">— {m.debtorName}</span>
                </div>
                <div className="text-xs text-slate-400 mt-1">Claim: <strong className="text-white font-mono">{formatMoney(m.claimMinor, m.currency)}</strong> · Counsel: <span className="text-slate-300">{m.counselName}</span> · Stage: <span className="text-amber-400 font-semibold">{m.stage}</span></div>
              </div>
              <button onClick={() => onNavigate?.('account_detail')} className="text-[#0E9F8E] hover:underline text-xs font-semibold">
                Inspect Case →
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
