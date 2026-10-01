'use client';

import React from 'react';
import { CheckSquare } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { formatMoney } from '@/lib/mock-data';

export function PromisesPlansView({ onNavigate }: { onNavigate?: (view: string) => void }) {
  const accounts = useAppStore((s) => s.accounts);
  const ptpAccounts = accounts.filter(a => a.status.toLowerCase().includes('promise') || a.status.toLowerCase().includes('plan') || a.status.toLowerCase().includes('disputed'));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <CheckSquare className="w-6 h-6 text-[#0E9F8E]" />
          Promises to Pay &amp; Active Payment Plans
        </h1>
        <p className="text-xs text-slate-400">Track promise compliance rates, installment schedules, and broken promise follow-ups.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <div className="text-xs text-slate-400 font-semibold mb-1">Promises Due Today</div>
          <div className="text-2xl font-extrabold text-[#0E9F8E] font-mono">2</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <div className="text-xs text-slate-400 font-semibold mb-1">PTP Kept Rate (Personal)</div>
          <div className="text-2xl font-extrabold text-white font-mono">68.5%</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <div className="text-xs text-slate-400 font-semibold mb-1">Broken Promises</div>
          <div className="text-2xl font-extrabold text-rose-400 font-mono">1</div>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl p-6">
        <h3 className="text-sm font-bold text-white mb-4">Active Payment Commitments</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800">
              <tr>
                <th className="p-3">Debtor</th>
                <th className="p-3">Account #</th>
                <th className="p-3">Commitment Type</th>
                <th className="p-3 text-right">Promised Amount</th>
                <th className="p-3">Due Date</th>
                <th className="p-3 text-center">Status</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {ptpAccounts.map(a => (
                <tr key={a.id} className="hover:bg-slate-800/50">
                  <td className="p-3 font-semibold text-white">{a.debtorName}</td>
                  <td className="p-3 font-mono text-[#0E9F8E]">{a.accountNumber}</td>
                  <td className="p-3 text-slate-300">{a.status}</td>
                  <td className="p-3 text-right font-mono font-bold text-white">{formatMoney(a.balanceMinor, a.currency)}</td>
                  <td className="p-3 font-mono text-slate-400">2026-10-01</td>
                  <td className="p-3 text-center">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-950 text-amber-300 border border-amber-800">
                      Pending Payment
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button onClick={() => onNavigate?.('account_detail', { id: a.id })} className="text-[#0E9F8E] hover:underline font-semibold">
                      Open Account →
                    </button>
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
