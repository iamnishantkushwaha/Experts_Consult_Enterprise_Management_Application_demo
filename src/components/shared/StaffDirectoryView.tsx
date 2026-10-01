'use client';

import React, { useState } from 'react';
import { Users, CheckCircle2, XCircle, AlertTriangle, Lock, User, Shield } from 'lucide-react';
import { useAppStore } from '@/lib/store';

export function StaffDirectoryView({ onNavigate }: { onNavigate?: (view: string) => void }) {
  const users = useAppStore((s) => s.users);
  const [search, setSearch] = useState('');

  const filtered = users.filter(u =>
    !search || u.name.toLowerCase().includes(search.toLowerCase()) || u.roleTitle.toLowerCase().includes(search.toLowerCase())
  );

  const trainingModules = ['AML/KYC', 'Data protection', 'Customer treatment', 'Anti-bribery', 'Cybersecurity'];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Users className="w-6 h-6 text-[#2563EB]" />
          Staff Directory
        </h1>
        <p className="text-xs text-slate-600">HR & Training — employee profiles, competency status, and access lifecycle.</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-4">
          <div className="text-xs text-slate-600 mb-1">Total Staff</div>
          <div className="text-2xl font-extrabold text-slate-900">{users.filter(u => !['client_admin_volta','client_admin_savannah','debtor','legal_partner','vendor'].includes(u.role)).length}</div>
        </div>
        <div className="bg-white border border-amber-200/50 rounded-2xl p-4">
          <div className="text-xs text-slate-600 mb-1">Training Overdue</div>
          <div className="text-2xl font-extrabold text-amber-600">{users.filter(u => Object.values(u.training).includes('Overdue')).length}</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-4">
          <div className="text-xs text-slate-600 mb-1">MFA Enabled</div>
          <div className="text-2xl font-extrabold text-emerald-600">{users.filter(u => u.mfa).length}</div>
        </div>
      </div>

      <div className="relative">
        <input
          type="text"
          placeholder="Search staff by name or role…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full bg-white border border-slate-300 rounded-xl pl-4 pr-4 py-2 text-xs text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
        />
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Role</th>
                <th className="p-3">Country</th>
                <th className="p-3">MFA</th>
                <th className="p-3">Status</th>
                {trainingModules.map(m => (
                  <th key={m} className="p-3 text-center">{m.split('/')[0]}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filtered.map(u => (
                <tr key={u.id} className="hover:bg-slate-100/50 cursor-pointer transition-colors">
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-[#2563EB]/20 text-[#2563EB] flex items-center justify-center text-[10px] font-bold shrink-0">
                        {u.name.charAt(0)}
                      </div>
                      <span className="font-semibold text-slate-900">{u.name}</span>
                    </div>
                  </td>
                  <td className="p-3 text-slate-600">{u.roleTitle}</td>
                  <td className="p-3 font-mono text-slate-600">{u.country}</td>
                  <td className="p-3">
                    {u.mfa
                      ? <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      : <XCircle className="w-4 h-4 text-rose-600" />
                    }
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      u.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-600 border border-slate-300'
                    }`}>{u.status}</span>
                  </td>
                  {trainingModules.map(m => {
                    const status = u.training[m] || 'N/A';
                    return (
                      <td key={m} className="p-3 text-center">
                        {status === 'Complete' && <CheckCircle2 className="w-4 h-4 text-emerald-600 mx-auto" />}
                        {status === 'Overdue' && <AlertTriangle className="w-4 h-4 text-rose-600 mx-auto" />}
                        {status === 'N/A' && <span className="text-slate-600 text-[10px]">N/A</span>}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
