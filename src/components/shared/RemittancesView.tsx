'use client';

import React from 'react';
import { Send } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { formatMoney } from '@/lib/mock-data';

export function RemittancesView({ onNavigate }: { onNavigate?: (view: string) => void }) {
  const remittances = useAppStore((s) => s.remittances);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <Send className="w-6 h-6 text-[#0E9F8E]" />
          Client Remittance Statements
        </h1>
        <p className="text-xs text-slate-400">Net payout statements generated for clients after fee retention deductions.</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800">
            <tr>
              <th className="p-3.5">Statement ID</th>
              <th className="p-3.5">Client</th>
              <th className="p-3.5 text-right">Gross Collected</th>
              <th className="p-3.5 text-right">Fee Deduction</th>
              <th className="p-3.5 text-right">Net Remitted</th>
              <th className="p-3.5 text-center">Status</th>
              <th className="p-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {remittances.map(r => (
              <tr key={r.id} className="hover:bg-slate-800/50">
                <td className="p-3.5 font-mono font-bold text-white">{r.id}</td>
                <td className="p-3.5 font-semibold text-slate-200">{r.clientName}</td>
                <td className="p-3.5 text-right font-mono font-bold text-white">{formatMoney(r.recoveredMinor, r.currency)}</td>
                <td className="p-3.5 text-right font-mono text-amber-400">-{formatMoney(r.feesMinor, r.currency)}</td>
                <td className="p-3.5 text-right font-mono font-bold text-[#0E9F8E]">{formatMoney(r.netMinor, r.currency)}</td>
                <td className="p-3.5 text-center">
                  <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold border ${
                    r.status === 'Remitted' ? 'bg-emerald-950 text-emerald-300 border-emerald-800' :
                    r.status === 'Pending approval' ? 'bg-amber-950 text-amber-300 border-amber-800' :
                    'bg-slate-800 text-slate-400 border-slate-700'
                  }`}>
                    {r.status}
                  </span>
                </td>
                <td className="p-3.5 text-right">
                  {r.status === 'Pending approval' ? (
                    <button onClick={() => onNavigate?.('approvals')} className="px-3 py-1.5 bg-[#0E9F8E] text-white rounded-xl font-semibold text-xs">
                      Approve Payout
                    </button>
                  ) : (
                    <button onClick={() => onNavigate?.('reports')} className="text-[#0E9F8E] hover:underline font-semibold text-xs">
                      View Advice
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
