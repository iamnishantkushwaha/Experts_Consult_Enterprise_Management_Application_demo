'use client';

import React from 'react';
import { Briefcase } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { formatMoney } from '@/lib/mock-data';

export function ClientAccountsView({ onNavigate }: { onNavigate?: (view: string, data?: Record<string, unknown>) => void }) {
  const accounts = useAppStore((s) => s.accounts);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <Briefcase className="w-6 h-6 text-[#0E9F8E]" />
          Assigned Portfolio Accounts
        </h1>
        <p className="text-xs text-slate-400">Scoped accounts assigned by Volta Telecom for external recovery management.</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800 font-mono">
              <tr>
                <th className="p-3">Account #</th>
                <th className="p-3">Debtor Name</th>
                <th className="p-3 text-right">Balance</th>
                <th className="p-3 text-center">Aging</th>
                <th className="p-3 text-center">Status</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 font-mono">
              {accounts.map(a => (
                <tr key={a.id} className="hover:bg-slate-800/50">
                  <td className="p-3 font-bold text-[#0E9F8E]">{a.id}</td>
                  <td className="p-3 font-sans font-semibold text-white">{a.debtorName}</td>
                  <td className="p-3 text-right font-bold text-white">{formatMoney(a.balanceMinor, a.currency)}</td>
                  <td className="p-3 text-center text-slate-400">{a.agingBucket}</td>
                  <td className="p-3 text-center font-sans">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
                      {a.status}
                    </span>
                  </td>
                  <td className="p-3 text-right font-sans">
                    <button onClick={() => onNavigate?.('account_detail', { id: a.id })} className="text-[#0E9F8E] hover:underline font-semibold">
                      Details →
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
