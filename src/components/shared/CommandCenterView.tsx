'use client';

import React from 'react';
import { 
  LayoutDashboard, 
  TrendingUp, 
  AlertTriangle, 
  ShieldAlert, 
  Wallet, 
  ArrowUpRight 
} from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { formatMoney } from '@/lib/mock-data';

export function CommandCenterView({ onNavigate }: { onNavigate?: (view: string) => void }) {
  const portfolios = useAppStore((s) => s.portfolios);
  const accounts = useAppStore((s) => s.accounts);
  
  const totalAssignedUSD = portfolios.filter(p => p.status === 'Active').reduce((acc, p) => acc + (p.assignedUSD * 100), 0);
  const totalRecoveredUSD = portfolios.filter(p => p.status === 'Active').reduce((acc, p) => acc + (p.recoveredUSD * 100), 0);
  const recoveryRate = (totalRecoveredUSD / (totalAssignedUSD || 1)) * 100;
  
  const _disputedAccounts = accounts.filter(a => a.status === 'Disputed');
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <LayoutDashboard className="w-6 h-6 text-[#2563EB]" />
            Executive Command Center
          </h1>
          <p className="text-xs text-slate-600">Global recovery performance, risk, and cash at a glance.</p>
        </div>
        <div className="flex items-center gap-2">
           <select className="bg-white border border-slate-300 text-slate-800 text-xs font-semibold rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#2563EB]">
              <option>Last 30 Days</option>
              <option>Year to Date</option>
              <option>All Time</option>
           </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Debt Assigned */}
        <div 
          onClick={() => onNavigate?.('clients_portfolios')}
          className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-slate-300 transition-colors cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
             <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600">
                 <Wallet className="w-5 h-5" />
               </div>
               <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900 transition-colors">Debt Assigned (Active)</span>
             </div>
             <ArrowUpRight className="w-4 h-4 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 font-mono">{formatMoney(totalAssignedUSD, 'USD')}</div>
        </div>

        {/* Cash Recovered */}
        <div 
          onClick={() => onNavigate?.('reports')}
          className="bg-white border border-[#2563EB]/40 rounded-2xl p-5 hover:border-[#2563EB] transition-colors cursor-pointer shadow-lg shadow-[#2563EB]/5 group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#2563EB]/20 flex items-center justify-center text-[#2563EB]">
                <TrendingUp className="w-5 h-5" />
              </div>
              <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900 transition-colors">Cash Recovered</span>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-600">↑ 4.2%</span>
          </div>
          <div className="text-3xl font-extrabold text-[#2563EB] font-mono">{formatMoney(totalRecoveredUSD, 'USD')}</div>
        </div>

        {/* Recovery Rate */}
        <div 
          onClick={() => onNavigate?.('country_performance')}
          className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-slate-300 transition-colors cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
             <div className="flex items-center gap-3">
               <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900 transition-colors">Recovery Rate</span>
             </div>
             <ArrowUpRight className="w-4 h-4 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 font-mono">{recoveryRate.toFixed(1)}%</div>
        </div>
        
        {/* PTP Kept */}
        <div 
          onClick={() => onNavigate?.('reports')}
          className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-slate-300 transition-colors cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
             <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900 transition-colors">Promise-to-Pay Kept</span>
             <ArrowUpRight className="w-4 h-4 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 font-mono">61%</div>
        </div>

        {/* Disputed Balance */}
        <div 
          onClick={() => onNavigate?.('risk_summary')}
          className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-slate-300 transition-colors cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
             <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-xl bg-amber-50/50 flex items-center justify-center text-amber-500">
                 <AlertTriangle className="w-5 h-5" />
               </div>
               <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900 transition-colors">Disputed Balance</span>
             </div>
             <ArrowUpRight className="w-4 h-4 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="text-3xl font-extrabold text-amber-500 font-mono">USD 148.2K</div>
        </div>

        {/* Unreconciled Funds */}
        <div 
          className="bg-white border border-rose-900/50 rounded-2xl p-5 hover:border-rose-700 transition-colors cursor-pointer group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-2 h-2 bg-rose-500 rounded-full m-4 animate-pulse"></div>
          <div className="flex items-center gap-3 mb-3">
             <div className="w-10 h-10 rounded-xl bg-rose-50/50 flex items-center justify-center text-rose-500">
               <ShieldAlert className="w-5 h-5" />
             </div>
             <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900 transition-colors">Unreconciled Funds</span>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 font-mono">USD 9.0K</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <h3 className="text-sm font-bold text-slate-900 mb-4">Top Clients by Recovery</h3>
          <div className="space-y-4">
             {portfolios.slice(0, 4).map(p => (
               <div key={p.id} className="space-y-1">
                 <div className="flex justify-between text-xs">
                   <span className="font-semibold text-slate-800">{p.clientName}</span>
                   <span className="text-slate-600 font-mono">{formatMoney(p.recoveredUSD * 100, 'USD')}</span>
                 </div>
                 <div className="w-full bg-slate-50 rounded-full h-1.5 overflow-hidden">
                   <div 
                     className="bg-[#2563EB] h-1.5 rounded-full" 
                     style={{ width: `${Math.min(100, (p.recoveredUSD / 50000) * 100)}%` }}
                   ></div>
                 </div>
               </div>
             ))}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-4">
             <h3 className="text-sm font-bold text-slate-900">Active Alerts</h3>
             <span className="px-2 py-0.5 bg-rose-50 text-rose-600 rounded text-[10px] font-bold">6 Action Required</span>
          </div>
          <div className="space-y-2">
             <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs flex justify-between group">
               <span className="text-slate-700">WO-0031 write-off USD 7,200 awaits your approval</span>
               <button onClick={() => onNavigate?.('approvals')} className="text-[#2563EB] font-semibold opacity-0 group-hover:opacity-100 transition-opacity">Review</button>
             </div>
             <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs flex justify-between group">
               <span className="text-slate-700">Unreconciled funds: 5 receipts</span>
               <button className="text-[#2563EB] font-semibold opacity-0 group-hover:opacity-100 transition-opacity">Review</button>
             </div>
             <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs flex justify-between group">
               <span className="text-slate-700">CMP-0190 high-severity complaint</span>
               <button onClick={() => onNavigate?.('risk_summary')} className="text-[#2563EB] font-semibold opacity-0 group-hover:opacity-100 transition-opacity">Review</button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
