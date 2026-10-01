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
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Send className="w-6 h-6 text-[#2563EB]" />
          Client Remittance Statements
        </h1>
        <p className="text-xs text-slate-600">Net payout statements generated for clients after fee retention deductions.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xl">
        <table className="w-full text-left text-xs text-slate-700">
          <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
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
          <tbody className="divide-y divide-slate-200">
            {remittances.map(r => (
              <tr key={r.id} className="hover:bg-slate-100/50">
                <td className="p-3.5 font-mono font-bold text-slate-900">{r.id}</td>
                <td className="p-3.5 font-semibold text-slate-800">{r.clientName}</td>
                <td className="p-3.5 text-right font-mono font-bold text-slate-900">{formatMoney(r.recoveredMinor, r.currency)}</td>
                <td className="p-3.5 text-right font-mono text-amber-600">-{formatMoney(r.feesMinor, r.currency)}</td>
                <td className="p-3.5 text-right font-mono font-bold text-[#2563EB]">{formatMoney(r.netMinor, r.currency)}</td>
                <td className="p-3.5 text-center">
                  <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold border ${
                    r.status === 'Remitted' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                    r.status === 'Pending approval' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                    'bg-slate-100 text-slate-600 border-slate-300'
                  }`}>
                    {r.status}
                  </span>
                </td>
                <td className="p-3.5 text-right">
                  {r.status === 'Pending approval' ? (
                    <button onClick={() => onNavigate?.('approvals')} className="px-3 py-1.5 bg-[#2563EB] text-white rounded-xl font-semibold text-xs">
                      Approve Payout
                    </button>
                  ) : (
                    <button onClick={() => onNavigate?.('reports')} className="text-[#2563EB] hover:underline font-semibold text-xs">
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
