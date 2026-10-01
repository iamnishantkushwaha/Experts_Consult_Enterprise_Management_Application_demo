'use client';

import React from 'react';
import { Award } from 'lucide-react';
import { useAppStore } from '@/lib/store';

export function TrainingCompetencyView({ onNavigate }: { onNavigate?: (view: string) => void }) {
  const users = useAppStore((s) => s.users);

  const modules = [
    { code: 'MOD-AML', name: 'AML & Counter-Terrorist Financing 2026', mandatoryFor: 'All Staff', status: 'Compliant' },
    { code: 'MOD-[#0E9F8E]', name: 'Fair Debt Collection & Debtor Treatment', mandatoryFor: 'Recovery Officers', status: 'Compliant' },
    { code: 'MOD-GDPR', name: 'Data Protection & PII Safeguarding', mandatoryFor: 'All Staff', status: 'Compliant' },
    { code: 'MOD-SANCTION', name: 'Sanction Screening & Conflict of Interest', mandatoryFor: 'Legal & Risk Officers', status: 'Compliant' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <Award className="w-6 h-6 text-[#0E9F8E]" />
          Training &amp; Competency Matrix
        </h1>
        <p className="text-xs text-slate-400">Mandatory regulatory compliance certifications, officer competency tracking, and annual refresher logs.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-white">Mandatory Training Modules</h3>
          <div className="space-y-3">
            {modules.map(m => (
              <div key={m.code} className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex justify-between items-center text-xs">
                <div>
                  <div className="font-bold text-white">{m.name}</div>
                  <div className="text-[11px] text-slate-400 font-mono">{m.code} · Mandatory for {m.mandatoryFor}</div>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                  {m.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-white">Staff Certification Health</h3>
          <div className="space-y-3">
            {users.slice(0, 5).map(u => (
              <div key={u.id} className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex justify-between items-center text-xs">
                <div>
                  <div className="font-bold text-white">{u.name}</div>
                  <div className="text-[11px] text-slate-400">{u.roleTitle} · {u.team}</div>
                </div>
                <span className="font-mono font-bold text-[#0E9F8E]">100% Certified</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
