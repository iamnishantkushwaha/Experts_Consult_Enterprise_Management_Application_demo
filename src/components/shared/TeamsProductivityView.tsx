'use client';

import React from 'react';
import { Users, Award } from 'lucide-react';
import { useAppStore } from '@/lib/store';

export function TeamsProductivityView({ onNavigate }: { onNavigate?: (view: string) => void }) {
  const users = useAppStore((s) => s.users);

  const officers = users.filter(u => u.roleTitle.toLowerCase().includes('officer') || u.roleTitle.toLowerCase().includes('manager'));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Users className="w-6 h-6 text-[#2563EB]" />
          Teams &amp; Productivity Dashboard
        </h1>
        <p className="text-xs text-slate-600">Officer call rates, PTP conversion, target attainment, and workload balance.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <div className="text-xs text-slate-600 font-semibold mb-1">Avg Contacts Per Day</div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono">34.2</div>
          <div className="text-[11px] text-[#2563EB] mt-1">↑ 8% vs last week</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <div className="text-xs text-slate-600 font-semibold mb-1">Team PTP Kept Rate</div>
          <div className="text-2xl font-extrabold text-[#2563EB] font-mono">61.4%</div>
          <div className="text-[11px] text-slate-600 mt-1">Target: 60.0%</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <div className="text-xs text-slate-600 font-semibold mb-1">QA Compliance Avg</div>
          <div className="text-2xl font-extrabold text-emerald-600 font-mono">92.8%</div>
          <div className="text-[11px] text-slate-600 mt-1">Audit compliant</div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xl p-6">
        <h3 className="text-sm font-bold text-slate-900 mb-4">Officer Performance Leaderboard</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3">Officer Name</th>
                <th className="p-3">Team</th>
                <th className="p-3 text-center">Contacts (Today)</th>
                <th className="p-3 text-center">PTP Kept %</th>
                <th className="p-3 text-center">QA Score</th>
                <th className="p-3 text-right">Cash Recovered</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {officers.map(o => (
                <tr key={o.id} className="hover:bg-slate-100/50">
                  <td className="p-3 font-semibold text-slate-900 flex items-center gap-2">
                    <Award className="w-3.5 h-3.5 text-[#2563EB]" />
                    {o.name}
                  </td>
                  <td className="p-3 text-slate-600">{o.team}</td>
                  <td className="p-3 text-center font-mono text-slate-900">32/40</td>
                  <td className="p-3 text-center font-mono font-bold text-[#2563EB]">64%</td>
                  <td className="p-3 text-center font-mono text-emerald-600">94%</td>
                  <td className="p-3 text-right font-mono font-bold text-slate-900">USD 24,500</td>
                  <td className="p-3 text-right">
                    <button onClick={() => onNavigate?.('team_dashboard')} className="text-[#2563EB] hover:underline font-semibold">
                      Inspect →
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
