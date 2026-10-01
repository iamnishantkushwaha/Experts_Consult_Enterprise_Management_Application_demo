'use client';

import React from 'react';
import { LayoutDashboard } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { formatMoney } from '@/lib/mock-data';

export function TeamDashboardView({ onNavigate }: { onNavigate?: (view: string) => void }) {
  const approvals = useAppStore((s) => s.approvals);
  const accounts = useAppStore((s) => s.accounts);

  const pendingApprovals = approvals.filter(a => a.decision === 'Pending' && a.approverRole === 'Recovery Manager').length;

  const officers = [
    { name: 'Ama Darko', assigned: 38, contacted: 28, promises: 4, keptPct: 60, cash: 1200000, qaScore: 92, capacity: 80 },
    { name: 'Kwesi Appiah', assigned: 42, contacted: 31, promises: 6, keptPct: 58, cash: 980000, qaScore: 88, capacity: 80 },
  ];

  const priorities = accounts.slice(0, 5).map(a => ({
    ...a,
    reason: a.risk === 'High' ? 'High risk' : (a.status === 'Payment plan' || a.status === 'Promise') ? 'Promise due' : 'Inactive 11 days',
  }));

  const escalations = [
    { id: 'ESC-041', type: 'Broken promise', debtor: 'Kofi Mensah', account: 'ACC-100231', age: '2 days' },
    { id: 'ESC-042', type: 'Inactivity > 14 days', debtor: 'Asante & Sons', account: 'ACC-100290', age: '5 days' },
    { id: 'ESC-043', type: 'High-risk event', debtor: 'Yaw Boateng Logistics', account: 'ACC-100377', age: '1 day' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <LayoutDashboard className="w-6 h-6 text-[#2563EB]" />
          Team Dashboard
        </h1>
        <p className="text-xs text-slate-600">Recovery Manager — Ghana. Team performance, escalations, and approvals.</p>
      </div>

      {/* KPI Tiles */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { label: 'Team Accounts', value: accounts.length.toString(), color: 'text-[#2563EB]' },
          { label: 'Promises Due Today', value: '14', color: 'text-amber-600' },
          { label: 'Broken Promises', value: '9', color: 'text-rose-600' },
          { label: 'Settlements Awaiting Me', value: pendingApprovals.toString(), color: 'text-sky-600' },
          { label: 'Cash Recovered (MTD)', value: 'GHS 1.42M', color: 'text-[#2563EB]' },
          { label: 'QA Score (Team)', value: '90%', color: 'text-emerald-600' },
        ].map(tile => (
          <div key={tile.label} className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-slate-300 transition-colors cursor-pointer group">
            <div className="text-xs font-semibold text-slate-600 group-hover:text-slate-900 mb-2 transition-colors">{tile.label}</div>
            <div className={`text-2xl font-extrabold font-mono ${tile.color}`}>{tile.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Officer Leaderboard */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold text-slate-900">Officer Leaderboard</h3>
            <button onClick={() => onNavigate?.('team_performance')} className="text-xs text-[#2563EB] hover:underline">Performance →</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="text-slate-500 font-semibold border-b border-slate-200">
                <tr>
                  <th className="pb-2">Officer</th>
                  <th className="pb-2 text-right">Contacted</th>
                  <th className="pb-2 text-right">Kept %</th>
                  <th className="pb-2 text-right">Cash</th>
                  <th className="pb-2 text-right">QA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {officers.map(o => (
                  <tr key={o.name} className="hover:bg-slate-100/50">
                    <td className="py-2.5 font-semibold text-slate-900">{o.name}</td>
                    <td className="py-2.5 text-right font-mono">{o.contacted}/{o.assigned}</td>
                    <td className="py-2.5 text-right font-mono">{o.keptPct}%</td>
                    <td className="py-2.5 text-right font-mono text-[#2563EB]">{formatMoney(o.cash, 'GHS')}</td>
                    <td className="py-2.5 text-right">
                      <span className={`font-bold ${o.qaScore >= 90 ? 'text-emerald-600' : 'text-amber-600'}`}>{o.qaScore}%</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Escalation Inbox */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold text-slate-900">Escalation Inbox</h3>
            <span className="px-2 py-0.5 bg-rose-50 text-rose-600 rounded text-[10px] font-bold">{escalations.length} Open</span>
          </div>
          <div className="space-y-2">
            {escalations.map(esc => (
              <div key={esc.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between gap-3 hover:border-slate-300 transition-colors">
                <div>
                  <div className="text-xs font-semibold text-slate-900">{esc.debtor}</div>
                  <div className="text-[11px] text-slate-600">{esc.type} · {esc.age} old</div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => onNavigate?.('account_detail')}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-900 text-[10px] font-bold rounded-lg"
                  >Open</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Today's Priorities */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6">
        <h3 className="text-sm font-bold text-slate-900 mb-4">Today&apos;s Priorities (AI-Ranked)</h3>
        <div className="divide-y divide-slate-200">
          {priorities.map(acc => (
            <div key={acc.id} className="py-3 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <div className="text-xs font-bold text-slate-900 truncate">{acc.debtorName}</div>
                <div className="text-[11px] text-slate-600 font-mono">{acc.id} · {formatMoney(acc.balanceMinor, acc.currency)}</div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  acc.reason === 'High risk' ? 'bg-rose-50 text-rose-700' :
                  acc.reason === 'Promise due' ? 'bg-amber-50 text-amber-700' :
                  'bg-slate-100 text-slate-700'
                }`}>{acc.reason}</span>
                <button
                  onClick={() => onNavigate?.('account_detail')}
                  className="text-[#2563EB] font-bold text-xs hover:underline"
                >Open</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
