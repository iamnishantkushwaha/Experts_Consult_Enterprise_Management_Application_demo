'use client';

import React, { useState } from 'react';
import { Users } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { STT } from '../common/STT';

export function PortfolioAllocationView({ onNavigate }: { onNavigate?: (view: string, data?: Record<string, unknown>) => void }) {
  const accounts = useAppStore((s) => s.accounts);
  const users = useAppStore((s) => s.users);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOfficer, setSelectedOfficer] = useState('');

  const officers = users.filter(u => u.roleTitle.toLowerCase().includes('officer') || u.roleTitle.toLowerCase().includes('collector'));

  const filtered = accounts.filter(a =>
    a.debtorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Users className="w-6 h-6 text-[#2563EB]" />
            Portfolio Allocation Engine
          </h1>
          <p className="text-xs text-slate-600">Automated round-robin distribution, capacity balancing, and manual re-assignment.</p>
        </div>
      </div>

      <STT
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        pageName="Portfolio Allocation"
        totalRows={filtered.length}
      />

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xl p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-bold text-slate-900">Unassigned &amp; Active Portfolio Queue</h3>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-600">Reassign selected to:</span>
            <select
              value={selectedOfficer}
              onChange={(e) => setSelectedOfficer(e.target.value)}
              className="bg-slate-50 border border-slate-300 text-xs text-slate-800 rounded-xl px-3 py-1.5"
            >
              <option value="">Select Officer...</option>
              {officers.map(o => (
                <option key={o.id} value={o.name}>{o.name} ({o.team})</option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3">Account #</th>
                <th className="p-3">Debtor Name</th>
                <th className="p-3">Client</th>
                <th className="p-3 text-right">Balance</th>
                <th className="p-3">Assigned Officer</th>
                <th className="p-3 text-center">Status</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filtered.map(a => (
                <tr key={a.id} className="hover:bg-slate-100/50 font-mono">
                  <td className="p-3 font-bold text-slate-900">{a.id}</td>
                  <td className="p-3 font-sans font-semibold text-slate-800">{a.debtorName}</td>
                  <td className="p-3 font-sans text-slate-600">{a.clientName}</td>
                  <td className="p-3 text-right font-bold text-slate-900">{(a.balanceMinor / 100).toLocaleString()} {a.currency}</td>
                  <td className="p-3 font-sans text-[#2563EB] font-semibold">{a.ownerName || 'Unassigned'}</td>
                  <td className="p-3 text-center font-sans">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-300">
                      {a.status}
                    </span>
                  </td>
                  <td className="p-3 text-right font-sans">
                    <button
                      onClick={() => onNavigate?.('account_detail', { id: a.id })}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-xl text-[11px] font-semibold transition-colors"
                    >
                      Inspect Account
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
