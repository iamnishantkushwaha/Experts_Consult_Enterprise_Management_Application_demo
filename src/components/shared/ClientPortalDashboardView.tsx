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
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <LayoutDashboard className="w-6 h-6 text-[#2563EB]" />
          Portfolio Dashboard
        </h1>
        <p className="text-xs text-slate-600">{clientName} — Client portal. Your data only.</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {clientPortfolios.map(p => (
          <div key={p.id} className="bg-white border border-slate-200 rounded-2xl p-5">
            <div className="text-[10px] font-bold text-[#2563EB] uppercase tracking-wider mb-1">{p.id}</div>
            <div className="text-sm font-bold text-slate-900 mb-3">{p.name}</div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-600">Assigned</span>
                <span className="font-mono font-bold text-slate-900">{formatMoney(p.assignedMinor, p.currency)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Recovered</span>
                <span className="font-mono font-bold text-[#2563EB]">{formatMoney(p.recoveredMinor, p.currency)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Rate</span>
                <span className="font-mono font-bold text-slate-900">{p.recoveryRatePct?.toFixed(1) ?? '—'}%</span>
              </div>
              <div className="w-full bg-slate-50 rounded-full h-1.5 overflow-hidden">
                <div className="bg-[#2563EB] h-1.5 rounded-full" style={{ width: `${Math.min(100, p.recoveryRatePct ?? 0)}%` }} />
              </div>
            </div>
            <div className="mt-3">
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${p.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>{p.status}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Settlement Approvals */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold text-slate-900">Settlement Approvals</h3>
            <button onClick={() => onNavigate?.('settlement_approvals')} className="text-xs text-[#2563EB] hover:underline">View all →</button>
          </div>
          {pendingSettlements.length === 0 ? (
            <div className="text-center py-8 text-slate-500 text-xs">No settlements awaiting your approval.</div>
          ) : (
            <div className="space-y-3">
              {pendingSettlements.map(s => (
                <div key={s.id} className="p-3.5 bg-slate-50 border border-amber-200/40 rounded-xl space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-xs font-bold text-slate-900">{s.debtorName}</div>
                      <div className="text-[11px] text-slate-600">{s.id} · {s.discountPct}% discount</div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700">Pending Client</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 py-1.5 bg-[#2563EB] text-white text-[11px] font-bold rounded-lg">Approve</button>
                    <button className="flex-1 py-1.5 bg-slate-100 text-slate-700 text-[11px] font-bold rounded-lg">Reject</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Remittance Statements */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold text-slate-900">Remittance Statements</h3>
            <button onClick={() => onNavigate?.('remittances')} className="text-xs text-[#2563EB] hover:underline">View all →</button>
          </div>
          <div className="space-y-2.5">
            {clientRemittances.map(r => (
              <div key={r.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-slate-900">{r.period}</div>
                  <div className="text-[11px] font-mono text-slate-600">Net: {formatMoney(r.netMinor, r.currency)}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    r.status === 'Remitted' ? 'bg-emerald-50 text-emerald-700' :
                    r.status === 'Blocked' ? 'bg-rose-50 text-rose-700' :
                    'bg-amber-50 text-amber-700'
                  }`}>{r.status}</span>
                  {r.status === 'Remitted' && (
                    <button className="text-[#2563EB] text-[10px] font-bold hover:underline">Download</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Accounts Table */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-bold text-slate-900">Accounts ({clientAccounts.length})</h3>
          <button onClick={() => onNavigate?.('accounts')} className="text-xs text-[#2563EB] hover:underline">View all →</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3">Account</th>
                <th className="p-3">Debtor</th>
                <th className="p-3">Balance</th>
                <th className="p-3">Aging</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {clientAccounts.slice(0, 8).map(a => (
                <tr key={a.id} className="hover:bg-slate-100/50">
                  <td className="p-3 font-mono font-bold text-[#2563EB]">{a.id}</td>
                  <td className="p-3 font-semibold text-slate-900">{a.debtorName}</td>
                  <td className="p-3 font-mono font-bold text-slate-900">{formatMoney(a.balanceMinor, a.currency)}</td>
                  <td className="p-3 text-slate-600">{a.agingBucket} days</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                      a.status === 'Active recovery' ? 'bg-[#2563EB]/20 text-[#2563EB] border-[#2563EB]/30' :
                      a.status === 'Resolved' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                      'bg-slate-100 text-slate-700 border-slate-300'
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
