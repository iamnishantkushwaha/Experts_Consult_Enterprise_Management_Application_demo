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
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <LayoutDashboard className="w-6 h-6 text-[#2563EB]" />
          Operations Dashboard
        </h1>
        <p className="text-xs text-slate-600">Portfolio allocation, team productivity, and operational health.</p>
      </div>

      {/* KPI Tiles */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { label: 'Active Accounts', value: activeAccounts.toLocaleString(), nav: 'portfolio_allocation', icon: Briefcase, color: 'text-[#2563EB]', bg: 'bg-[#2563EB]/10' },
          { label: 'Contact Rate Today', value: '74%', nav: 'teams_productivity', icon: Users, color: 'text-sky-600', bg: 'bg-sky-50/40' },
          { label: 'Promises Due Today', value: '31', nav: 'team_accounts', icon: AlertTriangle, color: 'text-amber-600', bg: 'bg-amber-50/40' },
          { label: 'Escalations Open', value: '7', nav: 'escalations', icon: AlertTriangle, color: 'text-rose-600', bg: 'bg-rose-50/40' },
          { label: 'File Quality Score', value: '91%', nav: 'quality_assurance', icon: ShieldCheck, color: 'text-emerald-600', bg: 'bg-emerald-50/40' },
          { label: 'Intake Exceptions', value: '53', nav: 'portfolio_allocation', icon: Zap, color: 'text-amber-600', bg: 'bg-amber-50/40' },
        ].map(tile => (
          <div
            key={tile.label}
            onClick={() => onNavigate?.(tile.nav)}
            className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-slate-300 transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-9 h-9 rounded-xl ${tile.bg} flex items-center justify-center`}>
                <tile.icon className={`w-4 h-4 ${tile.color}`} />
              </div>
              <span className="text-xs font-semibold text-slate-600 group-hover:text-slate-900 transition-colors">{tile.label}</span>
            </div>
            <div className="text-2xl font-extrabold text-slate-900 font-mono">{tile.value}</div>
          </div>
        ))}
      </div>

      {/* Workload by Team */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-bold text-slate-900">Workload by Team</h3>
          <button onClick={() => onNavigate?.('teams_productivity')} className="text-xs text-[#2563EB] hover:underline font-semibold">View Details →</button>
        </div>
        <div className="space-y-4">
          {teams.map(team => {
            const pct = Math.round((team.assigned / team.capacity) * 100);
            const over = pct > 100;
            return (
              <div key={team.name} className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-800">{team.name} <span className="text-slate-500">({team.officer})</span></span>
                  <span className={`font-mono font-bold ${over ? 'text-rose-600' : 'text-slate-600'}`}>{team.assigned}/{team.capacity} ({pct}%)</span>
                </div>
                <div className="w-full bg-slate-50 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-2 rounded-full transition-all ${over ? 'bg-rose-500' : 'bg-[#2563EB]'}`}
                    style={{ width: `${Math.min(100, pct)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SLA Tracker */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6">
        <h3 className="text-sm font-bold text-slate-900 mb-4">SLA Tracker</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3">Client</th>
                <th className="p-3">SLA Metric</th>
                <th className="p-3">Target</th>
                <th className="p-3">Actual</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {slaRows.map(row => (
                <tr key={row.client} className="hover:bg-slate-100/50">
                  <td className="p-3 font-semibold text-slate-900">{row.client}</td>
                  <td className="p-3">{row.metric}</td>
                  <td className="p-3 font-mono">{row.target}</td>
                  <td className="p-3 font-mono font-bold text-slate-900">{row.actual}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                      row.status === 'On track' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'
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
        <div className="bg-amber-50/30 border border-amber-200/50 rounded-2xl p-5 flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="text-sm font-bold text-amber-700">Portfolio Intake Requires Attention</div>
            <div className="text-xs text-amber-600">{intakePortfolio.name} — 53 exceptions pending review before accounts can enter recovery.</div>
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
