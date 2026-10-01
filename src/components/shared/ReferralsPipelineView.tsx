'use client';

import React from 'react';
import { Scale } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { formatMoney } from '@/lib/mock-data';

export function ReferralsPipelineView({ onNavigate }: { onNavigate?: (view: string) => void }) {
  const legalMatters = useAppStore((s) => s.legalMatters);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <Scale className="w-6 h-6 text-[#0E9F8E]" />
          Referrals Pipeline &amp; Case Assessment
        </h1>
        <p className="text-xs text-slate-400">Incoming recovery-to-legal referrals, merit assessment, and counsel instruction gateway.</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl p-6">
        <div className="space-y-4">
          {legalMatters.map(m => (
            <div key={m.id} className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-[#0E9F8E] text-xs">{m.id}</span>
                  <span className="font-semibold text-white text-xs">— {m.debtorName}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700">{m.stage}</span>
                </div>
                <div className="text-xs text-slate-400 mt-1">Claim Amount: <strong className="text-white font-mono">{formatMoney(m.claimMinor, m.currency)}</strong> · External Counsel: <span className="text-slate-200">{m.counselName}</span></div>
              </div>
              <button onClick={() => onNavigate?.('account_detail')} className="px-3.5 py-2 bg-[#0E9F8E] hover:bg-[#0c8879] text-white rounded-xl text-xs font-semibold">
                Instruct Counsel
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
