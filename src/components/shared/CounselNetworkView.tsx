'use client';

import React from 'react';
import { Users } from 'lucide-react';
import { useAppStore } from '@/lib/store';

export function CounselNetworkView({ onNavigate }: { onNavigate?: (view: string) => void }) {
  const vendors = useAppStore((s) => s.vendors).filter(v => v.type.toLowerCase().includes('legal') || v.type.toLowerCase().includes('counsel'));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <Users className="w-6 h-6 text-[#0E9F8E]" />
          External Counsel Network &amp; Law Firms
        </h1>
        <p className="text-xs text-slate-400">Empanelled law firms, litigation SLA performance, fee schedules, and jurisdiction coverage.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {vendors.map(v => (
          <div key={v.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-bold text-white text-sm">{v.name}</div>
                <div className="text-xs text-slate-400 font-mono">{v.jurisdiction} · {v.type}</div>
              </div>
              <span className="px-2.5 py-1 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                {v.dueDiligenceStatus}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800">
              <span className="text-slate-400">Litigation SLA Performance</span>
              <span className="font-mono font-bold text-[#0E9F8E]">{v.slaScore}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
