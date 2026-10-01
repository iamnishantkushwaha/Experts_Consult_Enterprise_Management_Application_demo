'use client';

import React from 'react';
import { LayoutDashboard } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { formatMoney } from '@/lib/mock-data';

export function ClientPortalDashboardView({ onNavigate }: { onNavigate?: (view: string) => void }) {
  const portfolios = useAppStore((s) => s.portfolios);
  const accounts = useAppStore((s) => s.accounts);
  const currentRole = useAppStore((s) => s.currentRole);
  const settlements = useAppStore((s) => s.settlements);
  const remittances = useAppStore((s) => s.remittances);

  const isVolta = currentRole === 'client_admin_volta';
  const clientId = isVolta ? 'CL-001' : 'CL-002';
  const clientName = isVolta ? 'Volta Telecom Ghana' : 'Savannah Commercial Bank';

  const clientPortfolios = portfolios.filter(p => p.clientId === clientId);
  const clientAccounts = accounts.filter(a => a.clientName === clientName);
  const clientRemittances = remittances.filter(r => r.clientId === clientId);
  const pendingSettlements = settlements.filter(s => s.clientName === clientName && s.status === 'Pending approval');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <LayoutDashboard className="w-6 h-6 text-[#0E9F8E]" />
          Portfolio Dashboard
        </h1>
        <p className="text-xs text-slate-400">{clientName} — Client portal. Your data only.</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {clientPortfolios.map(p => (
          <div key={p.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="text-[10px] font-bold text-[#0E9F8E] uppercase tracking-wider mb-1">{p.id}</div>
            <div className="text-sm font-bold text-white mb-3">{p.name}</div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Assigned</span>
                <span className="font-mono font-bold text-white">{formatMoney(p.assignedMinor, p.currency)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Recovered</span>
                <span className="font-mono font-bold text-[#0E9F8E]">{formatMoney(p.recoveredMinor, p.currency)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Rate</span>
                <span className="font-mono font-bold text-white">{p.recoveryRatePct?.toFixed(1) ?? '—'}%</span>
              </div>
              <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden">
                <div className="bg-[#0E9F8E] h-1.5 rounded-full" style={{ width: `${Math.min(100, p.recoveryRatePct ?? 0)}%` }} />
              </div>
            </div>
            <div className="mt-3">
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${p.status === 'Active' ? 'bg-emerald-950 text-emerald-300' : 'bg-amber-950 text-amber-300'}`}>{p.status}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Settlement Approvals */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold text-white">Settlement Approvals</h3>
            <button onClick={() => onNavigate?.('settlement_approvals')} className="text-xs text-[#0E9F8E] hover:underline">View all →</button>
          </div>
          {pendingSettlements.length === 0 ? (
            <div className="text-center py-8 text-slate-500 text-xs">No settlements awaiting your approval.</div>
          ) : (
            <div className="space-y-3">
              {pendingSettlements.map(s => (
                <div key={s.id} className="p-3.5 bg-slate-950 border border-amber-800/40 rounded-xl space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-xs font-bold text-white">{s.debtorName}</div>
                      <div className="text-[11px] text-slate-400">{s.id} · {s.discountPct}% discount</div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-950 text-amber-300">Pending Client</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 py-1.5 bg-[#0E9F8E] text-white text-[11px] font-bold rounded-lg">Approve</button>
                    <button className="flex-1 py-1.5 bg-slate-800 text-slate-300 text-[11px] font-bold rounded-lg">Reject</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Remittance Statements */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold text-white">Remittance Statements</h3>
            <button onClick={() => onNavigate?.('remittances')} className="text-xs text-[#0E9F8E] hover:underline">View all →</button>
          </div>
          <div className="space-y-2.5">
            {clientRemittances.map(r => (
              <div key={r.id} className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-white">{r.period}</div>
                  <div className="text-[11px] font-mono text-slate-400">Net: {formatMoney(r.netMinor, r.currency)}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    r.status === 'Remitted' ? 'bg-emerald-950 text-emerald-300' :
                    r.status === 'Blocked' ? 'bg-rose-950 text-rose-300' :
                    'bg-amber-950 text-amber-300'
                  }`}>{r.status}</span>
                  {r.status === 'Remitted' && (
                    <button className="text-[#0E9F8E] text-[10px] font-bold hover:underline">Download</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Accounts Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-bold text-white">Accounts ({clientAccounts.length})</h3>
          <button onClick={() => onNavigate?.('accounts')} className="text-xs text-[#0E9F8E] hover:underline">View all →</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800">
              <tr>
                <th className="p-3">Account</th>
                <th className="p-3">Debtor</th>
                <th className="p-3">Balance</th>
                <th className="p-3">Aging</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {clientAccounts.slice(0, 8).map(a => (
                <tr key={a.id} className="hover:bg-slate-800/50">
                  <td className="p-3 font-mono font-bold text-[#0E9F8E]">{a.id}</td>
                  <td className="p-3 font-semibold text-white">{a.debtorName}</td>
                  <td className="p-3 font-mono font-bold text-white">{formatMoney(a.balanceMinor, a.currency)}</td>
                  <td className="p-3 text-slate-400">{a.agingBucket} days</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                      a.status === 'Active recovery' ? 'bg-[#0E9F8E]/20 text-[#0E9F8E] border-[#0E9F8E]/30' :
                      a.status === 'Resolved' ? 'bg-emerald-950 text-emerald-300 border-emerald-800' :
                      'bg-slate-800 text-slate-300 border-slate-700'
                    }`}>{a.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
