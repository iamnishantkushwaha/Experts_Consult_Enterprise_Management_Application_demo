'use client';

import React from 'react';
import { Lock } from 'lucide-react';
import { useAppStore } from '@/lib/store';

export function AccessLifecycleView({ onNavigate }: { onNavigate?: (view: string) => void }) {
  const users = useAppStore((s) => s.users);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <Lock className="w-6 h-6 text-[#0E9F8E]" />
          Access Control &amp; Provisioning Lifecycle
        </h1>
        <p className="text-xs text-slate-400">User onboarding, role-based access control (RBAC), MFA enforcement, and de-provisioning audits.</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800">
              <tr>
                <th className="p-3">User</th>
                <th className="p-3">Assigned Role</th>
                <th className="p-3 text-center">MFA Enforced</th>
                <th className="p-3 text-center">Account Status</th>
                <th className="p-3 text-right">Last Access</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {users.map(u => (
                <tr key={u.id} className="hover:bg-slate-800/50">
                  <td className="p-3 font-semibold text-white">{u.name}</td>
                  <td className="p-3 text-slate-400">{u.roleTitle}</td>
                  <td className="p-3 text-center font-mono font-bold text-[#0E9F8E]">Enabled</td>
                  <td className="p-3 text-center">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                      {u.status}
                    </span>
                  </td>
                  <td className="p-3 text-right font-mono text-slate-400">Today, 09:30</td>
                  <td className="p-3 text-right">
                    <button onClick={() => onNavigate?.('staff_directory')} className="text-[#0E9F8E] hover:underline font-semibold">
                      Audit Permissions
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
