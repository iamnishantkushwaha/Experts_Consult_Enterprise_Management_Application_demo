'use client';

import React from 'react';
import { Lock } from 'lucide-react';
import { useAppStore } from '@/lib/store';

export function AccessLifecycleView({ onNavigate }: { onNavigate?: (view: string) => void }) {
  const users = useAppStore((s) => s.users);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Lock className="w-6 h-6 text-[#2563EB]" />
          Access Control &amp; Provisioning Lifecycle
        </h1>
        <p className="text-xs text-slate-600">User onboarding, role-based access control (RBAC), MFA enforcement, and de-provisioning audits.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xl p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3">User</th>
                <th className="p-3">Assigned Role</th>
                <th className="p-3 text-center">MFA Enforced</th>
                <th className="p-3 text-center">Account Status</th>
                <th className="p-3 text-right">Last Access</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {users.map(u => (
                <tr key={u.id} className="hover:bg-slate-100/50">
                  <td className="p-3 font-semibold text-slate-900">{u.name}</td>
                  <td className="p-3 text-slate-600">{u.roleTitle}</td>
                  <td className="p-3 text-center font-mono font-bold text-[#2563EB]">Enabled</td>
                  <td className="p-3 text-center">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {u.status}
                    </span>
                  </td>
                  <td className="p-3 text-right font-mono text-slate-600">Today, 09:30</td>
                  <td className="p-3 text-right">
                    <button onClick={() => onNavigate?.('staff_directory')} className="text-[#2563EB] hover:underline font-semibold">
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
