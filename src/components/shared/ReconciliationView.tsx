'use client';

import React, { useState } from 'react';
import { RefreshCw, ArrowRight } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { formatMoney } from '@/lib/mock-data';
import { STT } from '../common/STT';

export function ReconciliationView({ onNavigate }: { onNavigate?: (view: string, data?: Record<string, unknown>) => void }) {
  const payments = useAppStore((s) => s.payments);
  const accounts = useAppStore((s) => s.accounts);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'unmatched' | 'matched'>('unmatched');

  const unmatched = payments.filter(p => p.status === 'Unmatched' || p.status === 'Exception');
  const matched = payments.filter(p => p.status === 'Allocated' || p.status === 'Matching');

  const filtered = (activeTab === 'unmatched' ? unmatched : matched).filter(p => 
    p.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.payerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <RefreshCw className="w-6 h-6 text-[#2563EB]" />
            Payment Reconciliation Queue
          </h1>
          <p className="text-xs text-slate-600">Match unallocated bank receipts, resolve exceptions, and enforce double-entry ledger integrity.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-6 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('unmatched')}
          className={`pb-3 border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'unmatched' ? 'border-[#2563EB] text-[#2563EB]' : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>Unmatched Exceptions Queue</span>
          <span className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 text-[10px]">{unmatched.length}</span>
        </button>
        <button
          onClick={() => setActiveTab('matched')}
          className={`pb-3 border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'matched' ? 'border-[#2563EB] text-[#2563EB]' : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>Matched &amp; Allocated</span>
          <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px]">{matched.length}</span>
        </button>
      </div>

      <STT
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        pageName="Reconciliation Payments"
        totalRows={filtered.length}
      />

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xl">
        <table className="w-full text-left text-xs text-slate-700">
          <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
            <tr>
              <th className="p-3.5">Payment Ref</th>
              <th className="p-3.5">Payer / Source</th>
              <th className="p-3.5 text-right">Amount</th>
              <th className="p-3.5">Received Date</th>
              <th className="p-3.5">Exception / Details</th>
              <th className="p-3.5">Suggested Match</th>
              <th className="p-3.5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {filtered.map(p => {
              const suggestedAccount = accounts.find(a => a.debtorName.toLowerCase().includes(p.payerName.toLowerCase()) || a.id === p.reference);
              return (
                <tr key={p.id} className="hover:bg-slate-100/50 transition-colors">
                  <td className="p-3.5 font-mono font-bold text-slate-900">{p.reference}</td>
                  <td className="p-3.5">
                    <div className="font-semibold text-slate-800">{p.payerName}</div>
                    <div className="text-[10px] text-slate-500 font-mono">{p.source}</div>
                  </td>
                  <td className="p-3.5 text-right font-mono font-bold text-slate-900">{formatMoney(p.amountMinor, p.currency)}</td>
                  <td className="p-3.5 font-mono text-slate-600">{p.receivedDate}</td>
                  <td className="p-3.5 text-rose-700">{p.exceptionReason || 'Ref mismatch'}</td>
                  <td className="p-3.5">
                    {suggestedAccount ? (
                      <div className="text-xs">
                        <span className="font-semibold text-slate-900">{suggestedAccount.debtorName}</span>
                        <span className="font-mono text-[#2563EB] ml-1">({suggestedAccount.id})</span>
                      </div>
                    ) : (
                      <span className="text-slate-500 font-mono">No auto-match</span>
                    )}
                  </td>
                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => onNavigate?.('account_detail', { id: suggestedAccount?.id || accounts[0]?.id })}
                      className="px-3 py-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold rounded-xl text-xs transition-colors inline-flex items-center gap-1"
                    >
                      Match Account
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
