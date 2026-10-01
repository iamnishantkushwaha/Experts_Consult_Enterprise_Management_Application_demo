'use client';

import React from 'react';
import { AlertCircle } from 'lucide-react';

export function EscalationsView({ onNavigate }: { onNavigate?: (view: string, data?: Record<string, unknown>) => void }) {

  const escalations = [
    { id: 'ESC-001', debtor: 'Kofi Mensah', account: 'ACC-100232', reason: 'Broken promise (2 days overdue)', severity: 'Medium', officer: 'Ama Darko' },
    { id: 'ESC-002', debtor: 'Asante & Sons', account: 'ACC-100377', reason: 'Inactivity > 14 days', severity: 'High', officer: 'Kwesi Appiah' },
    { id: 'ESC-003', debtor: 'Yaw Boateng Logistics', account: 'ACC-100378', reason: 'High-risk dispute raised', severity: 'High', officer: 'Ama Darko' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <AlertCircle className="w-6 h-6 text-amber-600" />
          Manager Escalations Inbox
        </h1>
        <p className="text-xs text-slate-600">High-priority account escalations requiring manager intervention or policy overrides.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xl p-6">
        <div className="space-y-3">
          {escalations.map(e => (
            <div key={e.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-slate-900 text-xs">{e.id}</span>
                  <span className="font-semibold text-slate-800 text-xs">— {e.debtor}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                    e.severity === 'High' ? 'bg-rose-50 text-rose-700 border-rose-200' : 'bg-amber-50 text-amber-700 border-amber-200'
                  }`}>{e.severity}</span>
                </div>
                <div className="text-xs text-slate-600 mt-1">{e.reason} · Assigned Officer: <span className="text-slate-700">{e.officer}</span></div>
              </div>
              <button
                onClick={() => onNavigate?.('account_detail', { id: e.account })}
                className="px-3.5 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-xl text-xs font-semibold"
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
