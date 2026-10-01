'use client';

import React from 'react';
import { DollarSign } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { formatMoney } from '@/lib/mock-data';

export function FeesBillingView({ onNavigate }: { onNavigate?: (view: string) => void }) {
  const portfolios = useAppStore((s) => s.portfolios);
  const remittances = useAppStore((s) => s.remittances);

  const totalFeesEarned = remittances.reduce((acc, r) => acc + (r.feesMinor || 0), 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <DollarSign className="w-6 h-6 text-[#2563EB]" />
          Fees &amp; Client Billing
        </h1>
        <p className="text-xs text-slate-600">Contingency fee engine, success commission rates, and client invoice schedules.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <div className="text-xs text-slate-600 font-semibold mb-1">Total Fee Revenue (MTD)</div>
          <div className="text-2xl font-extrabold text-[#2563EB] font-mono">USD 41,850</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <div className="text-xs text-slate-600 font-semibold mb-1">Avg Commission Rate</div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono">18.5%</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <div className="text-xs text-slate-600 font-semibold mb-1">Pending Invoices</div>
          <div className="text-2xl font-extrabold text-amber-600 font-mono">3</div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xl p-6">
        <h3 className="text-sm font-bold text-slate-900 mb-4">Fee Structure by Client Portfolio</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3">Client</th>
                <th className="p-3">Portfolio</th>
                <th className="p-3 text-right">Fee Rate</th>
                <th className="p-3 text-right">Recovered Volume</th>
                <th className="p-3 text-right">Fees Earned</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {portfolios.map(p => (
                <tr key={p.id} className="hover:bg-slate-100/50">
                  <td className="p-3 font-semibold text-slate-900">{p.clientName}</td>
                  <td className="p-3 font-mono text-slate-700">{p.name}</td>
                  <td className="p-3 text-right font-mono font-bold text-[#2563EB]">18%</td>
                  <td className="p-3 text-right font-mono text-slate-900">{formatMoney(p.recoveredUSD * 100, 'USD')}</td>
                  <td className="p-3 text-right font-mono font-bold text-emerald-600">{formatMoney((p.recoveredUSD * 100) * 0.18, 'USD')}</td>
                  <td className="p-3 text-right">
                    <button onClick={() => onNavigate?.('reports')} className="text-[#2563EB] font-semibold hover:underline">
                      Statement →
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
