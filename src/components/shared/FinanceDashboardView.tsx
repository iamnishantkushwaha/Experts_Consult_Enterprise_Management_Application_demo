'use client';

import React from 'react';
import { LayoutDashboard, Wallet, TrendingUp, DollarSign, ArrowUpRight } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { formatMoney } from '@/lib/mock-data';

export function FinanceDashboardView({ onNavigate }: { onNavigate?: (view: string) => void }) {
  const payments = useAppStore((s) => s.payments);
  const remittances = useAppStore((s) => s.remittances);
  const approvals = useAppStore((s) => s.approvals);

  const _totalCashReceived = payments.reduce((acc, p) => acc + (p.amountMinor / 100), 0); // Mock value logic
  const allocatedPct = 92;
  const _unreconciledFunds = payments.filter(p => p.status === 'Unmatched' || p.status === 'Exception').reduce((acc, p) => acc + p.amountMinor, 0);
  
  const awaitingRemittances = remittances.filter(r => r.status === 'Pending approval').length;
  
  const pendingApprovals = approvals.filter(a => a.decision === 'Pending' && a.approverRole === 'CFO / Finance').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <LayoutDashboard className="w-6 h-6 text-[#0E9F8E]" />
            Finance Dashboard
          </h1>
          <p className="text-xs text-slate-400">Reconciliation, payments, remittances, and fee revenue.</p>
        </div>
        <select className="bg-slate-900 border border-slate-700 text-slate-200 text-xs font-semibold rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#0E9F8E]">
          <option>Today</option>
          <option>Month to Date</option>
          <option>Quarter to Date</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Cash Received */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-colors cursor-pointer group">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-[#0E9F8E]/20 flex items-center justify-center text-[#0E9F8E]">
              <DollarSign className="w-5 h-5" />
            </div>
            <span className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors">Cash Received (Period)</span>
          </div>
          <div className="text-3xl font-extrabold text-white font-mono">USD 214.6K</div>
        </div>

        {/* Allocated */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-colors cursor-pointer group">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400">
              <TrendingUp className="w-5 h-5" />
            </div>
            <span className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors">Allocated</span>
          </div>
          <div className="text-3xl font-extrabold text-white font-mono">{allocatedPct}%</div>
        </div>

        {/* Unreconciled */}
        <div className="bg-slate-900 border border-rose-900/50 rounded-2xl p-5 hover:border-rose-700 transition-colors cursor-pointer group">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-rose-950/50 flex items-center justify-center text-rose-500">
              <Wallet className="w-5 h-5" />
            </div>
            <span className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors">Unreconciled Funds</span>
          </div>
          <div className="text-3xl font-extrabold text-rose-500 font-mono">USD 9.0K</div>
        </div>

        {/* Remittances */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-colors cursor-pointer group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors">Remittances Awaiting</span>
            <ArrowUpRight className="w-4 h-4 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="text-3xl font-extrabold text-white font-mono">{awaitingRemittances}</div>
        </div>

        {/* Fees Earned */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-colors cursor-pointer group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors">Fees Earned (MTD)</span>
            <ArrowUpRight className="w-4 h-4 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="text-3xl font-extrabold text-white font-mono">USD 41.8K</div>
        </div>

        {/* Approvals pending */}
        <div 
          onClick={() => onNavigate?.('approvals')}
          className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-colors cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors">Pending Approvals</span>
            <ArrowUpRight className="w-4 h-4 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="text-3xl font-extrabold text-white font-mono">{pendingApprovals}</div>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h3 className="text-sm font-bold text-white mb-4">Exceptions Mini-list</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
             <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800">
               <tr>
                 <th className="p-3">Payment Ref</th>
                 <th className="p-3">Received Date</th>
                 <th className="p-3">Amount</th>
                 <th className="p-3">Status</th>
                 <th className="p-3">Exception Reason</th>
                 <th className="p-3 text-right">Action</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-slate-800">
               {payments.filter(p => p.status === 'Unmatched' || p.status === 'Exception').slice(0, 5).map(p => (
                 <tr key={p.id} className="hover:bg-slate-800/50">
                    <td className="p-3 font-mono font-bold text-white">{p.reference}</td>
                    <td className="p-3 font-mono">{p.receivedDate}</td>
                    <td className="p-3 font-mono font-bold text-white">{formatMoney(p.amountMinor, p.currency)}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-950 text-rose-300 border border-rose-800">
                        {p.status}
                      </span>
                    </td>
                    <td className="p-3 text-rose-300">{p.exceptionReason}</td>
                    <td className="p-3 text-right">
                       <button className="text-[#0E9F8E] hover:underline font-semibold text-xs">Resolve</button>
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
