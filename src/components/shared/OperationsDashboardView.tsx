'use client';

import React from 'react';
import { LayoutDashboard, Briefcase, Users, ShieldCheck, Zap, ArrowUpRight, AlertTriangle } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { formatMoney } from '@/lib/mock-data';

export function OperationsDashboardView({ onNavigate }: { onNavigate?: (view: string) => void }) {
  const accounts = useAppStore((s) => s.accounts);
  const portfolios = useAppStore((s) => s.portfolios);

  const activeAccounts = accounts.length;
  const intakePortfolio = portfolios.find(p => p.status === 'Pending validation');

  const teams = [
    { name: 'Accra Team Alpha', officer: 'Ama Darko', assigned: 38, capacity: 80 },
    { name: 'Accra Team Beta', officer: 'Kwesi Appiah', assigned: 42, capacity: 80 },
    { name: 'Nairobi Team', officer: 'Grace Wambui', assigned: 31, capacity: 60 },
    { name: 'London Team', officer: 'Hannah Clarke', assigned: 24, capacity: 40 },
  ];

  const slaRows = [
    { client: 'Volta Telecom Ghana', metric: 'First contact ≤ 3 days', target: '95%', actual: '96%', status: 'On track' },
    { client: 'Savannah Commercial Bank', metric: 'Settlement response ≤ 5 days', target: '90%', actual: '88%', status: 'At risk' },
    { client: 'Nairobi Power & Light', metric: 'First contact ≤ 3 days', target: '95%', actual: '92%', status: 'At risk' },
    { client: 'Thames Valley Energy', metric: 'First contact ≤ 5 days', target: '90%', actual: '98%', status: 'On track' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <LayoutDashboard className="w-6 h-6 text-[#0E9F8E]" />
          Operations Dashboard
        </h1>
        <p className="text-xs text-slate-400">Portfolio allocation, team productivity, and operational health.</p>
      </div>

      {/* KPI Tiles */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { label: 'Active Accounts', value: activeAccounts.toLocaleString(), nav: 'portfolio_allocation', icon: Briefcase, color: 'text-[#0E9F8E]', bg: 'bg-[#0E9F8E]/10' },
          { label: 'Contact Rate Today', value: '74%', nav: 'teams_productivity', icon: Users, color: 'text-sky-400', bg: 'bg-sky-950/40' },
          { label: 'Promises Due Today', value: '31', nav: 'team_accounts', icon: AlertTriangle, color: 'text-amber-400', bg: 'bg-amber-950/40' },
          { label: 'Escalations Open', value: '7', nav: 'escalations', icon: AlertTriangle, color: 'text-rose-400', bg: 'bg-rose-950/40' },
          { label: 'File Quality Score', value: '91%', nav: 'quality_assurance', icon: ShieldCheck, color: 'text-emerald-400', bg: 'bg-emerald-950/40' },
          { label: 'Intake Exceptions', value: '53', nav: 'portfolio_allocation', icon: Zap, color: 'text-amber-400', bg: 'bg-amber-950/40' },
        ].map(tile => (
          <div
            key={tile.label}
            onClick={() => onNavigate?.(tile.nav)}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-9 h-9 rounded-xl ${tile.bg} flex items-center justify-center`}>
                <tile.icon className={`w-4 h-4 ${tile.color}`} />
              </div>
              <span className="text-xs font-semibold text-slate-400 group-hover:text-white transition-colors">{tile.label}</span>
            </div>
            <div className="text-2xl font-extrabold text-white font-mono">{tile.value}</div>
          </div>
        ))}
      </div>

      {/* Workload by Team */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-bold text-white">Workload by Team</h3>
          <button onClick={() => onNavigate?.('teams_productivity')} className="text-xs text-[#0E9F8E] hover:underline font-semibold">View Details →</button>
        </div>
        <div className="space-y-4">
          {teams.map(team => {
            const pct = Math.round((team.assigned / team.capacity) * 100);
            const over = pct > 100;
            return (
              <div key={team.name} className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-200">{team.name} <span className="text-slate-500">({team.officer})</span></span>
                  <span className={`font-mono font-bold ${over ? 'text-rose-400' : 'text-slate-400'}`}>{team.assigned}/{team.capacity} ({pct}%)</span>
                </div>
                <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-2 rounded-full transition-all ${over ? 'bg-rose-500' : 'bg-[#0E9F8E]'}`}
                    style={{ width: `${Math.min(100, pct)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SLA Tracker */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h3 className="text-sm font-bold text-white mb-4">SLA Tracker</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800">
              <tr>
                <th className="p-3">Client</th>
                <th className="p-3">SLA Metric</th>
                <th className="p-3">Target</th>
                <th className="p-3">Actual</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {slaRows.map(row => (
                <tr key={row.client} className="hover:bg-slate-800/50">
                  <td className="p-3 font-semibold text-white">{row.client}</td>
                  <td className="p-3">{row.metric}</td>
                  <td className="p-3 font-mono">{row.target}</td>
                  <td className="p-3 font-mono font-bold text-white">{row.actual}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                      row.status === 'On track' ? 'bg-emerald-950 text-emerald-300 border-emerald-800' : 'bg-amber-950 text-amber-300 border-amber-800'
                    }`}>{row.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Intake alert */}
      {intakePortfolio && (
        <div className="bg-amber-950/30 border border-amber-800/50 rounded-2xl p-5 flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="text-sm font-bold text-amber-300">Portfolio Intake Requires Attention</div>
            <div className="text-xs text-amber-400">{intakePortfolio.name} — 53 exceptions pending review before accounts can enter recovery.</div>
          </div>
          <button
            onClick={() => onNavigate?.('portfolio_allocation')}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold rounded-xl text-xs whitespace-nowrap"
          >
            Review Intake
          </button>
        </div>
      )}
    </div>
  );
}
