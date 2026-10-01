'use client';

import React from 'react';
import { Calendar } from 'lucide-react';
import { useAppStore } from '@/lib/store';

export function AvailabilityView({ onNavigate }: { onNavigate?: (view: string) => void }) {
  const users = useAppStore((s) => s.users);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Calendar className="w-6 h-6 text-[#2563EB]" />
          Staff Availability &amp; Leave Roster
        </h1>
        <p className="text-xs text-slate-600">Shift schedules, leave calendars, out-of-office coverage, and auto-reallocation rules.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xl p-6">
        <div className="space-y-3">
          {users.map(u => (
            <div key={u.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-900 text-xs">{u.name} <span className="text-slate-600 font-normal">({u.roleTitle})</span></div>
                <div className="text-[11px] text-slate-600 mt-0.5">Team: {u.team} · Country: <span className="text-slate-800">{u.country}</span></div>
              </div>
              <span className={`px-2.5 py-1 rounded text-[10px] font-bold border ${u.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
                {u.status === 'Active' ? 'Available' : 'On Leave'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
