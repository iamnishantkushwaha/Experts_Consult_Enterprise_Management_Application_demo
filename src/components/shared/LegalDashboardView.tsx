'use client';

import React from 'react';
import { Scale } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { formatMoney } from '@/lib/mock-data';

export function LegalDashboardView({ onNavigate }: { onNavigate?: (view: string) => void }) {
  const legalMatters = useAppStore((s) => s.legalMatters);

  const activeMatters = legalMatters.filter(m => (m.stage as string) !== 'Closed');
  const upcomingDeadlines = legalMatters
    .flatMap(m => m.deadlines.map(d => ({ ...d, matter: m.id, debtor: m.debtorName, counsel: m.counselName })))
    .filter(d => !d.done)
    .slice(0, 5);

  const stageOrder = ['Proposed', 'Pre-action', 'Filed (writ)', 'Hearing', 'Judgment', 'Enforcement', 'Closed'];
  const stageCounts = stageOrder.map(stage => ({
    stage,
    count: legalMatters.filter(m => m.stage === stage).length,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Scale className="w-6 h-6 text-[#2563EB]" />
          Legal Dashboard
        </h1>
        <p className="text-xs text-slate-600">Referrals pipeline, active matters, deadlines, and counsel network.</p>
      </div>

      {/* Tiles */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: 'Referrals Awaiting', value: '2', color: 'text-amber-600' },
          { label: 'Active Matters', value: activeMatters.length.toString(), color: 'text-slate-900' },
          { label: 'Hearings in 14 Days', value: '1', color: 'text-rose-600' },
          { label: 'Judgments Pending Enforcement', value: '1', color: 'text-amber-600' },
          { label: 'Recoveries via Legal (USD)', value: 'USD 41.2K', color: 'text-[#2563EB]' },
        ].map(t => (
          <div key={t.label} className="bg-white border border-slate-200 rounded-2xl p-4 hover:border-slate-300 transition-colors">
            <div className="text-[11px] text-slate-600 mb-2">{t.label}</div>
            <div className={`text-2xl font-extrabold font-mono ${t.color}`}>{t.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pipeline Funnel */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <h3 className="text-sm font-bold text-slate-900 mb-4">Referrals Pipeline</h3>
          <div className="space-y-2">
            {stageCounts.filter(s => s.count > 0 || ['Proposed', 'Pre-action', 'Filed (writ)', 'Judgment'].includes(s.stage)).map((s) => (
              <div key={s.stage} className="flex items-center gap-3">
                <div className="text-xs text-slate-600 w-32 shrink-0">{s.stage}</div>
                <div className="flex-1 bg-slate-50 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-[#2563EB] h-2 rounded-full"
                    style={{ width: s.count > 0 ? `${Math.max(10, s.count * 25)}%` : '2%' }}
                  />
                </div>
                <span className="text-xs font-bold font-mono text-slate-900 w-6 text-right">{s.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold text-slate-900">Upcoming Deadlines</h3>
            <button onClick={() => onNavigate?.('deadlines_hearings')} className="text-xs text-[#2563EB] hover:underline">View all →</button>
          </div>
          <div className="space-y-2.5">
            {upcomingDeadlines.map((d, i) => (
              <div key={i} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-0.5">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-bold text-slate-900">{d.task}</span>
                  <span className={`text-[10px] font-mono font-bold ${new Date(d.date) <= new Date('2026-10-14') ? 'text-amber-600' : 'text-slate-600'}`}>{d.date}</span>
                </div>
                <div className="text-[11px] text-slate-600">{d.debtor} · {d.counsel}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Active Matters Table */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-bold text-slate-900">Active Legal Matters</h3>
          <button onClick={() => onNavigate?.('legal_matters')} className="text-xs text-[#2563EB] hover:underline">View all →</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3">Matter</th>
                <th className="p-3">Debtor</th>
                <th className="p-3">Counsel</th>
                <th className="p-3">Stage</th>
                <th className="p-3 text-right">Claim</th>
                <th className="p-3">Next Deadline</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {legalMatters.map(m => (
                <tr key={m.id} className="hover:bg-slate-100/50 cursor-pointer" onClick={() => onNavigate?.('account_detail')}>
                  <td className="p-3 font-mono font-bold text-[#2563EB]">{m.id}</td>
                  <td className="p-3 font-semibold text-slate-900">{m.debtorName}</td>
                  <td className="p-3 text-slate-600">{m.counselName}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-800 border border-slate-300">{m.stage}</span>
                  </td>
                  <td className="p-3 font-mono text-right font-bold text-slate-900">{formatMoney(m.claimMinor, m.currency)}</td>
                  <td className="p-3 font-mono text-slate-600">{m.deadlines[0]?.date || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
