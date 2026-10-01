'use client';

import React, { useState } from 'react';
import { LayoutDashboard, Phone, MessageSquare, WifiOff, Clock } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { formatMoney } from '@/lib/mock-data';

export function MyQueueView({ onNavigate }: { onNavigate?: (view: string) => void }) {
  const isOffline = useAppStore((s) => s.isOffline);
  const [searchQ, setSearchQ] = useState('');
  const [sortBy, setSortBy] = useState('Priority');

  const queue = [
    { id: 'ACC-100231', name: 'Kofi Mensah', balance: 1845000, currency: 'GHS', aging: '91–180', status: 'Disputed', risk: 'Medium' as const, reason: 'Broken promise', pop: 38 },
    { id: 'ACC-100232', name: 'Adwoa Trading Ltd', balance: 14280000, currency: 'GHS', aging: '61–90', status: 'Promise / Payment plan', risk: 'Low' as const, reason: 'Payment plan active', pop: 72 },
    { id: 'ACC-100255', name: 'Kumasi Fresh Foods Ltd', balance: 6400000, currency: 'GHS', aging: '91–180', status: 'Settlement', risk: 'Medium' as const, reason: 'Settlement pending manager', pop: 65 },
    { id: 'ACC-100290', name: 'Asante & Sons Traders', balance: 10800000, currency: 'GHS', aging: '365+', status: 'Write-off pending', risk: 'High' as const, reason: 'Write-off pending', pop: 12 },
    { id: 'ACC-100377', name: 'Yaw Boateng Logistics Ltd', balance: 48620000, currency: 'GHS', aging: '181–365', status: 'Active recovery', risk: 'High' as const, reason: 'High risk · new assignment', pop: 78 },
  ];

  const filtered = queue.filter(a =>
    !searchQ || a.name.toLowerCase().includes(searchQ.toLowerCase()) || a.id.toLowerCase().includes(searchQ.toLowerCase())
  );

  const tasks = [
    { id: 'TSK-1', text: 'Call Kofi Mensah — promise follow-up', due: '10:00', done: false },
    { id: 'TSK-2', text: 'Send plan reminder to Adwoa Trading', due: '12:00', done: false },
    { id: 'TSK-3', text: 'Collect proof of debt for ACC-100377', due: '16:00', done: false },
  ];

  return (
    <div className="space-y-6">
      {isOffline && (
        <div className="bg-amber-950/60 border border-amber-700 rounded-xl px-4 py-2.5 text-xs font-semibold text-amber-200 flex items-center gap-2">
          <WifiOff className="w-4 h-4" />
          Offline — changes saved on this device (encrypted). Contact logs show Pending sync chip.
        </div>
      )}

      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <LayoutDashboard className="w-6 h-6 text-[#0E9F8E]" />
            My Queue · <span className="text-[#0E9F8E]">{filtered.length} accounts</span>
          </h1>
          <p className="text-xs text-slate-400">Sorted by priority · AI-assisted, you can re-sort</p>
        </div>
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          className="bg-slate-900 border border-slate-700 text-slate-200 text-xs font-semibold rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#0E9F8E]"
        >
          <option>Priority</option>
          <option>Balance</option>
          <option>Aging</option>
          <option>Next action</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Queue List */}
        <div className="lg:col-span-3 space-y-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search queue…"
              value={searchQ}
              onChange={e => setSearchQ(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-4 pr-4 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#0E9F8E]"
            />
          </div>

          {filtered.map(acc => (
            <div
              key={acc.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-4 hover:border-[#0E9F8E]/40 transition-all group"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-white text-sm">{acc.name}</span>
                    <span className="text-[10px] font-mono text-slate-500">{acc.id}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      acc.risk === 'High' ? 'bg-rose-950 text-rose-300 border border-rose-800' :
                      acc.risk === 'Medium' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                      'bg-slate-800 text-slate-300 border border-slate-700'
                    }`}>{acc.risk} Risk</span>
                    {isOffline && <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-950 text-amber-300">Pending sync</span>}
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
                    <span className="font-mono font-bold text-slate-200">{formatMoney(acc.balance, acc.currency)}</span>
                    <span>·</span>
                    <span>{acc.aging} days</span>
                    <span>·</span>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                      acc.reason === 'Broken promise' ? 'bg-rose-950 text-rose-300' :
                      acc.reason.includes('High risk') ? 'bg-rose-950 text-rose-300' :
                      'bg-slate-800 text-slate-300'
                    }`}>{acc.reason}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="text-[10px] text-slate-500">Probability of payment:</div>
                    <div className="flex-1 max-w-[80px] bg-slate-950 rounded-full h-1.5 overflow-hidden">
                      <div className={`h-1.5 rounded-full ${acc.pop >= 65 ? 'bg-[#0E9F8E]' : acc.pop >= 40 ? 'bg-amber-500' : 'bg-rose-500'}`} style={{ width: `${acc.pop}%` }} />
                    </div>
                    <span className={`text-[10px] font-bold font-mono ${acc.pop >= 65 ? 'text-[#0E9F8E]' : acc.pop >= 40 ? 'text-amber-400' : 'text-rose-400'}`}>{acc.pop}%</span>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 shrink-0">
                  <button
                    onClick={() => onNavigate?.('account_detail')}
                    className="px-3 py-1.5 bg-[#0E9F8E] hover:bg-[#0c8879] text-white font-bold text-xs rounded-xl transition-colors"
                  >Open</button>
                  <div className="flex gap-1">
                    <button
                      onClick={() => onNavigate?.('account_detail')}
                      title="Log contact — Call"
                      className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                    </button>
                    <button
                      title="Send SMS"
                      className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Rail: Today */}
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
            <h3 className="text-sm font-bold text-white mb-3">Today&apos;s Tasks</h3>
            <div className="space-y-2">
              {tasks.map(t => (
                <label key={t.id} className="flex items-start gap-2.5 text-xs cursor-pointer group">
                  <input type="checkbox" className="mt-0.5 accent-[#0E9F8E]" />
                  <div>
                    <div className="text-slate-200 group-hover:text-white">{t.text}</div>
                    <div className="text-slate-500 text-[10px] flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3" /> {t.due}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
            <h3 className="text-sm font-bold text-white mb-3">Promises Due Today</h3>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                <div className="font-semibold text-white">Kofi Mensah</div>
                <div className="text-slate-400">GHS 5,000.00 · Broken <span className="text-rose-400 font-bold">(past due)</span></div>
                <button className="mt-1.5 text-[10px] text-[#0E9F8E] font-bold hover:underline">Call now</button>
              </div>
              <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                <div className="font-semibold text-white">Oliver Hargreaves</div>
                <div className="text-slate-400">GBP 120.00 · Due today</div>
                <button className="mt-1.5 text-[10px] text-[#0E9F8E] font-bold hover:underline">Call now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
