'use client';

import React from 'react';
import { AlertCircle } from 'lucide-react';

export function EscalationsView({ onNavigate }: { onNavigate?: (view: string) => void }) {

  const escalations = [
    { id: 'ESC-001', debtor: 'Kofi Mensah', account: 'ACC-100232', reason: 'Broken promise (2 days overdue)', severity: 'Medium', officer: 'Ama Darko' },
    { id: 'ESC-002', debtor: 'Asante & Sons', account: 'ACC-100377', reason: 'Inactivity > 14 days', severity: 'High', officer: 'Kwesi Appiah' },
    { id: 'ESC-003', debtor: 'Yaw Boateng Logistics', account: 'ACC-100378', reason: 'High-risk dispute raised', severity: 'High', officer: 'Ama Darko' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <AlertCircle className="w-6 h-6 text-amber-400" />
          Manager Escalations Inbox
        </h1>
        <p className="text-xs text-slate-400">High-priority account escalations requiring manager intervention or policy overrides.</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl p-6">
        <div className="space-y-3">
          {escalations.map(e => (
            <div key={e.id} className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-white text-xs">{e.id}</span>
                  <span className="font-semibold text-slate-200 text-xs">— {e.debtor}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                    e.severity === 'High' ? 'bg-rose-950 text-rose-300 border-rose-800' : 'bg-amber-950 text-amber-300 border-amber-800'
                  }`}>{e.severity}</span>
                </div>
                <div className="text-xs text-slate-400 mt-1">{e.reason} · Assigned Officer: <span className="text-slate-300">{e.officer}</span></div>
              </div>
              <button
                onClick={() => onNavigate?.('account_detail', { id: e.account })}
                className="px-3.5 py-2 bg-[#0E9F8E] hover:bg-[#0c8879] text-white rounded-xl text-xs font-semibold"
              >
                Review Escalation
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
