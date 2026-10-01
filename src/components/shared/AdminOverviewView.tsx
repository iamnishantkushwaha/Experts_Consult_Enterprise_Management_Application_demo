'use client';

import React, { useState } from 'react';
import { Settings, Users, Shield, Zap, Scale, Globe, Lock, CheckCircle2 } from 'lucide-react';
import { useAppStore } from '@/lib/store';

export function AdminOverviewView({ onNavigate }: { onNavigate?: (view: string) => void }) {
  const users = useAppStore((s) => s.users);
  const countries = useAppStore((s) => s.countries);
  const vendors = useAppStore((s) => s.vendors);

  const activeUsers = users.filter(u => u.status === 'Active');
  const pendingAccess = users.filter(u => u.status === 'Pending access');
  const mfaEnabled = users.filter(u => u.mfa).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Settings className="w-6 h-6 text-[#2563EB]" />
          Super Admin Overview
        </h1>
        <p className="text-xs text-slate-600">System configuration, users, roles, authority matrix, and integrations.</p>
      </div>

      {/* KPI Tiles */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Active Users', value: activeUsers.length, icon: Users, color: 'text-slate-900' },
          { label: 'MFA Coverage', value: `${Math.round((mfaEnabled / users.length) * 100)}%`, icon: Shield, color: 'text-[#2563EB]' },
          { label: 'Pending Access', value: pendingAccess.length, icon: Lock, color: pendingAccess.length > 0 ? 'text-amber-600' : 'text-slate-600' },
          { label: 'Active Countries', value: countries.filter(c => c.status === 'Active').length, icon: Globe, color: 'text-[#2563EB]' },
        ].map(t => {
          const Icon = t.icon;
          return (
            <div key={t.label} className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-slate-300 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[11px] text-slate-600 uppercase tracking-wider font-semibold">{t.label}</span>
              </div>
              <div className={`text-2xl font-extrabold font-mono ${t.color}`}>{t.value}</div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Authority Matrix Preview */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Scale className="w-4 h-4 text-[#2563EB]" />
              Authority Matrix (Settlement Discounts)
            </h3>
            <button onClick={() => onNavigate?.('authority_matrix')} className="text-xs text-[#2563EB] hover:underline">Edit matrix →</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-3">Role</th>
                  <th className="p-3 text-center">Settlement Limit</th>
                  <th className="p-3 text-center">Write-off Limit</th>
                  <th className="p-3 text-center">Refund Limit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {[
                  { role: 'Recovery Officer', settlement: '≤ 10%', writeoff: 'None', refund: '≤ USD 100' },
                  { role: 'Recovery Manager', settlement: '≤ 25%', writeoff: '≤ USD 1,000', refund: '≤ USD 500' },
                  { role: 'COO / Operations', settlement: '≤ 40%', writeoff: '≤ USD 5,000', refund: '≤ USD 2,000' },
                  { role: 'Executive (CEO/MD)', settlement: 'Unlimited', writeoff: 'Unlimited', refund: 'Unlimited' },
                ].map(row => (
                  <tr key={row.role} className="hover:bg-slate-100/50">
                    <td className="p-3 font-semibold text-slate-900">{row.role}</td>
                    <td className="p-3 text-center font-mono text-[#2563EB]">{row.settlement}</td>
                    <td className="p-3 text-center font-mono text-amber-600">{row.writeoff}</td>
                    <td className="p-3 text-center font-mono text-slate-700">{row.refund}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-3 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-600 italic">
            Client approval overlay: if client has approvalOverlay flag, discounts &gt;25% require client sign-off (§7.5).
          </div>
        </div>

        {/* System Health Quick */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#2563EB]" />
              System Health
            </h3>
            <button onClick={() => onNavigate?.('system_health')} className="text-xs text-[#2563EB] hover:underline">View details →</button>
          </div>
          <div className="space-y-3">
            {[
              { service: 'Core API', status: 'Operational', uptime: '99.98%' },
              { service: 'SMS Gateway (Twilio)', status: 'Operational', uptime: '99.95%' },
              { service: 'Payment Gateway', status: 'Degraded', uptime: '98.2%' },
              { service: 'OCR Pipeline', status: 'Operational', uptime: '99.9%' },
              { service: 'Audit Logger', status: 'Operational', uptime: '100%' },
            ].map(s => (
              <div key={s.service} className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${s.status === 'Operational' ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'}`} />
                  <span className="text-xs font-semibold text-slate-900">{s.service}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                    s.status === 'Operational' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                    'bg-amber-50 text-amber-700 border-amber-200'
                  }`}>{s.status}</span>
                  <span className="text-[11px] font-mono text-slate-600">{s.uptime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Vendors */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold text-slate-900">Vendors &amp; Integrations</h3>
            <button onClick={() => onNavigate?.('integrations')} className="text-xs text-[#2563EB] hover:underline">Manage →</button>
          </div>
          <div className="space-y-2">
            {vendors.map(v => (
              <div key={v.id} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <div>
                  <div className="text-xs font-bold text-slate-900">{v.name}</div>
                  <div className="text-[11px] text-slate-600">{v.type} · {v.jurisdiction}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                    v.dueDiligenceStatus === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                    v.dueDiligenceStatus === 'Review due' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                    'bg-slate-100 text-slate-700 border-slate-300'
                  }`}>{v.dueDiligenceStatus}</span>
                  <span className="text-[10px] font-mono text-slate-500">SLA: {v.slaScore}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Users */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold text-slate-900">Users &amp; Access</h3>
            <button onClick={() => onNavigate?.('users_roles')} className="text-xs text-[#2563EB] hover:underline">Manage →</button>
          </div>
          <div className="space-y-2">
            {users.slice(0, 6).map(u => (
              <div key={u.id} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#2563EB]/20 text-[#2563EB] flex items-center justify-center text-[11px] font-bold">
                    {u.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">{u.name}</div>
                    <div className="text-[10px] text-slate-600">{u.roleTitle} · {u.team}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                    u.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                    u.status === 'On leave' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                    'bg-slate-100 text-slate-700 border-slate-300'
                  }`}>{u.status}</span>
                  {u.mfa ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Lock className="w-3.5 h-3.5 text-rose-600" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
